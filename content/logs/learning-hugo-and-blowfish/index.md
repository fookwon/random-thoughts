---
title: "SSG - Hugo and Blowfish"
draft: false
date: "2024-11-15T09:04:54+08:00"
#expiryDate: 2024-10-19
summary: "My Learning Journey with Hugo and Blowfish"
tags: ["hugo", "blowfish", "technology"]
---

# Extending Shortcodes for Greater Flexibility
When I first dove into Hugo, I was impressed by how easily you could create static websites that were fast, flexible, and customizable. Hugo's templating system is powerful, but what really drew me in was the simplicity of using shortcodes to add dynamic content to a site. This flexibility was taken to another level when I started working with the Blowfish theme—a sleek, minimal theme that’s perfect for creating image-heavy portfolios or galleries.

One of my recent projects required me to extend Blowfish's Gallery shortcode to automatically pull in and display image files from a specific folder within my Hugo project. This turned out to be a great exercise in both learning Hugo's internals and improving my workflow. Here's a quick dive into what I learned and how easy it was to enhance an existing shortcode.

## Understanding Shortcodes in Hugo

Hugo shortcodes are snippets of code that allow you to add reusable elements like galleries, YouTube embeds, or even custom content without having to repeat the same code throughout your pages. These shortcodes can be extended, customized, or even created from scratch to suit your needs.

Blowfish comes with a built-in Gallery shortcode, which is simple yet powerful. However, the shortcode required manual input to display images one by one. While this approach works, it can be tedious if you have multiple images, especially when they’re stored in a folder within the site’s static directory.

## Extending the Gallery Shortcode

Here’s where my learning journey took a fun turn. I wanted to automate the process of listing all the image files from a folder inside my leaf bundle and have Hugo generate the gallery dynamically.

The default gallery shortcode in Blowfish expects images to be passed manually, like so:

```html
{{</* gallery */>}}
  <img src="gallery/01.jpg" class="grid-w33" />
  <img src="gallery/02.jpg" class="grid-w33" />
  <img src="gallery/03.jpg" class="grid-w33" />
  <img src="gallery/04.jpg" class="grid-w33" />
  <img src="gallery/05.jpg" class="grid-w33" />
  <img src="gallery/06.jpg" class="grid-w33" />
  <img src="gallery/07.jpg" class="grid-w33" />
{{</* /gallery */>}}
```

To enhance this, I modified the shortcode to automatically loop through the files in a specific folder and display them in the gallery format. By utilizing Hugo's file system functions and the range operator, I could scan the folder for image files and feed them into the gallery automatically.

## Code Snippet for the Extended Gallery Shortcode

Here’s a simplified version of what I ended up with:


Create a **gallery.html** in layouts/shortcodes

```html
{{ $id := delimit (slice "gallery" (partial "functions/uid.html" .)) "-" }}
{{ $loc := .Get 0 }}
{{ $cls := .Get 1 }}

<div id="{{ $id }}" class="gallery">
{{ range .Page.Resources.Match $loc }}
  <img src="{{ .RelPermalink }}" class="{{ $cls }}"  /> 
{{ end }}
</div>
```

Insert this shortcode to your md files.

```html  
{{</* gallery "images/*" "grid-w50 md:grid-w33 xl:grid-w25" */>}}  
```


What’s happening here is:

1. Directory Scanning: I point the shortcode to the images/ folder in the first argument and use the second argument to store the tailwind CSS values.
2. File Matching: Using Hugo's .Page.Resources.Match method, I filter and gather all images in that folder.
3. Rendering: Then, I loop through those images using range and dynamically build the gallery by generating links and image tags.

With this setup, I don’t need to update the shortcode every time I add an image—Hugo automatically detects the images in the folder and includes them in the gallery.