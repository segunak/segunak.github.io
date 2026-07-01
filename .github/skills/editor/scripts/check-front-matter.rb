#!/usr/bin/env ruby
# frozen_string_literal: true

require 'date'
require 'time'
require 'yaml'

ROOT = File.expand_path('../../../..', __dir__)

def usage
  warn 'Usage: ruby .github/skills/editor/scripts/check-front-matter.rb [post-or-directory ...]'
end

def target_files(args)
  targets = args.empty? ? ['docs/_posts'] : args

  targets.flat_map do |target|
    path = File.expand_path(target, ROOT)

    if File.directory?(path)
      Dir[File.join(path, '**/*.md')]
    elsif File.file?(path)
      [path]
    else
      warn "front matter check: not found: #{target}"
      []
    end
  end.uniq.sort
end

def front_matter_for(path)
  text = File.read(path)
  return nil unless text.start_with?("---\n") || text.start_with?("---\r\n")

  match = text.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)
  return :missing_close unless match

  match[1]
end

def validate_shape(path, data)
  errors = []

  unless data.is_a?(Hash)
    errors << 'front matter must parse to a mapping/object'
    return errors
  end

  if data.key?('header') && !data['header'].is_a?(Hash)
    errors << '`header` must be a mapping with two-space-indented child keys'
  end

  %w[categories tags].each do |key|
    next unless data.key?(key)

    value = data[key]
    errors << "`#{key}` must be a YAML list" unless value.is_a?(Array)
  end

  errors << '`title` is required' if File.dirname(path).tr('\\', '/').end_with?('docs/_posts') && !data.key?('title')

  errors
end

def block_scalar_header?(line)
  line.match?(/:\s*[>|][+-]?\s*(?:#.*)?$/)
end

def validate_indentation(front_matter)
  errors = []
  context = nil
  block_scalar_indent = nil
  top_level_keys = Hash.new(0)

  front_matter.lines.each_with_index do |raw_line, index|
    line_number = index + 2
    line = raw_line.chomp
    stripped = line.strip

    next if stripped.empty?
    next if stripped.start_with?('#')

    if line.include?("\t")
      errors << "line #{line_number}: use spaces, not tabs"
      next
    end

    indent = line[/\A */].length

    if block_scalar_indent && indent > block_scalar_indent
      next
    elsif block_scalar_indent && indent <= block_scalar_indent
      block_scalar_indent = nil
    end

    if indent.zero?
      unless line.match?(/\A[A-Za-z0-9_-]+:/)
        errors << "line #{line_number}: top-level front matter lines must be YAML keys at column 1"
      end

      key = line.split(':', 2).first
      top_level_keys[key] += 1
      context = key
      block_scalar_indent = indent if block_scalar_header?(line)
      next
    end

    if indent.odd?
      errors << "line #{line_number}: use two spaces per YAML indentation level"
    end

    case context
    when 'categories', 'tags'
      unless line.match?(/\A  -\s+\S/)
        errors << "line #{line_number}: `#{context}` items must be indented exactly two spaces as `  - value`"
      end
    end

    block_scalar_indent = indent if block_scalar_header?(line)
  end

  top_level_keys.each do |key, count|
    errors << "duplicate top-level key `#{key}` appears #{count} times" if count > 1
  end

  errors
end

files = target_files(ARGV)

if files.empty?
  usage
  exit 1
end

failed = false

files.each do |path|
  front_matter = front_matter_for(path)
  display_path = path.sub(%r{\A#{Regexp.escape(ROOT)}[\\/]?}, '').tr('\\', '/')

  case front_matter
  when nil
    warn "#{display_path}: missing opening YAML front matter"
    failed = true
    next
  when :missing_close
    warn "#{display_path}: missing closing YAML front matter delimiter"
    failed = true
    next
  end

  begin
    data = YAML.safe_load(front_matter, permitted_classes: [Date, Time], aliases: true) || {}
  rescue Psych::SyntaxError => e
    warn "#{display_path}: YAML syntax error: #{e.message}"
    failed = true
    next
  end

  errors = validate_indentation(front_matter) + validate_shape(path, data)

  if errors.empty?
    puts "#{display_path}: ok"
  else
    failed = true
    errors.each { |error| warn "#{display_path}: #{error}" }
  end
end

exit(failed ? 1 : 0)