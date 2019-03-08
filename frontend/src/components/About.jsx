import React, {Component} from 'react';


export default class About extends Component {
	state = {
	}

	render(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<p>Deep-South-based experimental electronic music label, founded in 2018. Please reach out to us with any inquiries ♡</p>
					</div>
					<div className="col-12 text-center">
						<a href="https://www.facebook.com/secondmoonrecords/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
						<a href="https://twitter.com/2ndmoonrecords" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter-square"></i></a>
						<a href="https://instagram.com/secondmoonrecords/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
						<a href="https://secondmoonrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-bandcamp"></i></a>
						<a href="https://soundcloud.com/second_moon" target="_blank" rel="noopener noreferrer"><i className="fab fa-soundcloud"></i></a>
					</div>
				</div>
			</div>
		)
	}
}
