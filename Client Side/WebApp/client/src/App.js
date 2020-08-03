import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MutualFund from './components/MutualFund';
import Dividend from './components/Dividend';
import Split from './components/Split';
import AddMutualFund from './components/AddMutualFund';
import AddDividend from './components/AddDividend';
import AddSplit from './components/AddSplit';
import AddData from './components/AddData';
import Navi from './components/Navi';
import './App.css';
import './images/1.jpg' 
import BCDate from './components/BCDate';
import AddBCDate from './components/AddBCDate';
import Upload from './components/Upload';
import Landing from './components/Landing';
import Search from './components/Search';


class App extends Component {


  render(){
    return (
    
      
       
        <Router>
      <Route exact path='/' render={props=>(
        <React.Fragment>
          <Landing />
          
        
          
        </React.Fragment>
      )}/>
      <div className='container'>

<Route exact path='/mutualfunds' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
          <MutualFund  />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/dividends' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <Dividend />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/split' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <Split />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/bcDate' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <BCDate />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/addData' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <AddData />
          </div>
        </React.Fragment>
      )}/>

  

<Route exact path='/addMutualFund' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <AddMutualFund />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/addDividend' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <AddDividend />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/addSplit' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <AddSplit />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/addbcDate' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <AddBCDate />
          </div>
        </React.Fragment>
      )}/>

<Route exact path='/upload' render={props=>(
        <React.Fragment>
          <Navi />
          <div className='table'>
            <Upload />
          </div>
        </React.Fragment>
      )}/>
  
  <Route exact path='/search' render={props=>(
        <React.Fragment>
          <div className='table'>
            <Search />
          </div>
        </React.Fragment>
      )}/>
     </div>
     </Router>
     
    );
  }
  
}

export default App;
