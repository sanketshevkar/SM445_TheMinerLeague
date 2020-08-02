import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form,Button,Col } from 'react-bootstrap';

export class SearchBarMF extends Component {
    state = {
        ISIN: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.ISIN);
        this.setState({ ISIN: ''});
    }

    render() {
        return (
            <Form>
  <Form.Row className="align-items-center">
    <Col xs="auto">
      <Form.Label htmlFor="inlineFormInput" srOnly>
        ISIN Number
      </Form.Label>
      <Form.Control
        className="mb-2"
        id="inlineFormInput"
        placeholder="ISIN Number"
        name="ISIN"
        onChange={this.onChange}
        value={this.state.ISIN}
      />
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
SearchBarMF.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchBarMF