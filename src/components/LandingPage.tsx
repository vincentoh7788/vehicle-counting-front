import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useToken from './useToken';
import { API_HOST } from "./config";

type Props = {
  setToken: (token: string) => void;
};
const LandingPage:React.FC<Props>=(props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useToken();
  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);
const handleLogin = async(e: React.FormEvent)=>{
  e.preventDefault();
  if(!email || !password){
    alert("Please enter your email and password!")
  }
  try{
  const resp = await axios.post(`${API_HOST}/login`, {
    email,
    password,
  });
  if (resp.status === 200) {
    props.setToken(resp.data.token);
    navigate("/home");
  }
}
catch(error:any){
  if (error.response.status===401) {         
    alert("Invalid email or password");
    return; // Return to prevent further execution    
}

else{
  alert("Server error, please try later");
}
}
}

  return (
          <div className = "container">
          <div className="d-flex justify-content-center">
          <div className="card rounded-0 shadow">
          <div className="card-body">
          <p className="display-6">Welcome to Vehicle Counting Application</p>
            <p className = "lead">Have Account? You may sign in to your account.</p>
            <form onSubmit={handleLogin}>
            <div className = "form-group">
            <label htmlFor="LoginInputEmail1">Email address</label>
                <input name = "useremail" type="email" id="LoginInputEmail1" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} className = "form-control" required
          />
          </div>
          <br></br>
          <div className = "form-group">
          <label htmlFor="LoginInputPassword1">Password</label>
          <input
            type="password" name = "userpassword" id="LoginInputPassword1" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} className = "form-control" required
          />
          </div>
       <br></br>
          <button className = "btn btn-primary" onSubmit={handleLogin}>Login</button>
          
        </form>    
        <br></br>    
        <a href="/signup">
               If you dont have an account yet, sign up here
            </a>
            </div>
            </div> 
          
        </div>
        </div>
        
  )
}

export default LandingPage

