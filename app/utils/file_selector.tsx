import { useState } from "react";

const API_URL = "http://localhost:3001";

const SingleFileOpener = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
    
    if (e.target.files && e.target.files.length > 0) {
      const imagePreviews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(imagePreviews);
    } else {
      setPreviews([]);
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

      const response = await fetch(`${API_URL}/api/extract_profile`, {
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
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload files";
      setError(errorMessage);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }

    const response = await fetch(`${API_URL}/api/convert_demographics`, {
      method: "POST",
      body: result,
    });
    console.log(response);
  };

  return (
    <>
      <div className="flex items-center flex-col gap-y-4">
        <h1 className="font-bold text-4xl">Enter Files to Analyse</h1>
        <div className="flex flex-col items-start mb-4 font-extrabold text-2xl">
          <input
            id="file"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Browse Files
          </label>

        </div>
        {files &&
          [...files].map((file, index) => (
            <section key={file.name}>
              <h1 className="text-3xl font-semibold">
                Name: {file.name}
              </h1>
              <ul>
                <li>Type: {file.type}</li>
              </ul>
              <div className="flex flex-wrap gap-4 justify-center">
                  <img
                    key={index}
                    src={previews[index]}
                    alt={`Preview ${index}`}
                    className="w-1/4 h-1/4 object-cover rounded-lg shadow"
                  />
              </div>
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
      </div>
    </>
  );
};

export default SingleFileOpener;
