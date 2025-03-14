"""
Pro Mechanics - Local Startup Script
This script is designed to help run the application easily after extracting the ZIP file.
It will check for dependencies and provide helpful messages.
"""

import sys
import subprocess
import importlib.util
import os
import webbrowser
from pathlib import Path

def check_dependency(package):
    """Check if a package is installed"""
    try:
        importlib.import_module(package)
        return True
    except ImportError:
        return False

def install_dependencies():
    """Install required dependencies"""
    try:
        dependencies = [
            "flask",
            "flask-sqlalchemy",
            "email-validator",
            "gunicorn"
        ]
        
        missing = [pkg for pkg in dependencies if not check_dependency(pkg.replace('-', '_'))]
        
        if missing:
            print(f"Installing missing dependencies: {', '.join(missing)}")
            subprocess.check_call([sys.executable, "-m", "pip", "install"] + missing)
            print("Dependencies installed successfully!")
        else:
            print("All dependencies are already installed!")
        
        return True
    except Exception as e:
        print(f"Error installing dependencies: {e}")
        return False

def run_app():
    """Run the Flask application"""
    try:
        # Get the current directory
        current_dir = Path(__file__).parent
        
        # Make sure we're in the correct directory
        os.chdir(current_dir)
        
        print("Starting Pro Mechanics website...")
        print("Access the website at: http://localhost:5000")
        
        # Open web browser
        webbrowser.open('http://localhost:5000')
        
        # Run the app
        subprocess.call([sys.executable, "main.py"])
        
    except Exception as e:
        print(f"Error running application: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("Pro Mechanics Website - Setup and Run")
    print("=" * 60)
    print("\nChecking dependencies...")
    
    if install_dependencies():
        run_app()
    else:
        print("\nPlease install dependencies manually using:")
        print("pip install flask flask-sqlalchemy email-validator gunicorn")
        print("\nThen run the application with:")
        print("python main.py")
    
    print("\nThank you for using Pro Mechanics Website!")