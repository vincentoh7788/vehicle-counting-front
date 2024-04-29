import NavBar from "./components/NavBar";
import MainComponent from "./components/MainComponent";

const App = () => { 

  return (
    <div className= "container-fluid">
     <NavBar></NavBar>
     <div className="col-md-4">
    <MainComponent></MainComponent>
     </div>
     </div>
   
  );
};


export default App;
