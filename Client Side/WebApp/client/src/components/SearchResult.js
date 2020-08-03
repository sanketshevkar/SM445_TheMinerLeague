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
    
      
    render() {
        return(
          <Fragment>
              <div className='table'>
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">Company Name</th>
      <th className="com">Dividend</th>
      <th className="com">Type</th>
      <th className="com">Record Date</th>
      <th className="com">Payment Date</th>
      </tr>
      </thead>
      <tbody>
      {this.state.cas.map((res) => (
          <tr key={1}>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>

                </tr>
        ))}
      </tbody>
      </Table>
      </div>

      <div className='table'>
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">Company Name</th>
      <th className="com">From Date</th>
      <th className="com">To Date</th>
      <th className="com">Purpose</th>
      </tr>
      </thead>
      <tbody>
      {this.state.cas.map((res) => (
          <tr key={1}>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>
                <td className="obj">{res.ISIN}</td>

                </tr>
        ))}
      </tbody>
      </Table>
      </div>


      <div className='table'>
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">Company Name</th>
      <th className="com">Record Date</th>
      <th className="com">Old Face Value</th>
      <th className="com">New Face Value</th>
      </tr>
      </thead>
      <tbody>
      {this.state.cas.map((res) => (
          <tr key={1}>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>
                <td className="obj">{res.ISIN}</td>

                </tr>
        ))}
      </tbody>
      </Table>
      </div>
      </Fragment>

      
                ) 
          
}
}



export default SearchResult