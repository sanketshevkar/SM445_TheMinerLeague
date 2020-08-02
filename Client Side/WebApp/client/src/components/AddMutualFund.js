import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddMutualFund extends Component {
    state={
      ISIN:"", Record_Date:"",Maturity_Date:""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addMutualFund(this.state);
        this.setState({  ISIN:"", Record_Date:"",Maturity_Date:"" });
    }

    addMutualFund = (state) =>{
        //console.log(id);
        axios.post(`http://127.0.0.1:5000/table/mutualfunds`,{
            'ISIN':state.ISIN,
            'Record_Date':state.Record_Date,
            'Maturity_Date':state.Maturity_Date,

        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>ISIN Nummber</Form.Label>
    <Form.Control type='text' name='ISIN' placeholder='Add ISIN Number' value={this.state.ISIN} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Record Date</Form.Label>
    <Form.Control type='text' name='Record_Date' placeholder='Add Record Date' value={this.state.Record_Date} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Maturity date</Form.Label>
    <Form.Control type='text' name='Maturity_Date' placeholder='Add Maturity Date' value={this.state.Maturity_Date} onChange={this.onChange} />
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


export default AddMutualFund;