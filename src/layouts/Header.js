import React from 'react'
import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "home"
    }
  }

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  }

  render() {
    const { activeKey } = this.state;
    return (
      <div className="nav-wrapper">
        <Navbar appearance="inverse" activeKey={activeKey} onSelect={this.handleSelect} >
          <Navbar.Header>
            <a href="/" className="navbar-brand logo">
              RSUITE
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav activeKey={activeKey} onSelect={this.handleSelect}>
              <Nav.Item componentClass={Link} eventKey="home" icon={<Icon icon="home" />} to='/'>
                Home
              </Nav.Item>
              <Nav.Item componentClass={Link} eventKey="forum" to='/forum'>Forum</Nav.Item>
              <Nav.Item componentClass={Link} eventKey="solutions">Solutions</Nav.Item>
              <Nav.Item componentClass={Link} eventKey="products">Products</Nav.Item>
              <Dropdown title="About">
                <Dropdown.Item eventKey="4">Company</Dropdown.Item>
                <Dropdown.Item eventKey="5">Team</Dropdown.Item>
                <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
              </Dropdown>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </div>
    );
  }
}

export default Header