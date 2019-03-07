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
		page: 1,
		hasMore: false,
		tagname: '',

	}
	componentDidMount() {
		this.props.clearPosts();
		let params = new URLSearchParams(window.location.search);
		{/*if (!this.props.instagram.length) {
	    	this.props.fetchInstagram();
	    	this.props.fetchSettings();
		}*/}
		this.setState({tagname: params.get("tags__name") || null}, () =>
			this.props.fetchPosts(this.state.tagname, null, this.state.page)
		);
	}	

	componentDidUpdate(prevProps){
     	if(prevProps.posts.posts.length !== this.props.posts.posts.length){ 
			this.setState({hasMore: this.props.posts.next ? true : false});
 		}
	}

	handlePageUpdate(){
		this.setState({page: this.state.page + 1}, () =>{
			if (this.state.hasMore){
				this.props.fetchPosts(this.state.tagname, null, this.state.page);
			}
		})
	}


	render(){
		const masonryOptions = {
			transitionDuration: 0
	  	};
		const imagesLoadedOptions = { background: '.my-bg-image-el' };
		console.log(this.props.posts.posts)
		if (!this.props.posts.isLoading){
			return(
				<div>
					<div className="container-fluid home-container">
						<div className="row">
							<div className="col-12">
								<MasonryInfiniteScroller
									hasMore={this.state.hasMore}
									loadMore={() => this.handlePageUpdate()}
									pack={true}
									className="main-masonry"
									style={{width:'100%'}}
							        loader={<div className="loader" key={0}>Loading ...</div>}
								>
									{this.props.posts.posts.map((post) => {
										return (
											<div>
											<Link className="overlay-container" to={"/post/"+post[0].path} key={post[0].id}>
												<img src={post[0].image}/>
												<div className="overlay">{post[0].name}</div>
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
		clearPosts: () => {
			dispatch(posts.clearPosts());
	    },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
