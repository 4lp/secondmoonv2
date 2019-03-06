import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Collapsible from 'react-collapsible';
import {connect} from 'react-redux';
import {settings} from "../actions";

class Header extends Component {
	state = {
		headerHeight: 0,
		discountDismissed: false,
	}
	componentDidMount() {
		if (!this.props.settings.length){
	    	this.props.fetchSettings();
		}
		let height = this.divElement.clientHeight;
		this.setState({ headerHeight: height });
		window.addEventListener("resize", this.setState({ headerHeight: height }));
	}	

	componentWillUnmount(){
		let height = this.divElement.clientHeight;
		window.removeEventListener("resize", this.setState({ headerHeight: height }));
	}

	dismissAlert() {
		this.setState({discountDismissed: true},()=>{
			const height = this.divElement.clientHeight;
			this.setState({ headerHeight: height });
		})
		
	}



	render(){
			return(
				<div>
					<nav id="header" className="navbar fixed-top navbar-expand-lg m0 p0" ref={ (divElement) => this.divElement = divElement}>
						<div className="container-fluid m0 p0">
							<div className="row m0 p0" style={{width:'100%'}}>
								<div className="container-fluid">
									<div className="row">
										<Link to="/" className="nav-brand col-3" onClick={()=>this.props.refreshHome()}>
											<img src="https://i.imgur.com/UEdsoNTm.png"/>
											<h3>Second Moon Records</h3>
										</Link>
										<div className="collapse navbar-collapse col-9">
											<ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row">
												<li className="nav-item active"><Link to="/contact" className="nav-link">Contact Us</Link></li>
											</ul>
											<ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row">
												<li className="nav-item active"><Link to="/tag" className="nav-link">Categories</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</nav>
					<div id="header-spacer" style={{marginBottom: this.state.headerHeight + 50 + 'px'}}></div>
				</div>
			)
	}
}

const mapStateToProps = state => {
	let errors = [];
	if (state.settings.errors) {
		errors = [...errors, Object.keys(state.settings.errors).map(field => {
			return {field, message: state.settings.errors[field]};
		})];
	}
	return {
		settings: state.settings,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchSettings: () => {
			dispatch(settings.fetchSettings());
	    },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
