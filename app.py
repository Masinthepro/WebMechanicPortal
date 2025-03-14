import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
import smtplib
from email.mime.text import MIMEText

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')
        service = request.form.get('service')
        
        # Validate form data
        if not all([name, email, phone, message]):
            flash('Please fill out all required fields', 'error')
        else:
            try:
                # In a production environment, you would send an email or save to database
                # This is just a placeholder for the form handling
                flash('Thank you for your message! We will get back to you soon.', 'success')
                return redirect(url_for('contact'))
            except Exception as e:
                app.logger.error(f"Error processing form: {str(e)}")
                flash('There was an error sending your message. Please try again.', 'error')
    
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
