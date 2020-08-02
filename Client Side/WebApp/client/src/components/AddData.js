import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Card } from 'react-bootstrap';


class AddData extends Component {





    render() {
        return (

            <Fragment>
                <div className='card'>
                    <Card>
                        <Card.Header>Mutual Fund</Card.Header>
                        <Card.Body>
                            <Card.Title>Change Mutual Fund</Card.Title>
                            <Card.Text>
                                Fill in missing Data or add missing Data about Mutual Fund corporate actions
    </Card.Text>
    <Link to='/addMutualFund' className="btn btn-primary my-1">
                Change
            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='card'>
                    <Card>
                        <Card.Header>Dividend</Card.Header>
                        <Card.Body>
                        <Card.Title>Change Dividend</Card.Title>
                            <Card.Text>
                                Fill in missing Data or add missing Data about Dividend corporate actions
    </Card.Text>
    <Link to='/addDividend' className="btn btn-primary my-1">
                Change
            </Link>
                        </Card.Body>
                    </Card>
                </div>


                <div className='card'>
                    <Card>
                        <Card.Header>Stock Splits</Card.Header>
                        <Card.Body>
                        <Card.Title>Change Stock Split Data</Card.Title>
                            <Card.Text>
                                Fill in missing Data or add missing Data about Stock Split corporate actions
    </Card.Text>
    <Link to='/addSplit' className="btn btn-primary my-1">
                Change
            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='card'>
                    <Card>
                        <Card.Header>Book Closure Dates</Card.Header>
                        <Card.Body>
                        <Card.Title>Change Book Closure Dates</Card.Title>
                            <Card.Text>
                                Fill in missing Data or add missing Data about Book Closure Date
    </Card.Text>
    <Link to='/addbcDate' className="btn btn-primary my-1">
                Change
            </Link>
                        </Card.Body>
                    </Card>
                </div>

                </Fragment>


           
        );
    }

}

export default AddData;
