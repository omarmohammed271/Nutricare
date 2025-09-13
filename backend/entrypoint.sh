#!/bin/bash

# Wait for DB with better error handling
echo "Waiting for PostgreSQL..."
max_retries=30
retry_count=0

while [ $retry_count -lt $max_retries ]; do
    if nc -z db 5432; then
        echo "PostgreSQL started"
        break
    else
        echo "PostgreSQL not ready yet (attempt $((retry_count + 1))/$max_retries)..."
        sleep 2
        retry_count=$((retry_count + 1))
    fi
done

if [ $retry_count -eq $max_retries ]; then
    echo "Error: Could not connect to PostgreSQL after $max_retries attempts"
    exit 1
fi

echo "Collecting static files..."
python manage.py collectstatic --noinput
echo "Makemigrations..."
python manage.py makemigrations 
echo "Applying migrations..."
python manage.py migrate

echo "Starting server..."
exec daphne -b 0.0.0.0 -p 8000 project.asgi:application