---
title: 'Metatag'
author: 'John'
date: '2020-08-27'
---

The Metatag module can affect your site's performance badly. Fortunately, there are some things we can do to improve it significantly.

## Use property tokens

Prefer to use property tokens whenever possible, `[node:field_preamble:value]` is much faster than `[node:field_preamble]`.

The non-property token `[node:field_preamble]` first renders in to HTML through a field formatter and then strips that HTML to finally get the value, mean while the property token `[node:field_preamble:value]` just returns the value it holds.

## Static caching for token generation

Use the patch in [#2955407](https://www.drupal.org/project/metatag/issues/2955407) if you have many identical tokens being generated on the same page. Say you are using the `[node:title]` token for both `title` and `og:title` meta tags, the patch will make sure that the token is only processed once instead of twice.

## PHP mbstring extension

The token module (which Metatag depend on) are using multibyte specific string functions (i.e. `mb_strlen`) to deal with multibyte encodings. Drupal does not require the extension by default, but instead relies on the Symfony polyfill component. Using the extension is faster than the polyfill, so it is recommended that you enable the `mbstring` extension for better performance.