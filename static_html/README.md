# Static HTML Files

This folder contains standalone HTML files that can be opened directly in your browser without running the Flask server.

## How to Use

1. Open any of the `.html` files directly in your browser by double-clicking them or using the "Open File" option in your browser.
2. All CSS, JavaScript, and image assets will load properly from the relative paths.

## Available Pages

- `index.html` - Home page
- `services.html` - Services page
- `about.html` - About Us page
- `contact.html` - Contact page
- `gallery.html` - Gallery page

## Notes

- These static versions use relative paths (`../static/`) to access assets
- Interactive features that require server-side processing won't function in these static files
- The calculator tool is functional as it uses client-side JavaScript only

## Differences from Server Version

These static HTML versions differ from the server versions in a few ways:

1. URLs use direct file paths instead of Flask's `url_for()` function
2. Server-side templating features (like `{% extends %}`) aren't available
3. Form submissions that would normally go to server endpoints won't work

For full functionality, please use the Flask application by running the server.