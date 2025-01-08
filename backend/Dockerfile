# Use a smaller, more secure base image
FROM --platform=linux/arm64/v8 python:3.13
# Set working directory
WORKDIR /app

# Copy only necessary files
COPY ./requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY ./ ./

# Expose the port Uvicorn will run on
EXPOSE 8000

# Command to run the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]