import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddBCDate extends Component {
    state={
     Security_Code:"",Company_Name:"",BC_Start:"",BC_End:""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addBCDate(this.state);
        this.setState({  Security_Code:"",Company_Name:"",BC_Start:"",BC_End:"" });
    }

    addBCDate = (state) =>{
        //console.log(id);
        axios.post(`http://127.0.0.1:5000/table/bcdate`,{
            'BC_Start':state.BC_Start,
            'BC_End':state.BC_End,
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
    <Form.Label>BC Start Date</Form.Label>
    <Form.Control type='text' name='BC_Start' placeholder='Add BC Start Date' value={this.state.BC_Start} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>BC End date</Form.Label>
    <Form.Control type='text' name='BC_End' placeholder='Add BC End Date' value={this.state.BC_End} onChange={this.onChange} />
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


export default AddBCDate;