import React, { Component, Fragment } from 'react';
import '../App.css';
import {Table,Button} from 'react-bootstrap'



class Upload extends Component {

    
          state = {
            selectedFile: null,
            div_fin:{'Dividend_Date': '',
            'Record_Date': '', 
            'Dividend': '',
            'Type': '',
            'Company_Name':''},
      
            split_fin:{'Record_Date': '', 
            'FV_Changed_From': '',
            'FV_Changed_To': '',
            'Company_Name':''},
      
            bcDate_fin: { 
              'From_Date': '', 
              'To_Date': '',
              'Purpose': '',
              'Company_Name':''},
      
            div_mon:{'Dividend_Date': '',
            'Record_Date': '', 
            'Dividend': '',
            'Type': '',
            'Company_Name':''},
      
            split_mon:{'Record_Date': '', 
            'FV_Changed_From': '',
            'FV_Changed_To': '',
            'Company_Name':''},
      
            bcDate_mon:{ 
              'From_Date': '', 
              'To_Date': '',
              'Purpose': '',
              'Company_Name':''}
          }
          
          
          onChangeHandler=event=>{

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })


    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        data.append('Label', this.state.Label)
      console.log(this.state)
      fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: data,
      })
  .then(response => response.json())
  .then(data => this.addData(data)
      
      
      );
    }


    addData(data){
    

      console.log(data)
      this.setState({div_fin:data.fin_exp[0]})
      this.setState({div_mon:data.mon_con[0]})
      this.setState({bcDate_fin:data.fin_exp[1]})
      this.setState({bcDate_mon:data.mon_con[1]})
      this.setState({split_fin:data.fin_exp[2]})
      this.setState({split_mon:data.mon_con[2]})
        
    }



    render() {
        return (
<Fragment>
            <div className="container">
            <div className="row con">
              <div className="col-md-6">
                  <form method="post" action="#" id="#">

                  <div class="form-group">
      <label for="inputState">Security Type</label>
      <select id="inputState" class="form-control" name='Label'  value={this.state.Label} onChange={this.onChange}>
        <option selected>Choose...</option>
        <option>Mutual Funds</option>
        <option>Dividend</option>
        <option>Stock Splits</option>
        <option>Book Closures</option>
        <option>Not Sure</option>
      </select>
    </div>   
                             
                      
                      <div className="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                      </div>
                      <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                    
                  </form>
                  
                  
              </div>
               
            </div>
        </div>

        <Fragment>
              <div className='search'>
                <h1>Dividend</h1>
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
          <tr>
                <td className="obj">{this.state.div_fin.Company_Name}</td>
                <td className="com">{this.state.div_fin.Dividend}</td>
                <td className="com">{this.state.div_fin.Type}</td>
                <td className="obj">{this.state.div_fin.Record_Date}</td>
                <td className="com">{this.state.div_fin.Dividend_Date}</td>

                </tr>
      </tbody>
      </Table>
      </div>

      <div className='search'>
      <h1>Book Closure</h1>
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
          <tr>
                <td className="obj">{this.state.bcDate_fin.Company_Name}</td>
                <td className="com">{this.state.bcDate_fin.From_Date}</td>
                <td className="com">{this.state.bcDate_fin.To_Date}</td>
                <td className="obj">{this.state.bcDate_fin.Purpose}</td>

                </tr>
      </tbody>
      </Table>
      </div>


      <div className='search'>
      <h1>Stock Split</h1>
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
          <tr>
                <td className="obj">{this.state.split_fin.Company_Name}</td>
                <td className="com">{this.state.split_fin.Record_Date}</td>
                <td className="com">{this.state.split_fin.FV_Changed_From}</td>
                <td className="obj">{this.state.split_fin.FV_Changed_To}</td>

                </tr>
      </tbody>
      </Table>
      </div>
      </Fragment>
        </Fragment>

           
        );
    }

}

export default Upload;

