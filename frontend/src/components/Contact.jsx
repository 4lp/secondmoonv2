import React, { Component } from 'react';
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {email} from "../actions";
import Errors from "./Errors";
import MediaQuery from 'react-responsive';
import ReCAPTCHA from "react-google-recaptcha";

class Contact extends Component {
	state = {
		name: "",
		reply: "",
		message: "",
		phone: "",
		zip: "",
		captcha: "",
		width: 0,
		height: 0,
		submitStatus: false
	}

	onSubmit = e => {
		e.preventDefault();
		let user 
		if (this.props.user){
			user = this.props.user.username
		} else {
			user = ''
		}
		this.props.sendContactEmail(this.state.name, this.state.reply, this.state.message, user, this.state.phone, this.state.zip, this.state.captcha);
		this.setState({
			submitStatus: true,
			captcha: "",
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		this.setState({submitStatus: false});
	}

	onResize = (event, {element, size}) => {
		this.setState({width: size.width, height: size.height});
	};

	onChange = (value) => {
		this.setState({captcha: value});
	}

	render(){
		return(
			<div>
			    <div className="row">
					<div className="col-12 text-center">
						{this.props.user_message && this.state.submitStatus && (
							<div>
								<div className="alert alert-success" role="alert">{this.props.user_message}</div>
							</div>
						)}		
						{!this.state.submitStatus || this.props.errors.length ?
							<div>
								<form onSubmit={this.onSubmit} className={this.props.errors.length && this.state.submitStatus ? "animated shake" : null}>
									<fieldset>
									{this.props.errors && this.state.submitStatus && (
										<Errors errors={this.props.errors} />
									)}
									<div className="form-group">
										<label htmlFor="name">Your Name</label>
										<input 
											className="form-control" 
											name="name" 
											id="name" 
											onChange={e => this.setState({name: e.target.value})}
											value={this.state.name}
											type="text"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="reply">Your reply email</label>
										<input 
											className="form-control" 
											name="reply" 
											id="reply" 
											onChange={e => this.setState({reply: e.target.value})}
											value={this.state.reply}
											type="email"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="phone">Your phone number (xxx-xxx-xxxx)</label>
										<input 
											className="form-control" 
											name="phone" 
											id="phone" 
											onChange={e => this.setState({phone: e.target.value})}
											value={this.state.phone}
											type="tel"
											pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="zip">Your zip code (xxxxx)</label>
										<input 
											className="form-control" 
											name="zip" 
											id="zip" 
											onChange={e => this.setState({zip: e.target.value})}
											value={this.state.zip}
											type="text"
											pattern="[0-9]{5}"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="message">Your message</label>
										<input 
											className="form-control" 
											message="message" 
											id="message" 
											onChange={e => this.setState({message: e.target.value})}
											value={this.state.message}
											type="text"
										/>
									</div>
									</fieldset>
									<br/>
									{!this.props.user &&
										<div>
											<MediaQuery query="(min-device-width: 576px)">
												<div className="recaptcha-wrapper">
													<ReCAPTCHA
														sitekey="6LdIX3kUAAAAABM7JHwaA-NnjFdce__uU4ya6VWj"
														onChange={this.onChange}
													 />
												</div>
											</MediaQuery>
											<MediaQuery query="(max-device-width: 576px)">
												<div className="recaptcha-wrapper">
													<ReCAPTCHA
														sitekey="6LdIX3kUAAAAABM7JHwaA-NnjFdce__uU4ya6VWj"
														onChange={this.onChange}
														size="compact"
													 />
												</div>
											</MediaQuery>
										</div>
									}
									<br />
									<button className="btn btn-primary" type="submit" value="Send">Submit</button>
								</form> 
							</div>
						: null}
						{this.props.isSending ? <div><i className="fas fa-cog fa-3x fa-spin"></i></div> : null}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let errors = [];
	if (state.email.errors) {
		errors = Object.keys(state.email.errors).map(field => {
			return {field, message: state.email.errors[field]};
		});
	}
	return {
		errors, 
		isSending: state.email.isSending,
		user_message: state.email.user_message
	};
}

const mapDispatchToProps = dispatch => {
	return {
		sendContactEmail: (name, reply, message, user, phone, zip, captcha) => {
			return dispatch(email.sendContactEmail(name, reply, message, user, phone, zip, captcha));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
