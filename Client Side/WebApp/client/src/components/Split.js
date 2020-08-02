import React, { Component, Fragment } from 'react';
import {Table,Button} from 'react-bootstrap'
import axios from 'axios';
import SearchBarDiv from './SearchBarDiv';
import { CSVLink} from "react-csv";
import '../App.css'
import Spinner from './Spinner'

export class Split extends Component {

    state={
        cas:[{"Security_Code":"","Company_Name":"","Old_Face_Value":"","New_Face_Value":""}]
      }
    
      
    
       componentDidMount(){
        axios.get('http://127.0.0.1:5000/table/splits') 
        .then(res => this.setState({cas: res.data}))
      }

      search = (Security_Code, Company_Name) =>{
        axios.post(`http://127.0.0.1:5000/table/filter/splits`,{
          "Security_Code": Security_Code,
          "Company_Name": Company_Name
        
          
        })
        .then(res=> this.setState({cas: res.data}));
      }
      
    render() {
      if(this.state.cas[0].Security_Code===''){
        return(
          <Spinner />
        )
      }else{
        return(
          <Fragment>
            <Button variant="danger" className="but"><CSVLink className="but" data={this.state.cas}>Download CSV</CSVLink></Button>
          <SearchBarDiv search={this.search} />
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="com">Security Code</th>
      <th className="com">Company Name</th>
      <th className="com">New Face Value</th>
      <th className="obj">Old Face Value</th>
      </tr>
      </thead>
      <tbody>
      {this.state.cas.map((res) => (
          <tr key={res._id}>
                <td className="com">{res.Security_Code}</td>
                <td className="com">{res.Company_Name}</td>
                <td className="com">{res.Old_Face_Value}</td>
                <td className="obj">{res.New_Face_Value}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
      </Fragment>
                ) 
          
      }
}
}



export default Split