import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***settings***REMOVED*** from "../actions";
import ***REMOVED***posts***REMOVED*** from "../actions";
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Header from "./Header";

const pathre = RegExp('^\/post\/.*$')

class Home extends Component ***REMOVED***
	state = ***REMOVED***
		hasMore: false,
		tagname: '',
		width: '',
		columns: 1 
	***REMOVED***

	componentDidMount() ***REMOVED***
		this.props.clearPosts();
		let params = new URLSearchParams(window.location.search);
		this.setState(***REMOVED***tagname: params.get("tags__name") || null***REMOVED***, () =>
			this.props.fetchPosts(this.state.tagname, null, 1)
		);
        window.addEventListener("resize", this.updateDimensions);
	***REMOVED***	

	componentDidUpdate(prevProps)***REMOVED***
     	if(prevProps.posts.posts.length !== this.props.posts.posts.length)***REMOVED*** 
			this.setState(***REMOVED***hasMore: this.props.posts.next ? true : false***REMOVED***);
 		***REMOVED***
     	if(
			(prevProps.props.location.search !== this.props.props.location.search && this.props.props.location.search) ||
			(prevProps.props.location.pathname !== this.props.props.location.pathname && pathre.test(prevProps.props.location.pathname))
		)***REMOVED***
			this.props.clearPosts();
			let params = new URLSearchParams(window.location.search);
			this.setState(***REMOVED***tagname: params.get("tags__name") || null***REMOVED***, () =>
				this.props.fetchPosts(this.state.tagname, null, 1)
			);
		***REMOVED***
	***REMOVED***

	updateDimensions() ***REMOVED***
        this.setState(***REMOVED***width: window.innerWidth***REMOVED***, () => ***REMOVED***
			if(this.state.width > 1024)***REMOVED***
				this.setState(***REMOVED***columns: 4***REMOVED***)
			***REMOVED*** else if(this.state.width > 922)***REMOVED***
				this.setState(***REMOVED***columns: 3***REMOVED***)
			***REMOVED*** else  if(this.state.width > 786)***REMOVED***
				this.setState(***REMOVED***columns: 2***REMOVED***)
			***REMOVED*** else ***REMOVED***
				this.setState(***REMOVED***colums: 1***REMOVED***)
			***REMOVED***
		***REMOVED***);
    ***REMOVED***

    componentWillMount () ***REMOVED***
        this.updateDimensions();
    ***REMOVED***

    componentWillUnmount () ***REMOVED***
        window.removeEventListener("resize", this.updateDimensions);
    ***REMOVED***

	handlePageUpdate()***REMOVED***
		let page = this.props.posts.posts.length + 1
		if (this.state.hasMore && !this.props.posts.isLoading)***REMOVED***
			this.props.fetchPosts(this.state.tagname, null, page);
		***REMOVED***
	***REMOVED***


	render()***REMOVED***
		const masonryOptions = ***REMOVED***
			transitionDuration: 0
	  	***REMOVED***;
		const imagesLoadedOptions = ***REMOVED*** background: '.my-bg-image-el' ***REMOVED***;
		let params = new URLSearchParams(window.location.search);
		const sizes = [
		  ***REMOVED*** columns: 1, gutter: 0 ***REMOVED***,
		  ***REMOVED*** mq: '786px', columns: 2, gutter: 0 ***REMOVED***,
		  ***REMOVED*** mq: '922px', columns: 3, gutter: 0 ***REMOVED***,
		  ***REMOVED*** mq: '1024px', columns: 4, gutter: 0 ***REMOVED***
		]
		let divWidth = this.state.width/this.state.columns - 4 
		console.log(this.state.width/this.state.columns)
		***REMOVED***/* need to block render on posts page but keep it for modals */***REMOVED***
		if (pathre.test(this.props.props.location.pathname))***REMOVED***
			return(<div></div>)
		***REMOVED***else if (!this.props.posts.isLoading || this.props.posts.posts.length)***REMOVED***
			return(
				<div className="container-fluid">
					<div className="row" style=***REMOVED******REMOVED***width: "100%"***REMOVED******REMOVED***>
					<Header refreshHome=***REMOVED***this.refreshHome***REMOVED*** />
					<div className="container-fluid home-container m0 p0">
						<div className="row">
							<div className="col-12">
								<MasonryInfiniteScroller
									hasMore=***REMOVED***this.state.hasMore***REMOVED***
									loadMore=***REMOVED***() => this.handlePageUpdate()***REMOVED***
									className="main-masonry"
									style=***REMOVED******REMOVED***width:'100%'***REMOVED******REMOVED***
							        loader=***REMOVED***<div className="loader" key=***REMOVED***0***REMOVED***>Loading ...</div>***REMOVED***
									sizes=***REMOVED***sizes***REMOVED***
									pack=***REMOVED***true***REMOVED***
								>
									***REMOVED***this.props.posts.posts.map((post) => ***REMOVED***
										return (
											<div key=***REMOVED***post[0].id***REMOVED*** style=***REMOVED******REMOVED***width: divWidth***REMOVED******REMOVED***>
												<Link className="overlay-container" to=***REMOVED***"/post/"+post[0].path***REMOVED*** style=***REMOVED******REMOVED***width: divWidth***REMOVED******REMOVED***>
													<img style=***REMOVED******REMOVED***width: divWidth***REMOVED******REMOVED*** src=***REMOVED***post[0].image***REMOVED***/>
													<div className="overlay" style=***REMOVED******REMOVED***width: divWidth***REMOVED******REMOVED***><div className="overlay-text">***REMOVED***post[0].name***REMOVED***</div></div>
												</Link>
											</div>
										)
									***REMOVED***)***REMOVED***
								</MasonryInfiniteScroller>
							</div>
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
	if (state.postsPictures.errors) ***REMOVED***
		errors = Object.keys(state.posts.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.posts.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED*** 
	if (state.settings.errors) ***REMOVED***
		errors = [...errors, Object.keys(state.settings.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.settings.errors[field]***REMOVED***;
		***REMOVED***)];
	***REMOVED***
	return ***REMOVED***
		settings: state.settings,
		posts: state.posts,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
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
