# Offline Support Guide

This document provides information on making your Pro Mechanics website fully functional offline.

## External Dependencies

The website currently uses these CDN resources:

1. Bootstrap 5.2.3
2. Font Awesome 6.4.0 
3. AOS Animation Library 2.3.1

For complete offline functionality, you might want to download these libraries and include them locally.

## How to Add Local Fallbacks

### Step 1: Download Resources

Download the following files:
- Bootstrap: https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css
- Bootstrap JS: https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js
- Font Awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- AOS CSS: https://unpkg.com/aos@2.3.1/dist/aos.css
- AOS JS: https://unpkg.com/aos@2.3.1/dist/aos.js

### Step 2: Create Local Folders

Create these folders in your static directory:
```
static/vendor/bootstrap/
static/vendor/fontawesome/
static/vendor/aos/
```

### Step 3: Place Files in Folders

Put the downloaded files in their respective folders.

### Step 4: Modify base.html

Update the references in base.html to use local files with fallbacks:

```html
<!-- Bootstrap CSS with local fallback -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" 
      onerror="this.onerror=null;this.href='{{ url_for('static', filename='vendor/bootstrap/bootstrap.min.css') }}';">

<!-- Font Awesome with local fallback -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      onerror="this.onerror=null;this.href='{{ url_for('static', filename='vendor/fontawesome/all.min.css') }}';">

<!-- AOS Animation Library with local fallback -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"
      onerror="this.onerror=null;this.href='{{ url_for('static', filename='vendor/aos/aos.css') }}';">
```

And for the JavaScript files:

```html
<!-- Bootstrap JS Bundle with Popper with local fallback -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        onerror="this.onerror=null;this.src='{{ url_for('static', filename='vendor/bootstrap/bootstrap.bundle.min.js') }}';"></script>

<!-- AOS Animation Library with local fallback -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        onerror="this.onerror=null;this.src='{{ url_for('static', filename='vendor/aos/aos.js') }}';"></script>
```

## Notes

- For Font Awesome, you'll need to also download the webfonts folder and place it in static/vendor/fontawesome/webfonts/
- This approach tries CDN first, then falls back to local files if CDN is unavailable
- Alternatively, you could directly use local files only for guaranteed offline functionality