import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddSplit extends Component {
    state={
         Security_Code:"",Company_Name:"",New_Face_Value:"",Old_Face_Value:""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addSplit(this.state);
        this.setState({  Security_Code:"",Company_Name:"",New_Face_Value:"",Old_Face_Value:"" });
    }

    addSplit = (state) =>{
        //console.log(id);
        axios.post(`http://127.0.0.1:5000/table/splits`,{
            'New_Face_Value':state.New_Face_Value,
            'Old_Face_Value':state.Old_Face_Value,
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
    <Form.Label>Old Face Value</Form.Label>
    <Form.Control type='text' name='Old_Face_Value' placeholder='Add Old Face Value' value={this.state.Old_Face_Value} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>New Face Value</Form.Label>
    <Form.Control type='text' name='New_Face_Value' placeholder='Add New Face Value' value={this.state.New_Face_Value} onChange={this.onChange} />
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


export default AddSplit;