import React, { Component, Fragment } from 'react';
import '../css/styles.css'
import {Link} from 'react-router-dom'

export class Landing extends Component {
  render() {
    return (
        <Fragment>
     
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="container">
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/mutualfunds">Mutual Funds</Link></li>
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/dividends">Dividends</Link></li>
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/split">Stock Splits</Link></li>
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/bcDate">Book Closures</Link></li>
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/upload">Upload Document</Link></li>
                        <li class="nav-item"><Link class="nav-link js-scroll-trigger" to="/addData">Edit Data</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
  
        <header class="masthead">
            <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                    <h1 class="mx-auto my-0 text-uppercase">Findex</h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">Corporate Action AI-ML Finder Bot</h2>
                    <Link class="btn btn-primary js-scroll-trigger" to='/upload'>Upload Documnet</Link>
                </div>
            </div>
        </header>
     
        <section class="about-section text-center" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <h2 class="text-white mb-4">Problem Statement</h2>
                        <p class="text-white-50">
                            To build a software which crawls over the internet and captures
                            the upcoming corporate actions, resolves the conflict in similar type
                            of data and merges data and serves clean data to the client.
                        </p>
                    </div>
                </div>
                <img class="img-fluid"  alt="" />
            </div>
        </section>
     
        <section class="projects-section bg-light" id="projects">
            <div class="container">
             
              
                <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
                    <div class="col-lg-6"><img class="img-fluid" src="assets/img/demo-image-01.jpg" alt="" /></div>
                    <div class="col-lg-6">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <Link to='/mutualfunds'><h4 class="text-white">Mutual Funds</h4></Link>
                                    <p class="mb-0 text-white-50">Get the maturity date and record date for Mutual Fund Securities</p>
                                    <hr class="d-none d-lg-block mb-0 ml-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                <div class="row justify-content-center no-gutters">
                    <div class="col-lg-6"><img class="img-fluid" src="assets/img/demo-image-02.jpg" alt="" /></div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <Link to='/dividends'><h4 class="text-white">Dividends</h4></Link>
                                    <p class="mb-0 text-white-50">Get the Payment Date, Record Date, Dividend Type of Dividend Securities</p>
                                    <hr class="d-none d-lg-block mb-0 mr-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
                    <div class="col-lg-6"><img class="img-fluid" src="assets/img/demo-image-01.jpg" alt="" /></div>
                    <div class="col-lg-6">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <Link to='mutualfunds'><h4 class="text-white">Mutual Funds</h4></Link>
                                    <p class="mb-0 text-white-50">Get the maturity date and record date for Mutual Fund Securities</p>
                                    <hr class="d-none d-lg-block mb-0 ml-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center no-gutters">
                    <div class="col-lg-6"><img class="img-fluid" src="assets/img/demo-image-02.jpg" alt="" /></div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <Link to='split'><h4 class="text-white">Stock Splits</h4></Link>
                                    <p class="mb-0 text-white-50">Get Record Date, Old and New Face Values of Equity Securities</p>
                                    <hr class="d-none d-lg-block mb-0 mr-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            
                
                   
            
</section>
    
        <section class="signup-section" id="signup">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-lg-8 mx-auto text-center">
                        <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                        <h2 class="text-white mb-5">Request for Trials!</h2>
                        <form class="form-inline d-flex">
                            <input class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" type="email" placeholder="Enter email address..." />
                            <button class="btn btn-primary mx-auto" type="submit">Request</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
   
        <section class="contact-section bg-black">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Address</h4>
                                <hr class="my-4" />
                                <div class="small text-black-50">Symbiosis Institute of Technolgy, Pune</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-envelope text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Email</h4>
                                <hr class="my-4" />
                                <div class="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-mobile-alt text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Phone</h4>
                                <hr class="my-4" />
                                <div class="small text-black-50">+1 (555) 902-8832</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="social d-flex justify-content-center">
                    <Link class="mx-2" href="#!"><i class="fab fa-github"></i></Link>
                </div>
            </div>
        </section>
        </Fragment>
    );
  }
}

export default Landing
