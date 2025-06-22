# Headout Project

Welcome to the Headout project, a comprehensive application for managing and displaying timeline posts with image uploads. This project consists of a backend server built with Node.js and TypeScript, and frontend applications for user interaction.

## Project Structure

- **backend/**: Contains the server-side code built with Node.js and TypeScript.
  - **src/**: Core backend logic including API routes, database clients, and storage configurations.
  - **scripts/**: Utility scripts, including `post_insert.ts` for batch image uploads to Azure Blob Storage.
- **frontend/**: A React-based frontend application for user interaction.
  - **src/pages/**: Includes pages like `Timeline.tsx` for displaying paginated timeline posts and `Upload.tsx` for image uploads.
- **webapp/**: An alternative frontend application (possibly Next.js) with similar functionality.
  - **src/pages/**: Includes pages like `timeline.tsx` and `upload.tsx`.

## Features

- **Image Upload**: Users can upload images which are stored in Azure Blob Storage.
- **Timeline View**: A paginated view of posts fetched from the backend API, displaying images and related content.
- **Backend API**: RESTful endpoints for managing posts, uploads, and timeline data.

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (Node Package Manager)
- Azure Storage account credentials for blob storage operations
- PostgreSQL database (configured in backend environment)

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env` file in the `backend` directory with necessary configurations for Azure Storage and PostgreSQL database connections. Refer to `backend/.env` template or documentation for required variables.
4.
5. **Start the backend server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default (adjust port if configured differently).

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend application**:
   ```bash
   npm start
   ```
   The React app will open in your browser at `http://localhost:3000` or a similar port.

### Webapp Setup (Alternative Frontend)

1. **Navigate to the webapp directory**:
   ```bash
   cd webapp
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the webapp**:
   ```bash
   npm run dev
   ```
   The Next.js app (if applicable) will run on `http://localhost:3000` or as configured.

## Usage

- **Uploading Images**: Use the upload feature in the frontend or webapp to send images to the backend, which stores them in Azure Blob Storage.
- **Viewing Timeline**: Access the timeline page to see a paginated list of posts fetched from the backend API.
- **Batch Image Upload**: Run the script in `backend/scripts/post_insert.ts` to upload multiple images from the `backend/scripts/images` directory to Azure Blob Storage:
  ```bash
  cd backend && node scripts/post_insert.ts
  ```

## API Endpoints

- **GET /api/timeline**: Fetch paginated timeline posts. Parameters: `page` and `limit`.
- **POST /api/upload**: Upload an image file with user metadata.
- **POST /api/timeline**: Create a new post with an image and user details.

## Storage Configuration

This project uses Azure Blob Storage for image storage. Ensure that the Azure connection string and container details are correctly configured in the backend environment variables.
