import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***carouselImages***REMOVED*** from "../actions";
import ***REMOVED***settings***REMOVED*** from "../actions";
import ***REMOVED***instagram***REMOVED*** from "../actions";
***REMOVED***/*import InstagramCarousel from "./InstagramCarousel"
import Register from "./Register";
import Footer from "./Footer";
import ***REMOVED***auth***REMOVED*** from "../actions";
import ReactInterval from 'react-interval';*/***REMOVED***

class Home extends Component ***REMOVED***
	state = ***REMOVED***
	***REMOVED***

	componentDidMount() ***REMOVED***
		if (!this.props.instagram.length) ***REMOVED***
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		***REMOVED***
	***REMOVED***	

	render()***REMOVED***
			return(
				<div>
					<div className="container-fluid home-container">
						<div className="row">
							<div className="col-12">
								<img src="https://i.imgur.com/WYKw9jWm.png"/>
							</div>
						</div>
					</div>
				</div>
			)
	***REMOVED***
***REMOVED***

const mapStateToProps = state => ***REMOVED***
	let errors = [];
	***REMOVED***/*if (state.instagramPictures.errors) ***REMOVED***
		errors = Object.keys(state.instagramPictures.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.instagramPictures.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED*** */***REMOVED***
	if (state.settings.errors) ***REMOVED***
		errors = [...errors, Object.keys(state.settings.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.settings.errors[field]***REMOVED***;
		***REMOVED***)];
	***REMOVED***
	return ***REMOVED***
		instagram: state.instagram,
		settings: state.settings,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchInstagram: () => ***REMOVED***
			dispatch(instagram.fetchInstagram());
	    ***REMOVED***,
		fetchSettings: () => ***REMOVED***
			dispatch(settings.fetchSettings());
	    ***REMOVED***,

	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Home);
