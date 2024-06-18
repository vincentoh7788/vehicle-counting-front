
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import useToken from './useToken';
import { API_HOST } from "./config";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

 const NavBar:React.FC = () => {
  const navigate = useNavigate();
  const { token, removeToken } = useToken();
  const handleLogout = async () => {
    
    try{
      const resp = await axios.post(`${API_HOST}/logout`, {

      });
      if (resp) {
        removeToken();
        navigate("/")
      }
    }
    catch(error:any){
      if (error.response) {
      alert("Server error, please try later");
      }
    }

  };
   return (
    <Navbar bg="light" expand="lg" style={{ border: '1px inset #AFF' }}>
    <LinkContainer to="/home">
      <Navbar.Brand>Vehicle Counting System</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/home">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/history">
          <Nav.Link>Check History</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/logout">
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
   );
 }

export default NavBar;