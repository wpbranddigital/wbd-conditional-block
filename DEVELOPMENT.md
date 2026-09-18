# WBD_Conditional_Block — Source Build

This is the full development source for the WBD_Conditional_Block plugin, provided
for transparency and GPLv2-or-later compliance. It includes everything needed
to rebuild the plugin from scratch.

## Requirements

- Node.js 18+ and npm
- PHP 7.4+ (for running PHPCS, if desired)

## Build the editor assets

```bash
npm install
npm run build
```

This compiles `src/` into `build/index.js`, `build/index.css`,
`build/index-rtl.css`, and `build/index.asset.php` using `@wordpress/scripts`.

For active development with hot rebuilding:

```bash
npm start
```

## Linting

```bash
npx wp-scripts lint-js src
npx wp-scripts lint-style src
php /path/to/phpcs --standard=phpcs.xml.dist .
```

(`phpcs.xml.dist` targets the WordPress-Extra coding standard; install
PHP_CodeSniffer and the WordPress Coding Standards ruleset separately to run
it locally.)

## Directory overview

- `wbd-conditional-block.php` — main plugin bootstrap file
- `includes/` — PHP classes (condition engine, renderer, analytics, REST API,
  admin pages, geolocation)
- `src/` — editor-side JavaScript source (block registration, Inspector
  Controls panel, condition editors)
- `blocks/` — block.json metadata for the "Conditional Group" block
- `build/` — compiled JS/CSS output (checked in so the plugin also works
  standalone without a build step)
- `assets/` — plain frontend/admin CSS and the tiny device-detection JS helper
- `languages/` — translation template (`.pot`)
- `uninstall.php` — cleanup on plugin deletion

## Packaging note

The WordPress.org submission zip (`wbd-conditional-block.zip`, distributed
separately) contains only the runtime files a site needs: the main plugin
file, `includes/`, `blocks/`, `assets/`, `build/`, `languages/`, `readme.txt`,
and `uninstall.php`. It intentionally excludes `src/`, `node_modules/`,
`package.json`, `package-lock.json`, and `phpcs.xml.dist` — everything in
this source archive that isn't needed to run the plugin.
