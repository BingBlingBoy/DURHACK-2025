# Backend API

A simple Express.js REST API for the DURHACK-2025 project with image upload and profile extraction capabilities.

## Features

- Express.js server with REST API endpoints
- CORS enabled for cross-origin requests
- Environment variable configuration with dotenv
- JSON request/response handling
- File upload support with Multer
- Image processing for profile extraction
- Error handling middleware
- Health check endpoint

## Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```bash
cp .env.example .env
```

Edit the `.env` file to configure your environment variables.

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` by default (or the PORT specified in your `.env` file).

## API Endpoints

### Root
- **GET** `/`
  - Returns API welcome message and status

### Health Check
- **GET** `/api/health`
  - Returns server health status and timestamp

### Extract Profile
- **POST** `/api/extract_profile`
  - Extracts profile information from uploaded images
  - Accepts multiple image files (max 10 files)
  - Maximum file size: 10MB per file
  - Supported formats: JPEG, JPG, PNG, GIF, WEBP, BMP
  - Form field name: `images`
  - Request: multipart/form-data with image files
  - Response:
    ```json
    {
      "message": "Images received successfully",
      "filesCount": 2,
      "files": [
        {
          "filename": "images-1234567890-123456789.jpg",
          "originalName": "profile.jpg",
          "mimetype": "image/jpeg",
          "size": 245678,
          "path": "./uploads/images-1234567890-123456789.jpg"
        }
      ],
      "extractedData": {
        "status": "pending_processing"
      }
    }
    ```

## Example Requests

### Get API Status
```bash
curl http://localhost:3001/
```

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Upload Images for Profile Extraction
```bash
curl -X POST http://localhost:3001/api/extract_profile \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.png"
```

Using JavaScript (fetch):
```javascript
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);

fetch('http://localhost:3001/api/extract_profile', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Project Structure

```
backend/
├── server.js          # Main server file with routes
├── package.json       # Project dependencies and scripts
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore rules
├── uploads/           # Directory for uploaded files (auto-created)
└── README.md          # This file
```

## Technologies Used

- **Express.js** - Fast, unopinionated web framework for Node.js
- **Multer** - Middleware for handling multipart/form-data (file uploads)
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

## File Upload Configuration

- **Maximum files per request**: 10
- **Maximum file size**: 10MB per file
- **Allowed file types**: JPEG, JPG, PNG, GIF, WEBP, BMP
- **Upload directory**: `./uploads/`
- **File naming**: `images-[timestamp]-[random]-[extension]`

## Error Handling

The API handles various error scenarios:

- **No files uploaded**: Returns 400 with error message
- **Invalid file type**: Returns error for non-image files
- **File too large**: Returns 400 if file exceeds 10MB
- **Too many files**: Returns 400 if more than 10 files uploaded
- **General errors**: Returns 500 with error details

## Customization

### Adding Image Processing Logic

To add custom image processing logic, modify the `/api/extract_profile` route in `server.js`:

```javascript
app.post("/api/extract_profile", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Add your custom processing logic here
    const results = await processImages(req.files);
    
    res.json({
      message: "Images processed successfully",
      data: results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Adding New Routes

To add new routes:

1. Open `server.js`
2. Add your routes using Express routing:
```javascript
app.get('/api/your-route', (req, res) => {
  res.json({ message: 'Your response' });
});
```

## Notes

- The server uses ES modules (`type: "module"` in package.json)
- Node.js version 18+ recommended for `--watch` flag support
- Uploaded files are stored in the `./uploads/` directory
- The uploads directory is automatically created if it doesn't exist
- Consider implementing cleanup logic for old uploaded files in production