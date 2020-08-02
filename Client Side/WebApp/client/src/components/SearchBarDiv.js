import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form,Button,Col } from 'react-bootstrap';

export class SearchBarDiv extends Component {
    state = {
        Security_Code: '',
        Company_Name: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.Security_Code, this.state.Company_Name);
        this.setState({ Security_Code: '', Company_Name:'' });
    }

    render() {
        return (
            <Form>
  <Form.Row className="align-items-center">
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInput" srOnly>
        Security Code
      </Form.Label>
      <Form.Control
        className="mb-2"
        id="inlineFormInput"
        placeholder="Security Code"
        name="Security_Code"
        onChange={this.onChange}
        value={this.state.Security_Code}
      />
    </Col>
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInputGroup" srOnly>
        Company Name
      </Form.Label>
        <Form.Control id="inlineFormInputGroup" placeholder="Company Name" name="Company_Name" onChange={this.onChange} value={this.state.Company_Name}/>
    </Col>
    <Col xs="auto">
      <Button type="submit" className="mb-2" onClick={this.onSubmit}>
        Search
      </Button>
    </Col>
  </Form.Row>
</Form>
        )
    }
}

//Proptypes
SearchBarDiv.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchBarDiv