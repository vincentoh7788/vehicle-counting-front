import React, { useState } from 'react';
import axios from 'axios';

interface RunPredictionButtonProps {
  selectedFile: File | null;
}

interface PredictionResponse {
  counter_in: number[];
  counter_out: number[];
  output_video: string;
}

const RunPredictionButton: React.FC<RunPredictionButtonProps> = ({ selectedFile }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleButtonClick = async () => {
    if (!selectedFile) {
      setError('No file selected.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post<PredictionResponse>('https://c5ba-104-197-117-254.ngrok-free.app/output', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResponse(response.data);
      setLoading(false);
    } catch (error:any){
      setError(error.response?.data?.error || 'Fail to connect to server');
      setLoading(false);
    }
  };

  return (
    <div>
      {!response && <button onClick={handleButtonClick} disabled={loading}>
        {loading ? 'Processing...' : 'Run Prediction'}
      </button>}

      {error && <div>Error: {error}</div>}
      {response && (
        <div>
          <h4>Counter In:</h4>
          <ul>    
        <li key={0}>{`Bicycle : ${response.counter_in[0]}`}</li>
        <li key={1}>{`Bus : ${response.counter_in[1]}`}</li>
        <li key={2}>{`Car : ${response.counter_in[2]}`}</li>
        <li key={3}>{`Motorcycle : ${response.counter_in[3]}`}</li>
        <li key={4}>{`Pedestrian: ${response.counter_in[4]}`}</li>
        <li key={5}>{`Truck: ${response.counter_in[5]}`}</li>
    </ul>
        <h4>Counter Out:</h4>
        <ul>
        <li key={0}>{`Bicycle : ${response.counter_out[0]}`}</li>
        <li key={1}>{`Bus : ${response.counter_out[1]}`}</li>
        <li key={2}>{`Car : ${response.counter_out[2]}`}</li>
        <li key={3}>{`Motorcycle : ${response.counter_out[3]}`}</li>
        <li key={4}>{`Pedestrian: ${response.counter_out[4]}`}</li>
        <li key={5}>{`Truck: ${response.counter_out[5]}`}</li>
        </ul>
          <a href={`http://localhost:5173/output_video/${response.output_video}`} className="btn btn-primary" download>Download Your Output Video Here</a>
          <button className="btn btn-success">Save Result </button>
          <button className="btn btn-danger">Reset</button>
        </div>
      )}
    </div>
  );
};

export default RunPredictionButton;