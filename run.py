#!/usr/bin/env python3
"""
Startup script for the Task Manager application.
This script provides an easy way to run the Flask application.
"""

import os
import sys
from app import app, db

def main():
    """Run the Flask application."""
    print("=" * 60)
    print("🚀 Starting Task Manager Application")
    print("=" * 60)
    
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
        print("✅ Database initialized")
    
    print("📱 Application will be available at: http://localhost:5001")
    print("🛑 Press Ctrl+C to stop the server")
    print("=" * 60)
    
    # Run the application
    try:
        app.run(debug=True, host='0.0.0.0', port=5001)
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"\n❌ Error starting application: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
