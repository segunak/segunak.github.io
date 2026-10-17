#!/usr/bin/env ruby
# frozen_string_literal: true

require 'yaml'

ROOT = File.expand_path('../../../..', __dir__)
PAGE_PATH = File.join(ROOT, 'docs/_pages/speaking.md')
ORIGINAL_ROOT = File.join(ROOT, 'docs/assets/images/me')
PREVIEW_ROOT = File.join(ORIGINAL_ROOT, 'thumbs')
MONTH_PATTERN = /\A(?:0[1-9]|1[0-2])-(?:19|20)\d{2}\z/
MONTH_NAME_PATTERN = /(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\z/
PHOTO_KEYS = %w[file month caption alt featured credit credit_url].freeze
HEADSHOT_STEM = 'SegunAkinyemiHeadshot'
SUPPORTED_EXTENSIONS = %w[.jpg .jpeg .png .webp].freeze

def load_front_matter
  text = File.read(PAGE_PATH)
  match = text.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)
  raise 'Speaking page is missing valid YAML front matter' unless match

  YAML.safe_load(match[1], aliases: true) || {}
end

def photo_entries(front_matter)
  photos = front_matter.dig('speaking_gallery', 'photos')
  raise '`speaking_gallery.photos` must be a YAML list' unless photos.is_a?(Array)
  raise 'every photo entry requires `file`' unless photos.all? { |photo| photo.is_a?(Hash) && photo['file'].is_a?(String) && !photo['file'].empty? }

  photos
end

def preview_filename(file)
  "#{File.basename(file, File.extname(file))}.webp"
end

if ARGV == ['--photo-files']
  begin
    photo_entries(load_front_matter).each { |photo| puts photo.fetch('file') }
  rescue StandardError => e
    warn "speaking gallery: #{e.message}"
    exit 1
  end
  exit
elsif !ARGV.empty?
  abort 'usage: validate-gallery.rb [--photo-files]'
end

errors = []

begin
  front_matter = load_front_matter
  settings = photo_entries(front_matter)
rescue StandardError => e
  warn "speaking gallery: #{e.message}"
  exit 1
end

files = settings.map { |setting| setting['file'] }
stems = files.map { |file| File.basename(file, File.extname(file)).downcase }
files.tally.select { |_, count| count > 1 }.each_key do |file|
  errors << "duplicate file entry: #{file}"
end
stems.tally.select { |_, count| count > 1 }.each_key do |stem|
  errors << "#{stem}: photo filenames must have unique stems"
end

headshots = Dir.children(ORIGINAL_ROOT).select do |file|
  File.file?(File.join(ORIGINAL_ROOT, file)) &&
    File.basename(file, File.extname(file)).casecmp?(HEADSHOT_STEM) &&
    SUPPORTED_EXTENSIONS.include?(File.extname(file).downcase)
end

errors << "expected exactly one supported original with stem `#{HEADSHOT_STEM}`; found #{headshots.length}" unless headshots.length == 1

settings.each do |setting|
  file = setting['file']
  month = setting['month']
  caption = setting['caption']
  alt_text = setting['alt']
  extension = File.extname(file).downcase

  if File.basename(file) != file || file.include?("\n") || !SUPPORTED_EXTENSIONS.include?(extension)
    errors << "#{file}: `file` must be a supported original filename in docs/assets/images/me"
    next
  end

  unsupported_keys = setting.keys - PHOTO_KEYS
  errors << "#{file}: `include` is obsolete; omit unlisted photos instead" if setting.key?('include')
  errors << "#{file}: unsupported keys: #{unsupported_keys.join(', ')}" unless unsupported_keys.empty?
  errors << "#{file}: omit `featured` unless it is true" if setting.key?('featured') && setting['featured'] != true
  errors << "#{file}: `caption` is required" unless caption.is_a?(String) && !caption.empty?
  if setting.key?('alt') && (!alt_text.is_a?(String) || alt_text.strip.empty?)
    errors << "#{file}: `alt` must be a nonblank string when provided"
  end
  errors << "#{file}: caption date must come from `month`" if caption.to_s.match?(MONTH_NAME_PATTERN)
  errors << "#{file}: `month` must use MM-YYYY" if month && (!month.is_a?(String) || !month.match?(MONTH_PATTERN))
  errors << "#{file}: original file does not exist" unless File.file?(File.join(ORIGINAL_ROOT, file))
  errors << "#{file}: preview is missing; the pre-commit hook will generate it when the gallery is updated" unless File.file?(File.join(PREVIEW_ROOT, preview_filename(file)))
end

featured_count = settings.count { |setting| setting['featured'] == true }
errors << "at most 6 photos may be featured; found #{featured_count}" if featured_count > 6

if errors.empty?
  dated_count = settings.count { |setting| setting['month'] }
  puts "speaking gallery: #{settings.length} listed, #{dated_count} dated, #{featured_count} featured, all valid"
else
  errors.each { |error| warn "speaking gallery: #{error}" }
  exit 1
end
