# Use a newer Python runtime
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code into the container
COPY app ./app

# Copy the wait-for-it script into the container
COPY wait-for-it.sh .

# Make the script executable
RUN chmod +x wait-for-it.sh

# Expose port 8000 for the API
EXPOSE 8000

# Run the application with wait-for-it.sh
CMD ["./wait-for-it.sh", "db:5432", "--", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
