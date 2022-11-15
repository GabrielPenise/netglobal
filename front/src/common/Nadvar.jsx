import Nav from 'react-bootstrap/Nav';
import logo from "../assets/styles/image/logo_azul.png";

function Nadvar() {
  return (
    <Nav className='nav'>
      <img className='logoNav' src={logo} />
      <Nav.Item as="li">
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default  Nadvar;