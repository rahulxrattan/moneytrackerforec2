FROM node:18
# Set working directory for the application
WORKDIR /app
# Update the package index and install Git
RUN apt-get update && apt-get install -y git
# Clone your project repository
RUN git clone https://github.com/rahulxrattan/moneytrackerforec2.git .

# Install PM2 globally
RUN npm install -g pm2

# Install frontend dependencies
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the backend and frontend files
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Copy the startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose the required ports
EXPOSE 5000 5173

# Start both backend and frontend using the startup script
CMD ["/app/start.sh"]