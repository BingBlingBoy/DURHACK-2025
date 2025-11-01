import { useState } from "react";

const SingleFileOpener = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files)
        }
    }
    
    const handleUpload = async () => {

    }

    return (
        <>
            <div className="flex flex-col items-start mb-4 font-extrabold text-2xl hover:bg-red-500">
                <input id="file" type="file" multiple onChange={handleFileChange}/>
            </div>
            {files && [...files].map((file, index) => (
                <section key={file.name}>
                    File {index+1} details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Name: {file.type}</li>
                        <li>Name: {file.size} bytes</li>
                    </ul>
                </section>
            ))}
            
            {files && (
                <button onClick={handleUpload} className="submit">Upload file</button>
            )}
        </>
    )
}

export default SingleFileOpener