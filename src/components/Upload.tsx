import React from 'react';

interface UploadProps {
  onFileChange: (file: File | null) => void;
}

const Upload: React.FC<UploadProps> = ({ onFileChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      onFileChange(file);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div>
      <input type="file" accept=".mp4" onChange={handleFileChange} />
    </div>
  );
};

export default Upload;