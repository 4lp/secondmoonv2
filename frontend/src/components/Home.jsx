import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***carouselImages***REMOVED*** from "../actions";
import ***REMOVED***settings***REMOVED*** from "../actions";
import ***REMOVED***instagram***REMOVED*** from "../actions";
import ***REMOVED***posts***REMOVED*** from "../actions";
import MasonryInfiniteScroller from 'react-masonry-infinite';

class Home extends Component ***REMOVED***
	state = ***REMOVED***
		page: 1,
		hasMore: false,
		tagname: '',

	***REMOVED***

	componentDidMount() ***REMOVED***
		this.props.clearPosts();
		let params = new URLSearchParams(window.location.search);
		this.setState(***REMOVED***tagname: params.get("tags__name") || null***REMOVED***, () =>
			this.props.fetchPosts(this.state.tagname, null, this.state.page)
		);
	***REMOVED***	

	componentDidUpdate(prevProps)***REMOVED***
     	if(prevProps.posts.posts.length !== this.props.posts.posts.length)***REMOVED*** 
			this.setState(***REMOVED***hasMore: this.props.posts.next ? true : false***REMOVED***);
 		***REMOVED***
	***REMOVED***

	handlePageUpdate()***REMOVED***
		this.setState(***REMOVED***page: this.state.page + 1***REMOVED***, () =>***REMOVED***
			if (this.state.hasMore)***REMOVED***
				this.props.fetchPosts(this.state.tagname, null, this.state.page);
			***REMOVED***
		***REMOVED***)
	***REMOVED***


	render()***REMOVED***
		const masonryOptions = ***REMOVED***
			transitionDuration: 0
	  	***REMOVED***;
		const imagesLoadedOptions = ***REMOVED*** background: '.my-bg-image-el' ***REMOVED***;
		const sizes = [
		  ***REMOVED*** columns: 1, gutter: 0 ***REMOVED***,
		  ***REMOVED*** mq: '768px', columns: 3, gutter: 0 ***REMOVED***,
		  ***REMOVED*** mq: '1024px', columns: 4, gutter: 0 ***REMOVED***
		]
		if (!this.props.posts.isLoading)***REMOVED***
			return(
				<div>
					<div className="container-fluid home-container">
						<div className="row">
							<div className="col-12">
								<MasonryInfiniteScroller
									hasMore=***REMOVED***this.state.hasMore***REMOVED***
									loadMore=***REMOVED***() => this.handlePageUpdate()***REMOVED***
									pack=***REMOVED***true***REMOVED***
									className="main-masonry"
									style=***REMOVED******REMOVED***width:'100%'***REMOVED******REMOVED***
							        loader=***REMOVED***<div className="loader" key=***REMOVED***0***REMOVED***>Loading ...</div>***REMOVED***
									sizes=***REMOVED***sizes***REMOVED***
								>
									***REMOVED***this.props.posts.posts.map((post) => ***REMOVED***
										return (
											<div key=***REMOVED***post[0].id***REMOVED***>
											<Link className="overlay-container" to=***REMOVED***"/post/"+post[0].path***REMOVED***>
												<img src=***REMOVED***post[0].image***REMOVED***/>
												<div className="overlay"><div className="overlay-text">***REMOVED***post[0].name***REMOVED***</div></div>
											</Link>
											</div>
										)
									***REMOVED***)***REMOVED***
								</MasonryInfiniteScroller>
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
		fetchPosts: (tag,name,page) => ***REMOVED***
			dispatch(posts.fetchPosts(tag,name,page));
	    ***REMOVED***,
		clearPosts: () => ***REMOVED***
			dispatch(posts.clearPosts());
	    ***REMOVED***,
***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Home);
