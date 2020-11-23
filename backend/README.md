# Computer Security homework - backend

This folder contains the backend of the webshop. It is a Django project written in Python.

## Running the backend

1. Install Python for your operating system
2. Clone the project
3. Change directory into the project
4. Create a new Python virtual environment:

    - `python -m venv .env`

5. Activate the virtual environment:

    - On Unix/Linux: `source .env/bin/activate`
    - On Windows: `.env\Scripts\activate.bat` (or `.env\Scripts\Activate.ps1` for PowerShell)

6. Install the required Python packages:

    - `pip install -r requirements.txt`

7. Set the following environment variables:

    - `DJANGO_SETTINGS_MODULE`: either `webshop.settings.local` for local development, or `webshop.settings.production` for deployment.
    - `SECRET_KEY`: generate a Django secret key, eg. with this command:
        - `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`

8. Change to the `webshop` directory
9. Apply migrations:

    - `python manage.py migrate`

10. Run the server:

    - `python manage.py runserver`

## (Optional) Setup VS Code for development

1. Do the steps in the previous section
2. Install code formatting and linting tools for the Python environment:

    - `pip install pylint pylint-django bandit black`

2. Open the `backend` folder in VS Code
3. Install the recommended extensions
4. Create the `.env_vars` file in the top folder, and add the two required environment variables in `<VAR_NAME>=<VALUE>` format
4. You can now open the source files in VS Code with code assistance, use VS Code's built-in debugger etc.
