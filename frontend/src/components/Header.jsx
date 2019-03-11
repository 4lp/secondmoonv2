import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import Collapsible from 'react-collapsible';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***settings***REMOVED*** from "../actions";

class Header extends Component ***REMOVED***
	state = ***REMOVED***
		headerHeight: 0,
		discountDismissed: false,
	***REMOVED***
	componentDidMount() ***REMOVED***
		if (!this.props.settings.length)***REMOVED***
	    	this.props.fetchSettings();
		***REMOVED***
		let height = this.divElement.clientHeight;
		this.setState(***REMOVED*** headerHeight: height ***REMOVED***);
		window.addEventListener("resize", this.setState(***REMOVED*** headerHeight: height ***REMOVED***));
	***REMOVED***	

	componentWillUnmount()***REMOVED***
		let height = this.divElement.clientHeight;
		window.removeEventListener("resize", this.setState(***REMOVED*** headerHeight: height ***REMOVED***));
	***REMOVED***

	dismissAlert() ***REMOVED***
		this.setState(***REMOVED***discountDismissed: true***REMOVED***,()=>***REMOVED***
			const height = this.divElement.clientHeight;
			this.setState(***REMOVED*** headerHeight: height ***REMOVED***);
		***REMOVED***)
		
	***REMOVED***



	render()***REMOVED***
			return(
				<div>
					<nav id="header" className="navbar navbar-light fixed-top navbar-expand-lg py-md-0 py-0 m0 p0" ref=***REMOVED*** (divElement) => this.divElement = divElement***REMOVED***>
						<div className="container-fluid m0 p0">
							<div className="row m0 p0" style=***REMOVED******REMOVED***width:'100%'***REMOVED******REMOVED***>
								<div className="container-fluid">
									<div className="row">
										<div className="col-9">
											<Link to="/" className="nav-brand col-9" onClick=***REMOVED***()=>this.props.refreshHome()***REMOVED***>
												<img src="https://i.imgur.com/UEdsoNTm.png"/>
												<h3 className="align-middle header-text">Second Moon Records</h3>
											</Link>
										</div>
										<button className="navbar-toggler" 
												type="button" 
												data-toggle="collapse" 
												data-target="#navbarToggler" 
												aria-controls="navbarToggler" 
												aria-expanded="false" 
												aria-label="Toggle navigation"
										>
											<span className="navbar-toggler-icon"></span>
										</button>
										<div className="collapse navbar-collapse col-3" id="navbarToggler">
											<ul className="navbar-nav">
												<li className="nav-item py-0"><Link to="/contact" className="nav-link">Contact</Link></li>
												<li className="nav-item py-0"><Link to="/tag" className="nav-link">Filter</Link></li>
												<li className="nav-item py-0"><Link to="/about" className="nav-link">About</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</nav>
					<div id="header-spacer" style=***REMOVED******REMOVED***marginBottom: this.state.headerHeight + 50 + 'px'***REMOVED******REMOVED***></div>
				</div>
			)
	***REMOVED***
***REMOVED***

const mapStateToProps = state => ***REMOVED***
	let errors = [];
	if (state.settings.errors) ***REMOVED***
		errors = [...errors, Object.keys(state.settings.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.settings.errors[field]***REMOVED***;
		***REMOVED***)];
	***REMOVED***
	return ***REMOVED***
		settings: state.settings,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchSettings: () => ***REMOVED***
			dispatch(settings.fetchSettings());
	    ***REMOVED***,
	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Header)
