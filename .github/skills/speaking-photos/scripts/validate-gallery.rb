#!/usr/bin/env ruby
# frozen_string_literal: true

require 'json'
require 'yaml'

ROOT = File.expand_path('../../../..', __dir__)
PAGE_PATH = File.join(ROOT, 'docs/_pages/speaking.md')
MANIFEST_PATH = File.join(ROOT, 'docs/_data/speaking_photos.json')
ORIGINAL_ROOT = File.join(ROOT, 'docs/assets/images/me')
MONTH_PATTERN = /\A(?:0[1-9]|1[0-2])-(?:19|20)\d{2}\z/
SLUG_PATTERN = /\A[a-z0-9]+(?:-[a-z0-9]+)*\z/
MONTH_NAME_PATTERN = /(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\z/
PHOTO_KEYS = %w[file month caption featured credit credit_url].freeze
HEADSHOT_STEM = 'SegunAkinyemiHeadshot'
SUPPORTED_EXTENSIONS = %w[.jpg .jpeg .png .webp].freeze

def load_front_matter
  text = File.read(PAGE_PATH)
  match = text.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)
  raise 'Speaking page is missing valid YAML front matter' unless match

  YAML.safe_load(match[1], aliases: true) || {}
end

def duplicate_values(values)
  values.tally.select { |_, count| count > 1 }.keys
end

errors = []

begin
  front_matter = load_front_matter
  manifest = JSON.parse(File.read(MANIFEST_PATH))
rescue StandardError => e
  warn "speaking gallery: #{e.message}"
  exit 1
end

settings = front_matter.dig('speaking_gallery', 'photos')
download_prefix = front_matter.dig('speaking_gallery', 'download_prefix')
manifest_photos = Array(manifest['photos'])
manifest_by_file = manifest_photos.to_h { |photo| [photo['file'], photo] }
headshots = manifest_photos.select { |photo| photo['stem'] == HEADSHOT_STEM }

if headshots.length != 1
  errors << "expected exactly one headshot with stem `#{HEADSHOT_STEM}`; found #{headshots.length}"
else
  headshot = headshots.first
  headshot_file = headshot['file']

  if !headshot_file.is_a?(String) || headshot_file.empty?
    errors << "#{HEADSHOT_STEM}: manifest file is missing"
  else
    extension = File.extname(headshot_file).downcase
    expected_original = "/assets/images/me/#{headshot_file}"

    errors << "#{headshot_file}: unsupported headshot extension" unless SUPPORTED_EXTENSIONS.include?(extension)
    errors << "#{headshot_file}: manifest original path is invalid" unless headshot['original'] == expected_original
    errors << "#{headshot_file}: original file does not exist" unless File.file?(File.join(ORIGINAL_ROOT, headshot_file))
  end

  %w[width height].each do |dimension|
    value = headshot[dimension]
    errors << "#{HEADSHOT_STEM}: manifest #{dimension} is missing or invalid" unless value.is_a?(Integer) && value.positive?
  end

  source_hash = headshot['source_sha256']
  errors << "#{HEADSHOT_STEM}: manifest source hash is missing or invalid" unless source_hash.to_s.match?(/\A[a-f0-9]{64}\z/)
end

unless settings.is_a?(Array)
  warn 'speaking gallery: `speaking_gallery.photos` must be a YAML list'
  exit 1
end

unless download_prefix.is_a?(String) && download_prefix.match?(SLUG_PATTERN)
  errors << '`speaking_gallery.download_prefix` must be lowercase kebab-case'
end

files = settings.map { |setting| setting['file'] }

duplicate_values(files).each { |file| errors << "duplicate file entry: #{file}" }

settings.each do |setting|
  file = setting['file']
  month = setting['month']
  caption = setting['caption']

  if !file.is_a?(String) || file.empty?
    errors << 'every photo entry requires `file`'
    next
  end

  unsupported_keys = setting.keys - PHOTO_KEYS
  errors << "#{file}: `include` is obsolete; omit unlisted photos instead" if setting.key?('include')
  errors << "#{file}: unsupported keys: #{unsupported_keys.join(', ')}" unless unsupported_keys.empty?
  errors << "#{file}: omit `featured` unless it is true" if setting.key?('featured') && setting['featured'] != true
  errors << "#{file}: `caption` is required" unless caption.is_a?(String) && !caption.empty?
  errors << "#{file}: caption date must come from `month`" if caption.to_s.match?(MONTH_NAME_PATTERN)
  errors << "#{file}: `month` must use MM-YYYY" if month && (!month.is_a?(String) || !month.match?(MONTH_PATTERN))
  errors << "#{file}: not found in speaking photo manifest" unless manifest_by_file.key?(file)
  errors << "#{file}: original file does not exist" unless File.file?(File.join(ORIGINAL_ROOT, file))

  source_hash = manifest_by_file.dig(file, 'source_sha256')
  errors << "#{file}: manifest source hash is missing or invalid" unless source_hash.to_s.match?(/\A[a-f0-9]{64}\z/)
end

featured_count = settings.count { |setting| setting['featured'] == true }
errors << "at most 6 photos may be featured; found #{featured_count}" if featured_count > 6

download_names = settings.filter_map do |setting|
  source_hash = manifest_by_file.dig(setting['file'], 'source_sha256')
  next unless download_prefix.is_a?(String) && source_hash.to_s.match?(/\A[a-f0-9]{64}\z/)

  extension = File.extname(setting['file'].to_s).downcase
  "#{download_prefix}-#{source_hash[0, 12]}#{extension}"
end

duplicate_values(download_names.map(&:downcase)).each do |name|
  errors << "duplicate download filename: #{name}"
end

if errors.empty?
  dated_count = settings.count { |setting| setting['month'] }
  puts "speaking gallery: #{settings.length} listed, #{dated_count} dated, #{featured_count} featured, all valid"
else
  errors.each { |error| warn "speaking gallery: #{error}" }
  exit 1
end
