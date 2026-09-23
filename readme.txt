=== WBD Conditional Block ===
Contributors: wpbranddigital25
Tags: conditional content, gutenberg, block visibility, woocommerce, a/b testing
Requires at least: 6.5
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Show or hide any Gutenberg block based on login status, user role, page type, WooCommerce and A/B testing.

== Description ==

**WBD Conditional Blocks** adds a "Conditional Visibility" panel to the settings sidebar of **every** block in the WordPress block editor — not just a special block of its own. Turn it on, add one or more conditions, choose AND/OR logic, and the block will only render for visitors who match your rules. Everything in this plugin is free.

= Why WBD_Conditional_Block =

* **Works on any block.** Paragraphs, images, buttons, columns, WooCommerce blocks, third-party blocks — if it's a Gutenberg block, it can be made conditional.
* **Lightweight.** No bloated block library, no page builder — just the visibility layer, on top of the blocks you already use.
* **Everything is free.** Every condition type below, AND/OR logic, analytics, and A/B testing are included at no cost.

= Condition types =

* **Login Status** — logged in vs. logged out
* **User Role** — Administrator, Editor, Subscriber, WooCommerce Customer, or any custom role
* **Device Type** — Mobile, Tablet, Desktop
* **Date/Time** — a specific date range, or a recurring day of the week (with optional time window) — great for countdowns and limited-time sales
* **Page/Post Type** — front page, blog index, search results, 404, any archive, specific post types, or specific posts/pages by name
* **Geolocation** — show content to visitors from specific countries (uses a CDN header when available, e.g. Cloudflare, with a cached free API fallback)
* **Browser** — Chrome, Firefox, Safari, Edge, Opera
* **Operating System** — Windows, macOS, Linux, iOS, Android
* **Referrer URL** — traffic from Google, Facebook, direct visits, or any custom domain
* **Query String** — show content when a URL parameter is present (e.g. `?source=facebook`)
* **Cookies** — match a visitor's cookie name/value (e.g. "has visited before")
* **WooCommerce** — cart contents, cart value, purchase history, lifetime spend, guest vs. customer
* **Custom Fields** — ACF field values, or plain post meta
* **Language** — the site's active locale or the visitor's browser language
* **A/B Test Variant** — randomly (and consistently) split visitors 50/50 between two versions of a block, then compare performance in the built-in analytics

= AND / OR logic =

Combine multiple conditions on one block and choose whether **all** of them must match (AND) or **any** of them (OR).

= Conditional Group block =

Need to hide several blocks together, or wrap content that doesn't have its own settings panel? Add the **Conditional Group** block, drop any blocks inside it, and apply one rule set to the whole group.

= Built-in analytics =

Every conditional block reports how many times it was shown vs. hidden. View daily trends and per-block totals — including the A/B variant split — from **WBD_Conditional_Block → Analytics** in your dashboard. No data leaves your site.


= White-label =

Rename the plugin's dashboard menu and pages to your own brand from **WBD_Conditional_Block → Settings** — handy for agencies building on client sites.

== Installation ==

1. Upload the `wbd-conditional-block` folder to `/wp-content/plugins/`, or install directly from Plugins → Add New.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. Open any post or page in the block editor, select a block, and open the "Conditional Visibility" panel in the settings sidebar (right-hand panel).
4. Enable it, add a condition, and publish. That's it.

== Development ==

Public source code repository:
https://github.com/wpbranddigital/wbd-conditional-block

Build Instructions:

1. npm install
2. npm run build
3. npm run start (development)
WBD Conditional Block is built using @wordpress/scripts.

== External services ==
This plugin connects to a free external geolocation API (`ip-api.com`) to determine a visitor's country when the "Geolocation" condition is used. 
It sends the user's IP address to the API to obtain their country code, allowing the block visibility rules to work. The results are cached per IP to minimize requests. This service is provided by Artia International (ip-api.com). 
Please review their [Terms of Service](https://ip-api.com/docs/legal) and [Privacy Policy](https://ip-api.com/docs/legal).


== Frequently Asked Questions ==

= Does this work with any theme? =

Yes. The plugin only affects whether a block's HTML is output; it doesn't change markup or styling, so it works with any block theme or classic theme that supports the block editor.

= Does this slow down my site? =

No. All checks run in plain PHP with no database queries in the common cases, and the geolocation lookup (the only condition that can call an external service) is cached per visitor for 12 hours.

= Can I use this with WooCommerce? =

Yes — the WooCommerce condition type is built in and only activates when WooCommerce is installed and active.

= Where is analytics data stored? =

In a small table in your own WordPress database. No data is sent anywhere else.

= What happens to a block if I deactivate the plugin? =

It simply renders normally again (unconditionally visible). No content is deleted; the condition settings stay stored on the block and reappear if you reactivate the plugin.

== Screenshots ==

1. The Conditional Visibility panel in the block editor sidebar.
2. Adding a condition with AND/OR logic.
3. The Analytics dashboard showing shown/hidden trends per block.
4. A block hidden on the frontend for a logged-out visitor.

== Changelog ==

= 1.0.1 =
* Fix: Removed "Tested up to" tag from the main plugin file.
* Fix: Added unique prefixes (`WBDCOBL_`, `wbdcobl_`) to all functions, classes, globals, and stored data to avoid naming collisions.
* Fix: Added documentation in `readme.txt` disclosing the use of the `ip-api.com` external geolocation service.

= 1.0.0 =
* Initial release: 15 condition types, AND/OR logic, quick templates, the Conditional Group block, built-in analytics, A/B testing, developer API, and white-label settings — all free.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
