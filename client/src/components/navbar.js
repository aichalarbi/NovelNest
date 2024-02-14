import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../novelnew.webp';

function NavBar({ handleFilter }) {
    const [title, setTitle] = useState('');

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFilter(title);
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="120"
                        height="80"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="custom-nav-link">Home</Nav.Link>
                        <Nav.Link href="#" className="custom-nav-link">My Books</Nav.Link>
                        <NavDropdown title="Browse" id="basic-nav-dropdown" className="custom-nav-dropdown">
                            <NavDropdown.Item href="#" className="custom-dropdown-item">Discussions</NavDropdown.Item>
                            <NavDropdown.Item href="#" className="custom-dropdown-item">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/users/register" className="custom-dropdown-item">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <form onSubmit={handleSubmit} className="d-flex">
                        <input
                            className="form-control custom-search-input me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={title}
                            onChange={handleChange}
                        />
                        <button className="btn btn-outline-custom" type="submit">Search</button>
                    </form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
