#!/usr/bin/env ruby
# frozen_string_literal: true

require 'jekyll'
require 'uri'
require 'yaml'

ROOT = File.expand_path('../../../..', __dir__)
TEMPLATE_PATH = File.join(ROOT, 'docs/_includes/speaking-gallery.html')

def check_preview_urls(photos)
  template = Liquid::Template.parse(File.read(TEMPLATE_PATH), error_mode: :strict)
  html = template.render!(
    {
      'page' => { 'speaking_gallery' => { 'photos' => photos } },
      'site' => { 'author' => { 'name' => 'Segun Akinyemi' } }
    },
    filters: [Jekyll::Filters],
    registers: { site: Struct.new(:config).new({ 'baseurl' => '/preview' }) },
    strict_filters: true
  )

  expected_previews = photos.map do |photo|
    stem = File.basename(photo.fetch('file'), File.extname(photo.fetch('file')))
    URI::DEFAULT_PARSER.escape("/preview/assets/images/me/thumbs/#{stem}.webp")
  end
  expected_featured = photos.zip(expected_previews).select { |photo, _| photo['featured'] == true }.first(6).map(&:last)
  featured = html.scan(/<img src="([^"]+)"/).flatten
  all_previews = html.scan(/<img data-speaking-gallery-preview="([^"]+)"/).flatten
  originals = html.scan(/data-speaking-gallery-original="([^"]+)"/).flatten
  expected_originals = photos.map { |photo| URI::DEFAULT_PARSER.escape("/preview/assets/images/me/#{photo.fetch('file')}") }

  raise "Featured preview URLs do not match: #{featured.inspect}" unless featured == expected_featured
  raise "View All preview URLs do not match: #{all_previews.inspect}" unless all_previews == expected_previews
  raise 'Original image URLs changed' unless originals == expected_originals

  expected_previews
end

page = File.read(File.join(ROOT, 'docs/_pages/speaking.md'))
front_matter = YAML.safe_load(page.match(/\A---\r?\n(.*?)\r?\n---\r?\n/m)[1], aliases: true)
photos = front_matter.fetch('speaking_gallery').fetch('photos')
check_preview_urls(photos).each do |url|
  path = File.join(ROOT, 'docs', URI::DEFAULT_PARSER.unescape(url.delete_prefix('/preview/')))
  raise "Rendered preview does not exist: #{path}" unless File.file?(path)
end

filenames = ['Photo With Spaces.JPG', 'portrait.v2.jpeg', 'photo.jpg.backup.jpg', 'transparent.png', 'original.webp']
check_preview_urls(filenames.map do |file|
  { 'file' => file, 'caption' => 'Gallery test photo', 'featured' => true }
end)

puts "speaking gallery template: #{photos.length} real previews and #{filenames.length} filename edge cases valid (Liquid #{Liquid::VERSION})"
