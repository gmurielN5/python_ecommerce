# # Use an official Python runtime as a parent image
# FROM python:3.11-slim

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the requirements file and install any dependencies
# COPY requirements.txt /app/
# RUN pip install --upgrade pip && pip install -r requirements.txt

# # Copy the rest of the application code
# COPY . /app/

# # Run database migrations and then start the Django development server
# CMD ["sh", "-c", "python manage.py makemigrations base && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV DJANGO_SETTINGS_MODULE=server.settings \
  PYTHONUNBUFFERED=1
CMD ["sh", "-c", "python manage.py migrate && gunicorn server.wsgi:application --bind 0.0.0.0:8000"]
