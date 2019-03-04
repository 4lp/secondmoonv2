import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {carouselImages} from "../actions";
import {settings} from "../actions";
import {instagram} from "../actions";
import Masonry from 'react-masonry-component';
{/*import InstagramCarousel from "./InstagramCarousel"
import Register from "./Register";
import Footer from "./Footer";
import {auth} from "../actions";
import ReactInterval from 'react-interval';*/}

class Home extends Component {
	state = {
	}

	componentDidMount() {
		if (!this.props.instagram.length) {
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		}
	}	

	render(){
		const masonryOptions = {
			transitionDuration: 0
	  	};
		const imagesLoadedOptions = { background: '.my-bg-image-el' };
		return(
			<div>
				<div className="container-fluid home-container">
					<div className="row">
						<div className="col-12">
							<Masonry
								className={'grid'} // default ''
								elementType={'div'} // default 'div'
								options={masonryOptions} // default {}
								disableImagesLoaded={false} // default false
								updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
								imagesLoadedOptions={imagesLoadedOptions} // default {}
								isFitWidth={true}
							>
								{this.props.posts.posts.map((post) => {
									return (
										<Link to={"/tag/"+post.path}>
											<img src={post.image}/>
										</Link>
									)
								})}
							</Masonry>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let errors = [];
	{/*if (state.instagramPictures.errors) {
		errors = Object.keys(state.instagramPictures.errors).map(field => {
			return {field, message: state.instagramPictures.errors[field]};
		});
	} */}
	if (state.settings.errors) {
		errors = [...errors, Object.keys(state.settings.errors).map(field => {
			return {field, message: state.settings.errors[field]};
		})];
	}
	return {
		instagram: state.instagram,
		settings: state.settings,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchInstagram: () => {
			dispatch(instagram.fetchInstagram());
	    },
		fetchSettings: () => {
			dispatch(settings.fetchSettings());
	    },

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
