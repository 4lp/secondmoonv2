import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***connect***REMOVED*** from "react-redux";
import ***REMOVED***Link, Redirect***REMOVED*** from "react-router-dom";
import ***REMOVED***email***REMOVED*** from "../actions";
import Errors from "./Errors";
import MediaQuery from 'react-responsive';
import ReCAPTCHA from "react-google-recaptcha";

class Contact extends Component ***REMOVED***
	state = ***REMOVED***
		name: "",
		reply: "",
		message: "",
		phone: "",
		zip: "",
		captcha: "",
		width: 0,
		height: 0,
		submitStatus: false
	***REMOVED***

	onSubmit = e => ***REMOVED***
		e.preventDefault();
		let user 
		if (this.props.user)***REMOVED***
			user = this.props.user.username
		***REMOVED*** else ***REMOVED***
			user = ''
		***REMOVED***
		this.props.sendContactEmail(this.state.name, this.state.reply, this.state.message, this.state.captcha);
		this.setState(***REMOVED***
			submitStatus: true,
			captcha: "",
		***REMOVED***);
	***REMOVED***

	componentDidUpdate(prevProps) ***REMOVED***
		if (this.props.location !== prevProps.location) ***REMOVED***
			this.onRouteChanged();
		***REMOVED***
	***REMOVED***

	onRouteChanged() ***REMOVED***
		this.setState(***REMOVED***submitStatus: false***REMOVED***);
	***REMOVED***

	onResize = (event, ***REMOVED***element, size***REMOVED***) => ***REMOVED***
		this.setState(***REMOVED***width: size.width, height: size.height***REMOVED***);
	***REMOVED***;

	onChange = (value) => ***REMOVED***
		this.setState(***REMOVED***captcha: value***REMOVED***);
	***REMOVED***

	render()***REMOVED***
		return(
			<div>
			    <div className="row">
					<div className="col-12 text-center">
						***REMOVED***this.props.user_message && this.state.submitStatus && (
							<div>
								<p>***REMOVED***this.props.user_message***REMOVED***</p>
							</div>
						)***REMOVED***		
						***REMOVED***!this.state.submitStatus || this.props.errors.length ?
							<div>
								<form onSubmit=***REMOVED***this.onSubmit***REMOVED*** className=***REMOVED***this.props.errors.length && this.state.submitStatus ? "animated shake" : null***REMOVED***>
									<fieldset>
									***REMOVED***this.props.errors && this.state.submitStatus && (
										<Errors errors=***REMOVED***this.props.errors***REMOVED*** />
									)***REMOVED***
									<div className="form-group">
										<label htmlFor="name">Your Name</label>
										<input 
											className="form-control" 
											name="name" 
											id="name" 
											onChange=***REMOVED***e => this.setState(***REMOVED***name: e.target.value***REMOVED***)***REMOVED***
											value=***REMOVED***this.state.name***REMOVED***
											type="text"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="reply">Your reply email</label>
										<input 
											className="form-control" 
											name="reply" 
											id="reply" 
											onChange=***REMOVED***e => this.setState(***REMOVED***reply: e.target.value***REMOVED***)***REMOVED***
											value=***REMOVED***this.state.reply***REMOVED***
											type="email"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="message">Your message</label>
										<textarea 
											rows="10"
											className="form-control" 
											message="message" 
											id="message" 
											onChange=***REMOVED***e => this.setState(***REMOVED***message: e.target.value***REMOVED***)***REMOVED***
											value=***REMOVED***this.state.message***REMOVED***
											type="text"
										/>
									</div>
									</fieldset>
									<br/>
									***REMOVED***!this.props.user &&
										<div>
											<MediaQuery query="(min-device-width: 576px)">
												<div className="recaptcha-wrapper">
													<ReCAPTCHA
														sitekey="6LdIX3kUAAAAABM7JHwaA-NnjFdce__uU4ya6VWj"
														onChange=***REMOVED***this.onChange***REMOVED***
													 />
												</div>
											</MediaQuery>
											<MediaQuery query="(max-device-width: 576px)">
												<div className="recaptcha-wrapper">
													<ReCAPTCHA
														sitekey="6LdIX3kUAAAAABM7JHwaA-NnjFdce__uU4ya6VWj"
														onChange=***REMOVED***this.onChange***REMOVED***
														size="compact"
													 />
												</div>
											</MediaQuery>
										</div>
									***REMOVED***
									<br />
									<button className="btn btn-primary" type="submit" value="Send">Submit</button>
								</form> 
							</div>
						: null***REMOVED***
						***REMOVED***this.props.isSending ? <div><i className="fas fa-cog fa-3x fa-spin"></i></div> : null***REMOVED***
					</div>
				</div>
			</div>
		)
	***REMOVED***
***REMOVED***

const mapStateToProps = state => ***REMOVED***
	let errors = [];
	if (state.email.errors) ***REMOVED***
		errors = Object.keys(state.email.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.email.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED***
	return ***REMOVED***
		errors, 
		isSending: state.email.isSending,
		user_message: state.email.user_message
	***REMOVED***;
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		sendContactEmail: (name, reply, message, captcha) => ***REMOVED***
			return dispatch(email.sendContactEmail(name, reply, message, captcha));
		***REMOVED***
	***REMOVED***;
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
