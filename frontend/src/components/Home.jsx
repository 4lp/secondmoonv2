import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {carouselImages} from "../actions";
import {settings} from "../actions";
import {instagram} from "../actions";
import {posts} from "../actions";
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Header from "./Header";

const pathre = RegExp('^\/post\/.*$')

class Home extends Component {
	state = {
		hasMore: false,
		tagname: '',
		width: '',
		columns: ''
	}

	componentDidMount() {
		this.props.clearPosts();
		let params = new URLSearchParams(window.location.search);
		this.setState({tagname: params.get("tags__name") || null}, () =>
			this.props.fetchPosts(this.state.tagname, null, 1)
		);
        window.addEventListener("resize", this.updateDimensions);
	}	

	componentDidUpdate(prevProps){
     	if(prevProps.posts.posts.length !== this.props.posts.posts.length){ 
			this.setState({hasMore: this.props.posts.next ? true : false});
 		}
     	if(
			(prevProps.props.location.search !== this.props.props.location.search && this.props.props.location.search) ||
			(prevProps.props.location.pathname !== this.props.props.location.pathname && pathre.test(prevProps.props.location.pathname))
		){
			this.props.clearPosts();
			let params = new URLSearchParams(window.location.search);
			this.setState({tagname: params.get("tags__name") || null}, () =>
				this.props.fetchPosts(this.state.tagname, null, 1)
			);
		}
	}

	updateDimensions() {
        this.setState({width: window.innerWidth}, () => {
			if(this.state.width > 1024){
				this.setState({columns: 4})
			} else if(this.state.width > 922){
				this.setState({columns: 3})
			} else  if(this.state.width > 786){
				this.setState({columns: 2})
			} else {
				this.setState({colums: 1})
			}
		});
    }

    componentWillMount () {
        this.updateDimensions();
    }

    componentWillUnmount () {
        window.removeEventListener("resize", this.updateDimensions);
    }

	handlePageUpdate(){
		let page = this.props.posts.posts.length + 1
		if (this.state.hasMore && !this.props.posts.isLoading){
			this.props.fetchPosts(this.state.tagname, null, page);
		}
	}


	render(){
		const masonryOptions = {
			transitionDuration: 0
	  	};
		const imagesLoadedOptions = { background: '.my-bg-image-el' };
		let params = new URLSearchParams(window.location.search);
		const sizes = [
		  { columns: 1, gutter: 0 },
		  { mq: '768px', columns: 2, gutter: 0 },
		  { mq: '922px', columns: 3, gutter: 0 },
		  { mq: '1024px', columns: 4, gutter: 0 }
		]
		let divWidth = this.state.width/this.state.columns - 4 
		{/* need to block render on posts page but keep it for modals */}
		if (pathre.test(this.props.props.location.pathname)){
			return(<div></div>)
		}else if (!this.props.posts.isLoading || this.props.posts.posts.length){
			return(
				<div className="container-fluid">
					<div className="row" style={{width: "100%"}}>
					<Header refreshHome={this.refreshHome} />
					<div className="container-fluid home-container m0 p0">
						<div className="row">
							<div className="col-12">
								<MasonryInfiniteScroller
									hasMore={this.state.hasMore}
									loadMore={() => this.handlePageUpdate()}
									className="main-masonry"
									style={{width:'100%'}}
							        loader={<div className="loader" key={0}>Loading ...</div>}
									sizes={sizes}
									pack={true}
								>
									{this.props.posts.posts.map((post) => {
										return (
											<div key={post[0].id} style={{width: divWidth}}>
												<Link className="overlay-container" to={"/post/"+post[0].path} style={{width: divWidth}}>
													<img src={post[0].image}/>
													<div className="overlay"><div className="overlay-text">{post[0].name}</div></div>
												</Link>
											</div>
										)
									})}
								</MasonryInfiniteScroller>
							</div>
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
