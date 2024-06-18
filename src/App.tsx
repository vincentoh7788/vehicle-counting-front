import MainComponent from "./components/MainComponent";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import useToken from './components/useToken'
import { Route, Routes,} from 'react-router-dom';
import NavBar from "./components/NavBar";
import History from './components/History';
import Footer from "./components/Footer";

const App = () => { 
  const { token, removeToken, setToken } = useToken();
  return (
    
    <div className = "App">
      
      {!token?(
      <Routes>
        <Route path = '/' element={<LandingPage setToken={setToken}/>} />
        <Route path='/signup' element={<SignUp/>} />
        
        </Routes>
       ):(   
            <Routes>
              <Route path = '/' element={<LandingPage setToken={setToken}/>} />
              <Route path="/home" element={<MainComponent token={token} setToken={setToken}/>}></Route>
              <Route path = '/logout' element={<NavBar/>}></Route>
              <Route path="/history" element={<History token={token} setToken={setToken}/>}></Route>
            </Routes>
        )}
        <Footer/>
     </div>
     
   
  );
};


export default App;
