import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap'

export class Tab extends Component {
    render() {
        return(
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="obj">ISIN Number</th>
      <th className="com">Record Date</th>
      <th className="com">Maturity Date</th>
      </tr>
      </thead>
      <tbody>
      {this.props.cas.map((res) => (
          <tr key={res._id}>
                <td className="obj">{res.ISIN}</td>
                <td className="com">{res.Record_Date}</td>
                <td className="com">{res.Maturity_Date}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
                ) 
          
          
}
}

Table.propTypes = {
    cas: PropTypes.array
}

export default Tab