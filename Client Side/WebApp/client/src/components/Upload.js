import React, { Component, Fragment } from 'react';
import '../App.css';
import axios from 'axios';



class Upload extends Component {

    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null,
            Company_Name:'',
            Security_Code:'',
            Label:''
          }
       
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
        data.append('Company_Name', this.state.Company_Name)
        data.append('Security_Code', this.state.Security_Code)
        data.append('Label', this.state.Label)
       /* axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })*/
      console.log(this.state)
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
          console.log(response)
      });
    }



    render() {
        return (
<Fragment>
            <div className="container">
            <div className="row con">
              <div className="col-md-6">
                  <form method="post" action="#" id="#">
                  <div class="form-group">
    <label for="exampleInputEmail1">Security Number</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Security Number"  name='Security_Code'   value={this.state.Security_Code} onChange={this.onChange} />
  </div>
                      
  <div class="form-group">
    <label for="exampleInputEmail1">Company Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Company Name"  name='Company_Name'  value={this.state.Company_Name} onChange={this.onChange} />
  </div> 

  <div class="form-group">
      <label for="inputState">Security Type</label>
      <select id="inputState" class="form-control" name='Label'  value={this.state.Label} onChange={this.onChange}>
        <option selected>Choose...</option>
        <option>Mutual Funds</option>
        <option>Dividend</option>
        <option>Stock Splits</option>
        <option>Book Closures</option>
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
        </Fragment>

           
        );
    }

}

export default Upload;
