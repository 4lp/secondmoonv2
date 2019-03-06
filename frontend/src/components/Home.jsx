import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***carouselImages***REMOVED*** from "../actions";
import ***REMOVED***settings***REMOVED*** from "../actions";
import ***REMOVED***instagram***REMOVED*** from "../actions";
import ***REMOVED***posts***REMOVED*** from "../actions";
import Masonry from 'react-masonry-component';
***REMOVED***/*import InstagramCarousel from "./InstagramCarousel"
import Register from "./Register";
import Footer from "./Footer";
import ***REMOVED***auth***REMOVED*** from "../actions";
import ReactInterval from 'react-interval';*/***REMOVED***

class Home extends Component ***REMOVED***
	componentDidMount() ***REMOVED***
		let params = new URLSearchParams(window.location.search);
		if (!this.props.instagram.length) ***REMOVED***
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		***REMOVED***
		let tagname = params.get("tags__name") || null;
		this.props.fetchPosts(tagname,null);
	***REMOVED***	

	render()***REMOVED***
		const masonryOptions = ***REMOVED***
			transitionDuration: 0
	  	***REMOVED***;
		const imagesLoadedOptions = ***REMOVED*** background: '.my-bg-image-el' ***REMOVED***;
		if (!this.props.posts.isLoading)***REMOVED***
		return(
			<div>
				<div className="container-fluid home-container">
					<div className="row">
						<div className="col-12">
							<Masonry
								className=***REMOVED***'grid'***REMOVED*** // default ''
								elementType=***REMOVED***'div'***REMOVED*** // default 'div'
								options=***REMOVED***masonryOptions***REMOVED*** // default ***REMOVED******REMOVED***
								disableImagesLoaded=***REMOVED***false***REMOVED*** // default false
								updateOnEachImageLoad=***REMOVED***false***REMOVED*** // default false and works only if disableImagesLoaded is false
								imagesLoadedOptions=***REMOVED***imagesLoadedOptions***REMOVED*** // default ***REMOVED******REMOVED***
								isFitWidth=***REMOVED***true***REMOVED***
							>
								***REMOVED***this.props.posts.posts.map((post) => ***REMOVED***
									return (
										<Link to=***REMOVED***"/post/"+post.path***REMOVED*** key=***REMOVED***post.id***REMOVED***>
											<img src=***REMOVED***post.image***REMOVED***/>
										</Link>
									)
								***REMOVED***)***REMOVED***
							</Masonry>
						</div>
					</div>
				</div>
			</div>
		)
		***REMOVED*** else ***REMOVED***
			return(<div>Loading...</div>)
		***REMOVED***
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
		posts: state.posts,
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
		fetchPosts: (tag,name) => ***REMOVED***
			dispatch(posts.fetchPosts(tag,name));
	    ***REMOVED***,
***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Home);
