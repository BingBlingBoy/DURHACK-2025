import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

import { extractHingeInfo, mapProfileDemographicsToTitanic } from "./ai.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|bmp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.post(
  "/api/extract_profile",
  upload.array("images", 3),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          error: "No images uploaded",
          message: "Please upload at least one image file",
        });
      }

      const uploadedFiles = req.files.map((file) => {
        console.log(
          `Processing file: ${file.originalname}, mimetype: ${file.mimetype}`,
        );
        return {
          mimetype: file.mimetype,
          data: fs.readFileSync(file.path, { encoding: "base64" }),
        };
      });

      console.log(`Sending ${uploadedFiles.length} images to Gemini API`);

      const profileData = await extractHingeInfo(uploadedFiles);

      res.json(profileData);
    } catch (error) {
      console.error("Error processing images:", error);
      res.status(500).json({
        error: "Failed to process images",
        message: error.message,
      });
    }
  },
);

// Given JSON formatted Hinge profile demographics, use reasoning (vibes) to convert to the inputs for the titanic model.
app.post("/api/convert_demographics", async (req, res) => {
  const demographics = req.body.demographics;

  const titanicDemographics =
    await mapProfileDemographicsToTitanic(demographics);

  res.json(titanicDemographics);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle multer errors specifically
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File too large",
        message: "Each file must be less than 10MB",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        error: "Too many files",
        message: "Maximum 10 files allowed",
      });
    }
  }

  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📍 API endpoints available at http://localhost:${PORT}/api`);
});
