import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {carouselImages} from "../actions";
import {settings} from "../actions";
import {instagram} from "../actions";
import {posts} from "../actions";
import MasonryInfiniteScroller from 'react-masonry-infinite';
{/*import Masonry from 'react-masonry-component';*/}
{/*import InstagramCarousel from "./InstagramCarousel"
import Register from "./Register";
import Footer from "./Footer";
import {auth} from "../actions";
import ReactInterval from 'react-interval';*/}

class Home extends Component {
	state = {
		page: 1
	}
	componentDidMount() {
		let params = new URLSearchParams(window.location.search);
		if (!this.props.instagram.length) {
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		}
		let tagname = params.get("tags__name") || null;
		this.props.fetchPosts(tagname, null, this.state.page);
	}	

	render(){
		const masonryOptions = {
			transitionDuration: 0
	  	};
		const imagesLoadedOptions = { background: '.my-bg-image-el' };
		if (!this.props.posts.isLoading){
		return(
			<div>
				<div className="container-fluid home-container">
					<div className="row">
						<div className="col-12">
			{/*<Masonry
								className={'grid'} // default ''
								elementType={'div'} // default 'div'
								options={masonryOptions} // default {}
								disableImagesLoaded={false} // default false
								updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
								imagesLoadedOptions={imagesLoadedOptions} // default {}
								isFitWidth={true}
							>*/}
							<MasonryInfiniteScroller
								hasMore={this.props.posts.next ? true : false}
								loadMore={() => this.setState({ page: this.state.page + 1 })}
								pack={true}
								className="main-masonry"
								style={{width:'100%'}}
							>
								{this.props.posts.posts.map((post) => {
									return (
										<div>
										<Link className="overlay-container" to={"/post/"+post.path} key={post.id}>
											<img src={post.image}/>
											<div className="overlay">{post.name}</div>
										</Link>
										</div>
									)
								})}
							</MasonryInfiniteScroller>
						</div>
					</div>
				</div>
			</div>
		)
		} else {
			return(<div>Loading...</div>)
		}
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
		posts: state.posts,
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
		fetchPosts: (tag,name,page) => {
			dispatch(posts.fetchPosts(tag,name,page));
	    },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
