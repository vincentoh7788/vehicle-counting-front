import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import video from '../assets/sample.mp4';
import { API_HOST } from "./config";
import Spinner from 'react-bootstrap/Spinner';
interface PredictionResponse {
  counter_in: number[];
  counter_out: number[];
  output_video: string;
}
type Props = {
  setToken: (token: string) => void;
  token: string;
};
const MainComponent: React.FC<Props> = (props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [videoHeight, setVideoHeight] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const respName = await axios.get(`${API_HOST}/getname`,{
          headers: {
            Authorization: `Bearer ${props.token}`,
            'ngrok-skip-browser-warning': true
          }
        
        });
        setUsername(respName.data.username);
        if(respName.data.access_token){
          props.setToken(respName.data.access_token);
        }

      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, [props.token]);


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      const maxWidth = 1920; // Replace with your maximum width
      const maxHeight = 1080; // Replace with your maximum height

      if (video.videoWidth > maxWidth || video.videoHeight > maxHeight) {
        alert(`Video dimensions must be no more than ${maxWidth}x${maxHeight}`);
        setSelectedFile(null);
        if (event.target) {
          event.target.value = '';
          setLineHeight(null);
          setVideoHeight(null);
        }
      } else {
        setSelectedFile(file);
        setVideoHeight(video.videoHeight);
        setLineHeight(video.videoHeight*2/3);
        console.log(video.videoHeight*2/3);
        alert("File uploaded successfully")
      }
    };
    
  } else {
    setSelectedFile(null);
  }
}

const handleButtonClick = async () => {
  if (!selectedFile) {
    alert('No file selected.');
    return;
  }
  if(!lineHeight){
    alert("Please enter the line height");
    return;
  }
  if(videoHeight && lineHeight && lineHeight > videoHeight){
    alert("Line height should not exceed video height");
    return;

  }

  try {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('lineHeight', lineHeight.toString());
    const response = await axios.post<PredictionResponse>(`${API_HOST}/output`, formData, {
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
const handleResetButton = ()=>{
setSelectedFile(null);
setLineHeight(null);
setVideoHeight(null);
setResponse(null);
setError('');
};

const handleSave = async() => {
  setError('');
  try {
    const resp = await axios.post(`${API_HOST}/save`,{
      output_video: response?.output_video,
      counter_in: response?.counter_in,
      counter_out: response?.counter_out},{
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }
    );
    if(resp.status === 201){
      alert("Result saved successfully")
      //Clear the response(add it later)
      setSelectedFile(null);
      setResponse(null);
      setLineHeight(null);
      setVideoHeight(null);
    }
 
  }
  catch(error:any){
   console.log(error.response.data.error)
  }
};
  return (
    <>
    <NavBar></NavBar>
    <div className = "container">
      {!response && <div><h1 className = "display-6">Welcome to our application, {username}.</h1>
      <p>This application using YOLOv8 to detect the vehicle on each frame.
      After that, the DeepSORT algorithm will track the object detected in each frame.
      Finally, the counting algorithm will count the number of vehicles that enter and exit the frame.
      </p>
      <div className="d-flex justify-content-center">
      <div className="card rounded-0 shadow">
      <div className="card-body">
      <p className ="card-header lead">Example of output video</p>
      
      <video controls>
      <source src= {video} type="video/mp4" />
      Your browser does not support the video tag.
      </video>
      </div>
      </div>
      </div>
      
      <div className="card rounded-0 shadow">
      <div className="card-body">
      <p>To start the prediction,please upload input traffic video with .mp4 format.</p>
      <p>Maximum width and height of the video is 1920*1080</p>
      <input type="file" accept=".mp4" onChange={handleFileChange}/>
      <label htmlFor="videoHeight">Video Height:</label>
      <input type="number" id = "videoHeight" value = {videoHeight||''} readOnly/>
      <div>
      <p>Please enter the line height for the to adjust the location of line. The line is used for counting algorithm.The input height should not exceed video height.</p>
      <label htmlFor="lineHeight">Line Height:</label>
      <input type="number" id = "lineHeight" value = {lineHeight||''} onChange={event => setLineHeight(Number(event.target.value))} placeholder="Line Height" required/>
      </div>
      <p>Next, press the button below to start prediction.</p>
      <div>
      <Spinner animation="border" role="status" hidden={!loading}></Spinner>
      {!response && <button onClick={handleButtonClick} disabled={loading} className = "btn btn-primary">
        {loading ? 'Processing...' : 'Run Prediction'}
      </button>}
      </div>
      </div>
      </div>
      </div>}
      
      {error && <div>Error: {error}</div>}
      {response && (
        <div className = "container">
          <div className = "row">
          <div className="col-sm-6">
          <div className="card rounded-0 shadow">
      <div className="card-body"> 
          
          <h3 className = "card-title">Counter In</h3>
          <ul>    
        <li key={0}>{`Bicycle : ${response.counter_in[0]}`}</li>
        <li key={1}>{`Bus : ${response.counter_in[1]}`}</li>
        <li key={2}>{`Car : ${response.counter_in[2]}`}</li>
        <li key={3}>{`Motorcycle : ${response.counter_in[3]}`}</li>
        <li key={4}>{`Pedestrian: ${response.counter_in[4]}`}</li>
        <li key={4}>{`Truck: ${response.counter_in[5]}`}</li>
    </ul>
    
    </div>
    </div>
    </div>
    <div className="col-sm-6">
    <div className="card rounded-0 shadow">
      <div className="card-body">
        <h3 className = "card-title">Counter Out</h3>
        <ul>
        <li key={0}>{`Bicycle : ${response.counter_out[0]}`}</li>
        <li key={1}>{`Bus : ${response.counter_out[1]}`}</li>
        <li key={2}>{`Car : ${response.counter_out[2]}`}</li>
        <li key={3}>{`Motorcycle : ${response.counter_out[3]}`}</li>
        <li key={4}>{`Pedestrian: ${response.counter_out[4]}`}</li>
        <li key={5}>{`Truck: ${response.counter_out[5]}`}</li>
        </ul>
        </div>
        </div>
        </div>
        </div>
       
        
        
        
        {response.output_video && (<div className="card rounded-0 shadow">
      <div className="card-body">
      <p className="card-header lead"><strong>Output Video</strong></p>
      <video controls>
      <source src= {`${API_HOST}/getvideo?filename=${response.output_video}`} type="video/mp4" />
      Your browser does not support the video tag.
      </video>
      </div>
      </div>
      )}
        

        <div className="btn-group" role="group" aria-label="Basic example">
        <a href={`${API_HOST}/downloadvideo?filename=${response.output_video}`} download className="btn btn-info" role="button"> Download output video</a>
          <button className="btn btn-success" onClick={handleSave}>Save Result </button>
          <button className="btn btn-danger" onClick={handleResetButton}>Reset</button>
          </div>
          </div>
         
      )}
    
    </div>
    </>
  );
};

export default MainComponent;