import React, { Component } from 'react';
import Contact from './Contact' 
import {connect} from 'react-redux';

class ContactPage extends Component {

	render(){
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12 text-center">
							<h3>Contact Us</h3>
							<h5>Send us an email if you have any questions</h5>
							<hr />
						</div>
						<div className="col-6">
							<Contact />
						</div>
						<div className="col-6">
							<iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d110270.25560503815!2d-97.81310102521132!3d30.26713436384704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C+Texas!3m2!1d30.267152999999997!2d-97.7430608!5e0!3m2!1sen!2sus!4v1548260317340" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen></iframe>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

