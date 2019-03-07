import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***posts***REMOVED*** from "../actions";

class TagDetail extends Component ***REMOVED***

	componentDidMount()***REMOVED***
		const path = this.props.props.match.params.tagname;
		this.props.clearPosts();
		if(!this.props.posts.length)***REMOVED***
			this.props.fetchPosts(null,path);
		***REMOVED***	
	***REMOVED***

	render()***REMOVED***
		if (!this.props.posts.isLoading) ***REMOVED***
			return(
				<div>
				<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<h1 className="text-center">***REMOVED***this.props.posts.posts[0][0].name***REMOVED***</h1>
							</div>
							<div className="col-12 text-center">
								<div className="this.props.posts.posts-image">
									<img src=***REMOVED***this.props.posts.posts[0][0].image***REMOVED***/>
								</div>
							</div>
							<div className="col-12">
								<div dangerouslySetInnerHTML=***REMOVED******REMOVED***__html:this.props.posts.posts[0][0].text***REMOVED******REMOVED***></div>
							</div>
							<div className="col-12">
								<div>***REMOVED***this.props.posts.posts[0][0].tags.map((tag)=>***REMOVED***
									return(<span><Link className="tag-link" to=***REMOVED***"/?tags__name="+tag.name***REMOVED***>#***REMOVED***tag.name***REMOVED***</Link>&nbsp;</span>)
								***REMOVED***)***REMOVED***</div>
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
		fetchPosts: (tag,path) => ***REMOVED***
			dispatch(posts.fetchPosts(tag,path));
	    ***REMOVED***,
		clearPosts: () => ***REMOVED***
			dispatch(posts.clearPosts());
	    ***REMOVED***,

	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail);
