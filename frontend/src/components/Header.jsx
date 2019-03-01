import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import Collapsible from 'react-collapsible';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***products***REMOVED*** from "../actions";
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
					<nav id="header" className="navbar fixed-top navbar-expand-lg m0 p0" ref=***REMOVED*** (divElement) => this.divElement = divElement***REMOVED***>
						<div className="container-fluid m0 p0">
							<div className="row m0 p0" style=***REMOVED******REMOVED***width:'100%'***REMOVED******REMOVED***>
								<div className="container">
									<div className="row">
										<Link to="/" className="nav-brand col-3"><img src="https://i.imgur.com/UEdsoNTm.png"/></Link>
										<div className="collapse navbar-collapse col-9">
											<ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row">
												<li className="nav-item active"><Link to="/contact" className="nav-link">Contact Us</Link></li>
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
	if (state.products.errors) ***REMOVED***
		errors = Object.keys(state.products.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.products.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED***
	if (state.settings.errors) ***REMOVED***
		errors = [...errors, Object.keys(state.settings.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.settings.errors[field]***REMOVED***;
		***REMOVED***)];
	***REMOVED***
	return ***REMOVED***
		products: state.products,
		settings: state.settings,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchProducts: () => ***REMOVED***
			dispatch(products.fetchProducts());
	    ***REMOVED***,
			fetchSettings: () => ***REMOVED***
			dispatch(settings.fetchSettings());
	    ***REMOVED***,
	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Header)
