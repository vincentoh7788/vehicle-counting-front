import React, { useState } from "react";
import axios from 'axios' ;
import { useNavigate } from "react-router-dom";
import { API_HOST } from "./config";

  const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match, please try again.");
            return;
          }
        try {
          const resp = await axios.post(`${API_HOST}/signup`, {
            email,
            username,
            password,
          });
          if (resp.status === 201) {
            alert("Sign up successful! Please login to your account");
            navigate("/");
          }

          
        } catch (error:any) {
            if (error.response.status===500) {         
                alert("This email is already registered. Please use a different email.");
                return; // Return to prevent further execution    
            }
            else{
              alert("Unexpected error, please try later");
            }
      }
    };
    return (
      <div className = "container">
          <div className="d-flex justify-content-center">
          <div className="col-md-6">
          <div className="card rounded-0 shadow">
          <div className="card-body">
        <h2 className = "display-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
            <div className = "form-group">
            <label htmlFor="InputEmail1">Email address</label>
          <input name = "useremail" type="email" id="InputEmail1" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} className = "form-control" required
          />
          </div>
          <br></br>
          <div className = "form-group">
          <label htmlFor="InputuserName">Username</label>
          <input
            type="text" name = "username" id="InputuserName" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} className = "form-control" required
          />
          </div>
          <br></br>
          <div className = "form-group">
          <label htmlFor="InputPassword1">Password</label>
          <input
            type="password" id="InputPassword1" name = "userpassword" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} className = "form-control" required
          />
          </div>
          <br></br>
          <div className = "form-group">
          <label htmlFor="InputPassword2">Re-type Password</label>  
          <input type="password" id="InputPassword2" placeholder="Enter the password again" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} className = "form-control" required
          />
          </div>
          <br></br>
          <button className= "btn btn-primary" onSubmit={handleSignUp}>Sign Up</button>
        </form>
        <br></br>
        <a href="/">
               If you already have account, login here
            </a>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default SignUp;