import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import { Nav } from 'react-bootstrap';


export class Navi extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">FINDEX</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/mutualfunds">Mutual Funds</Nav.Link>
          <Nav.Link href="/dividends">Dividends</Nav.Link>
          <Nav.Link href="/split">Stock Splits</Nav.Link>
          <Nav.Link href="/bcDate">Book Closure Dates</Nav.Link>
          <Nav.Link href="/addData">Add Data</Nav.Link>
          <Nav.Link href="/upload">Upload</Nav.Link>
      <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}



export default Navi;
