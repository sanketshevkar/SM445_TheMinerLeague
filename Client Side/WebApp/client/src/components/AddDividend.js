import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddDividend extends Component {
    state={
      ISIN:"", Security_Code:"",Company_Name:"", Record_Date:"",Payment_Date:"",BC_Start:"",BC_End:"",Type:"" 
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addDividend(this.state);
        this.setState({  ISIN:"", Security_Code:"",Company_Name:"", Record_Date:"",Payment_Date:"",BC_Start:"",BC_End:"",Type:"" });
    }

    addDividend = (state) =>{
        //console.log(id);
        axios.post(`http://127.0.0.1:5000/table/dividend`,{
            'ISIN':state.ISIN,
            'Record_Date':state.Record_Date,
            'Payment_Date':state.Payment_Date,
            'BC_Start':state.BC_Start,
            'BC_End':state.BC_End,
            'Type':state.Type,
            'Company_Name':state.Company_Name,
            'Security_Code':state.Security_Code
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>


  <Form.Group controlId="formBasicEmail">
    <Form.Label>Security Code</Form.Label>
    <Form.Control type='text' name='Security_Code' placeholder='Add Security Code' value={this.state.Security_Code} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Company Name</Form.Label>
    <Form.Control type='text' name='Company_Name' placeholder='Add Company_Name' value={this.state.Company_Name} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Record Date</Form.Label>
    <Form.Control type='text' name='Record_Date' placeholder='Add Record Date' value={this.state.Record_Date} onChange={this.onChange} />
  </Form.Group>


  <Form.Group controlId="formBasicEmail">
    <Form.Label>Payment date</Form.Label>
    <Form.Control type='text' name='Payment_Date' placeholder='Add Payment Date' value={this.state.Payment_Date} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Dividend Type</Form.Label>
    <Form.Control type='text' name='Type' placeholder='Add Dividend Type' value={this.state.Type} onChange={this.onChange} />
  </Form.Group>


  <Button variant="primary" type="submit" onClick={this.onSubmit}>
    Add Details
  </Button>
</Form>

            </div>
        </React.Fragment>
        
    );
  }
}


export default AddDividend;