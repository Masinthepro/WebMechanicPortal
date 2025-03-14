# Pro Mechanics Website

A professional mechanic website with modern design and interactive elements built with HTML/CSS/JS and a Flask backend.

## Features

- Modern, responsive design
- Interactive service calculator
- Appointment booking system
- Photo gallery
- PWA support with custom icons

## Installation & Setup

### Requirements
- Python 3.7 or higher
- pip (Python package manager)

### Steps to Run Locally

#### Method 1: Easy Setup (Recommended)

1. **Extract the zip file** to a directory of your choice
2. **Run the setup script**
   ```
   python run_local.py
   ```
   This script will:
   - Check and install required dependencies
   - Start the application
   - Open your browser automatically

#### Method 2: Manual Setup

1. **Extract the zip file** to a directory of your choice

2. **Install required packages**
   ```
   pip install email-validator flask flask-sqlalchemy gunicorn psycopg2-binary
   ```

   (Alternatively, you can install from the provided dependencies.txt file:)
   ```
   pip install -r dependencies.txt
   ```

3. **Run the application**
   ```
   python main.py
   ```

4. **Access the website**
   Open your browser and go to: `http://localhost:5000`

## Dependencies

This project requires the following Python packages:
- Flask
- Flask-SQLAlchemy
- email-validator
- gunicorn
- psycopg2-binary

## Browser Compatibility

Tested and optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2023-2025 Pro Mechanics. All Rights Reserved.