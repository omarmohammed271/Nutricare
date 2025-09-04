#!/bin/bash

# Wait for DB
echo "Waiting for PostgreSQL..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Makemigrations."
python manage.py makemigrations 
echo "Applying migrations..."
# Run migrations and start server
python manage.py migrate
daphne -b 0.0.0.0 -p 8000 project.asgi:application
