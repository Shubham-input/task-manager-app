# Task Manager App

A full-stack task management web application built with Python Flask, SQLite, and Bootstrap. This application provides user authentication, CRUD operations for tasks, and a clean, responsive user interface.

## Features

- **User Authentication**: Register and login system with secure password hashing
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as pending, in progress, or completed
- **Priority Levels**: Set task priority (low, medium, high)
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Real-time Updates**: Toggle task completion status without page refresh
- **Dashboard**: Overview of all tasks with statistics
- **Secure**: User-specific task isolation and secure authentication

## Technologies Used

- **Backend**: Python 3.x, Flask 2.3.3
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: Flask-Login, Werkzeug security
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Forms**: Flask-WTF with WTForms validation
- **Icons**: Font Awesome 6

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd taskmanager
   ```

2. **Create a virtual environment** (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:

   ```bash
   python app.py
   ```

5. **Access the application**:
   Open your browser and go to `http://localhost:5000`

## Usage

### Getting Started

1. **Register**: Create a new account by clicking "Register" and filling out the form
2. **Login**: Use your credentials to log in to the application
3. **Dashboard**: View your task overview and statistics

### Managing Tasks

1. **Create Task**: Click "New Task" to add a new task with title, description, and priority
2. **Edit Task**: Click the dropdown menu on any task card and select "Edit"
3. **Mark Complete**: Use the checkbox on task cards to toggle completion status
4. **Delete Task**: Click the dropdown menu and select "Delete" (with confirmation)

### Task Properties

- **Title**: Required, up to 100 characters
- **Description**: Optional, detailed task description
- **Priority**: Low, Medium, or High
- **Status**: Pending, In Progress, or Completed
- **Created Date**: Automatically set when task is created
- **Updated Date**: Automatically updated when task is modified

## Project Structure

```
taskmanager/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── taskmanager.db        # SQLite database (created automatically)
├── templates/            # HTML templates
│   ├── base.html         # Base template with navigation
│   ├── index.html        # Home page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── dashboard.html    # Main dashboard
│   ├── create_task.html  # Create new task
│   └── edit_task.html    # Edit existing task
└── static/               # Static files
    ├── css/
    │   └── style.css     # Custom CSS styles
    └── js/
        └── script.js     # Custom JavaScript
```

## Database Schema

### Users Table

- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `password_hash`: Hashed password
- `tasks`: Relationship to tasks

### Tasks Table

- `id`: Primary key
- `title`: Task title
- `description`: Task description
- `status`: Task status (pending, in_progress, completed)
- `priority`: Task priority (low, medium, high)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `user_id`: Foreign key to users table

## Security Features

- Password hashing using Werkzeug
- User session management with Flask-Login
- CSRF protection with Flask-WTF
- User-specific data isolation
- Input validation and sanitization

## Customization

### Styling

- Modify `static/css/style.css` for custom styling
- Bootstrap 5 classes can be customized or overridden
- Color scheme defined in CSS variables

### Functionality

- Add new task fields in `app.py` models and forms
- Extend user profile features
- Add task categories or tags
- Implement task due dates

## Deployment

### Local Development

The application runs in debug mode by default. For production:

1. Set `debug=False` in `app.py`
2. Use a production WSGI server like Gunicorn
3. Set up a proper database (PostgreSQL recommended)
4. Configure environment variables for secrets

### Environment Variables

```bash
export FLASK_SECRET_KEY="your-secret-key"
export DATABASE_URL="sqlite:///taskmanager.db"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Task sharing and collaboration
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Mobile app version
- [ ] API endpoints for external integrations

## Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Happy Task Managing!** 🎯
