import React, { Component, Fragment } from 'react';
import {Table,Button} from 'react-bootstrap'
import axios from 'axios';
import  SearchBarMF  from './SearchBarMF';
import { CSVLink} from "react-csv";
import '../App.css'
import Spinner from './Spinner'

export class MutualFund extends Component {

    state={
        cas:[{"ISIN":"","Record_Date":"","Maturity_Date":""}]
      }
    
      
    
       componentDidMount(){
        axios.get('http://127.0.0.1:5000/table/mutualfunds') 
        .then(res => this.setState({cas: res.data}))
      }

      search = (ISIN) =>{
        axios.post(`http://127.0.0.1:5000/table/filter/mutualfunds`,{
          "ISIN": ISIN
        
          
        })
        .then(res=> this.setState({cas: res.data}));
      }
      
    render() {
      if(this.state.cas[0].ISIN===''){
        return(
          <Spinner />
        )
      }else{
        return(
          <Fragment>
            <Button variant="danger" className="but"><CSVLink className="but" data={this.state.cas}>Download CSV</CSVLink></Button>
          <SearchBarMF search={this.search} />
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">ISIN Number</th>
      <th className="com">Record Date</th>
      <th className="com">Maturity Date</th>
      </tr>
      </thead>
      <tbody>
      {this.state.cas.map((res) => (
          <tr key={res._id}>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
      </Fragment>
                ) 
          
      }
}
}



export default MutualFund