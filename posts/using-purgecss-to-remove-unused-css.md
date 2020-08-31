---
title: 'Using PurgeCSS to remove unused CSS'
author: 'John'
date: '2020-08-31'
---

PurgeCSS is a tool to remove unused CSS, by analyzing your markup (templates) and CSS, resulting in smaller CSS files.

You can use PurgeCSS via CLI, PostCSS, Gulp, Webpack and more.

## Setup

To test PurgeCSS, I've setup a freshly installed Drupal project and built a simple theme `Purge` using the Bootstrap CSS framework.

![Purge Theme Screenshot](/static/purge-screenshot.png)

The theme has a single compressed `main.css` CSS file, built from Bootstrap source (Sass), using the task runner Gulp.

**The file size is currently 146 kb.**

Here is our Gulp task:

```
function build() {
  return gulp.src('./css/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css/dist'));
}
```

Finally, the [source code is available on GitHub](https://github.com/johndevman/purge).

## Integrating PurgeCSS

First we'll install PurgeCSS gulp plugin:

```
npm install --save-dev gulp-purgecss
```

And then we update our Gulp task:

```
function build() {
  return gulp.src('./css/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(purgecss({
      content: ['./templates/**/*.html.twig']
    }))
    .pipe(gulp.dest('./css/dist'));
}
```

Now we can re-run our task `npx gulp` and voila!

**Our CSS file is now only 6.5 kB instead of 146 kb!**

Note: If you're adding classes via JavaScript, then you should add that path to the `content` array as well:

```
.pipe(purgecss({
  content: ['./templates/**/*.html.twig', './js/**/*.js']
}))
```

## Caveats

In our setup we used PurgeCSS default extractor, the extractor is responsible for finding CSS that should not be removed in your templates. The default extractor does not understand the Twig syntax, so if you do something like:

```
{%
  set classes = [
    'node',
    'node--type-' ~ node.bundle|clean_class,
    view_mode ? 'node--view-mode-' ~ view_mode|clean_class,
  ]
%}
```

```
'text--' ~ color
```

These classes will be removed. To ensure these classes doesn't get removed, you can [whitelist](https://purgecss.com/whitelisting.html#specific-selectors) them:

```
.pipe(purgecss({
  content: ['./templates/**/*.html.twig'],
  whitelist: ['node--type-page', 'node--type-article', 'node--type-event']
}))
```

Having to manually add all those dynamic classes can become cumbersome, so instead we can use regular expressions patterns:

```
.pipe(purgecss({
  content: ['./templates/**/*.html.twig'],
  whitelistPatterns: [/node--type-[a-z_]+/],
}))
```

This pattern will ensure `node--type-[bundle]` classes will be left in the final CSS.

Finally, you may use [commments in the CSS directly](https://purgecss.com/whitelisting.html#in-the-css-directly) to whitelist.

## In conclusion

PurgeCSS can help you reduce the size of your CSS files tremendously, due to the caveats, it will require some work to get it properly setup for your project. 

Also make sure you test your project throughly, to ensure that no required CSS is being removed.