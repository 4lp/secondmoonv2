import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***blogposts***REMOVED*** from "../actions";
import ***REMOVED***blogcategories***REMOVED*** from "../actions";

class Blog extends Component ***REMOVED***
	state = ***REMOVED***
		category: null,
		page: 0,
	***REMOVED***

	componentDidMount() ***REMOVED***
		if (!this.props.blogposts.length)***REMOVED***
	    	this.props.fetchBlogposts(this.state);
		***REMOVED***
		if (!this.props.blogcategories.length)***REMOVED***
	    	this.props.fetchBlogCategories();
		***REMOVED***
	***REMOVED***	

	handleCategoryClick(category) ***REMOVED***
		this.setState(***REMOVED***category: category, page: 0***REMOVED***, async () => ***REMOVED***this.props.fetchBlogposts(this.state)***REMOVED***);
	***REMOVED***

	handlePageClick(page) ***REMOVED***
		this.setState(***REMOVED***page: page***REMOVED***, async () => ***REMOVED***this.props.fetchBlogposts(this.state)***REMOVED***);
	***REMOVED***
	
	render()***REMOVED***
		if (!this.props.blogposts.isLoading)***REMOVED***
			let pages = Math.floor(this.props.blogposts.blogposts.count / 5) + 1;
			console.log(pages)
			console.log(this.state.page)
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<h1>Blog</h1>
							</div>
							<div className="col-9">
								***REMOVED***this.props.blogposts.blogposts.results.map((blogpost) => (
									<div key=***REMOVED***blogpost.id***REMOVED***>
										<h4>***REMOVED***blogpost.title***REMOVED***</h4>
										<p>
											***REMOVED***blogpost.text***REMOVED***
											<br/>
											<br/>
											<small>Posted by ***REMOVED***blogpost.owner***REMOVED*** at ***REMOVED***blogpost.created_at***REMOVED***</small>
										</p>
									</div>
								))***REMOVED***
							</div>
							<div className="col-3 category-list align-self-start">
								<h4>Categories</h4>
								<a href="#" onClick=***REMOVED***()=>***REMOVED***this.handleCategoryClick(undefined)***REMOVED******REMOVED***>All</a>
								***REMOVED***this.props.blogcategories.map((category) => ***REMOVED***
									if (this.state.category !== category.id)***REMOVED***
										return (<div><a href="#" onClick=***REMOVED***()=>***REMOVED***this.handleCategoryClick(category.id)***REMOVED******REMOVED***>***REMOVED***category.name***REMOVED***</a></div>)
									***REMOVED*** else ***REMOVED***
										return (<div><span>***REMOVED***category.name***REMOVED***</span></div>)
									***REMOVED***
								***REMOVED***)***REMOVED***
							</div>
							<div className="col-12">
								***REMOVED***this.state.page !== 0 &&
									<a href="#" className="pagination" onClick=***REMOVED***()=>***REMOVED***this.handlePageClick(this.state.page-1)***REMOVED******REMOVED***>«</a>
								***REMOVED***
								***REMOVED***/* basically range(count) */***REMOVED***
								***REMOVED***[...Array(pages).keys()].map((page) => ***REMOVED***
									if (this.state.page !== page)***REMOVED***
										return (<a href="#" className="pagination" onClick=***REMOVED***()=>***REMOVED***this.handlePageClick(page)***REMOVED******REMOVED***>***REMOVED***page + 1***REMOVED***</a>)
									***REMOVED*** else ***REMOVED***
										return (<span className="pagination">***REMOVED***page + 1***REMOVED***</span>)
									***REMOVED***
								***REMOVED***)***REMOVED***
								***REMOVED***this.state.page !== pages - 1 &&
									<a href="#" className="pagination" onClick=***REMOVED***()=>***REMOVED***this.handlePageClick(this.state.page+1)***REMOVED******REMOVED***>»</a>
								***REMOVED***
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
	if (state.blogposts.errors) ***REMOVED***
		errors = Object.keys(state.blogposts.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.blogposts.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED***
	if (state.blogcategories.errors) ***REMOVED***
		errors = [...errors, Object.keys(state.blogcategories.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.blogcategories.errors[field]***REMOVED***;
		***REMOVED***)];
	***REMOVED***
	return ***REMOVED***
		blogposts: state.blogposts,
		blogcategories: state.blogcategories,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchBlogposts: (category) => ***REMOVED***
			dispatch(blogposts.fetchBlogposts(category));
	    ***REMOVED***,
		fetchBlogCategories: () => ***REMOVED***
			dispatch(blogcategories.fetchBlogCategories());
	    ***REMOVED***,

	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
