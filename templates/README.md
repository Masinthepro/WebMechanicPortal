# Template Files

These are Flask template files that need to be processed by the Flask server to view properly.

## To view HTML files directly:

Please use the standalone HTML files in the `static_html` folder instead, which have all template tags replaced with static content.

## Why template files don't work when opened directly:

When you open `.html` files from this folder directly in a browser:
- Template tags like `{% block %}` and `{{ url_for() }}` won't be processed
- CSS and JavaScript paths won't resolve correctly
- You'll see only plain text without styling or functionality

## How to view these pages properly:

1. Run the Flask server using `python main.py` or the workflow
2. Visit the appropriate URL (e.g., http://localhost:5000)

Or:

1. Use the static HTML versions in the `static_html` folder for direct viewing