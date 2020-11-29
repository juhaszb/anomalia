# Computer Security homework - backend

This folder contains the backend of the webshop. It is a Django project written in Python.

## Running the backend

1. Install Python for your operating system
2. Clone the project
3. Build the parser in the `parser` folder
4. Copy the binary to the `backend/webshop/animation` folder
5. Change directory into `backend`
6. Create a new Python virtual environment:

    - `python -m venv .env`

7. Activate the virtual environment:

    - On Unix/Linux: `source .env/bin/activate`
    - On Windows: `.env\Scripts\activate.bat` (or `.env\Scripts\Activate.ps1` for PowerShell)

8. Install the required Python packages:

    - `pip install -r requirements.txt`

9. Set the following environment variables:

    - `DJANGO_SETTINGS_MODULE`: either `webshop.settings.local` for local development, or `webshop.settings.production` for deployment.
    - `SECRET_KEY`: generate a Django secret key, eg. with this command:
        - `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`

10. Change to the `webshop` directory
11. Apply migrations:

    - `python manage.py migrate`

12. Run the server:

    - `python manage.py runserver`

You might need to create an admin user to be able to delete users and animations. This can be done with the `python manage.py createsuperuser` command, that will ask for a username, email address and password for the new admin user.

## (Optional) Setup VS Code for development

1. Do the steps in the previous section
2. Install code formatting and linting tools for the Python environment:

    - `pip install pylint pylint-django bandit black`

2. Open the `backend` folder in VS Code
3. Install the recommended extensions
4. Create the `.env_vars` file in the top folder, and add the two required environment variables in `<VAR_NAME>=<VALUE>` format
4. You can now open the source files in VS Code with code assistance, use VS Code's built-in debugger etc.
