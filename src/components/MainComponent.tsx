import React, { useState } from 'react';
import Upload from './Upload';
import RunPredictionButton from './RunPredictionButton';

const MainComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <div>
      <p>Please upload input traffic video with .mp4 format</p>
      <Upload onFileChange={handleFileChange} />
      <RunPredictionButton selectedFile={selectedFile} />
    </div>
  );
};

export default MainComponent;