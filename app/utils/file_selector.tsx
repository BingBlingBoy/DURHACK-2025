import { useState } from "react";

const GEMINI_API_URL = "http://localhost:3001";
const REGRESSION_API_URL = "http://localhost:5000";

const SingleFileOpener = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();

      // Append all files to the form data with the field name "images"
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(`${GEMINI_API_URL}/api/extract_profile`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      setResult(data);
      console.log("Upload successful:", data);

      // Convert demographics to Titanic format
      const convertResponse = await fetch(
        `${GEMINI_API_URL}/api/convert_demographics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            demographics: data,
          }),
        },
      );

      if (!convertResponse.ok) {
        const errorData = await convertResponse.json();
        throw new Error(errorData.message || "Conversion failed");
      }

      const convertedData = await convertResponse.json();
      console.log("Conversion successful:", convertedData);

      setResult(convertedData);

      const modelResponse = await fetch(`${REGRESSION_API_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Pclass: convertedData.values.Pclass,
          Sex: convertedData.values.Sex,
          Age: convertedData.values.Age,
          Fare: convertedData.values.Fare,
          Embarked: convertedData.values.Embarked,
        }),
      });

      if (!modelResponse.ok) {
        const errorData = await modelResponse.json();
        throw new Error(errorData.message || "Model prediction failed");
      }

      const predictionData = await modelResponse.json();
      console.log("Model prediction:", predictionData);

      setResult({
        // ...convertedData,
        prediction: predictionData.survived ? "Survived" : "Didn't survive",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to process files";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start mb-4 font-extrabold text-2xl hover:bg-red-500">
        <input id="file" type="file" multiple onChange={handleFileChange} />
      </div>
      {files &&
        [...files].map((file, index) => (
          <section key={file.name}>
            File {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Name: {file.type}</li>
              <li>Name: {file.size} bytes</li>
            </ul>
          </section>
        ))}

      {files && (
        <button onClick={handleUpload} className="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload files"}
        </button>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <strong>Success!</strong>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
};

export default SingleFileOpener;
