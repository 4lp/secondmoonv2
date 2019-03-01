import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {blogposts} from "../actions";
import {blogcategories} from "../actions";

class Blog extends Component {
	state = {
		category: null,
		page: 0,
	}

	componentDidMount() {
		if (!this.props.blogposts.length){
	    	this.props.fetchBlogposts(this.state);
		}
		if (!this.props.blogcategories.length){
	    	this.props.fetchBlogCategories();
		}
	}	

	handleCategoryClick(category) {
		this.setState({category: category, page: 0}, async () => {this.props.fetchBlogposts(this.state)});
	}

	handlePageClick(page) {
		this.setState({page: page}, async () => {this.props.fetchBlogposts(this.state)});
	}
	
	render(){
		if (!this.props.blogposts.isLoading){
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
								{this.props.blogposts.blogposts.results.map((blogpost) => (
									<div key={blogpost.id}>
										<h4>{blogpost.title}</h4>
										<p>
											{blogpost.text}
											<br/>
											<br/>
											<small>Posted by {blogpost.owner} at {blogpost.created_at}</small>
										</p>
									</div>
								))}
							</div>
							<div className="col-3 category-list align-self-start">
								<h4>Categories</h4>
								<a href="#" onClick={()=>{this.handleCategoryClick(undefined)}}>All</a>
								{this.props.blogcategories.map((category) => {
									if (this.state.category !== category.id){
										return (<div><a href="#" onClick={()=>{this.handleCategoryClick(category.id)}}>{category.name}</a></div>)
									} else {
										return (<div><span>{category.name}</span></div>)
									}
								})}
							</div>
							<div className="col-12">
								{this.state.page !== 0 &&
									<a href="#" className="pagination" onClick={()=>{this.handlePageClick(this.state.page-1)}}>«</a>
								}
								{/* basically range(count) */}
								{[...Array(pages).keys()].map((page) => {
									if (this.state.page !== page){
										return (<a href="#" className="pagination" onClick={()=>{this.handlePageClick(page)}}>{page + 1}</a>)
									} else {
										return (<span className="pagination">{page + 1}</span>)
									}
								})}
								{this.state.page !== pages - 1 &&
									<a href="#" className="pagination" onClick={()=>{this.handlePageClick(this.state.page+1)}}>»</a>
								}
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
	if (state.blogposts.errors) {
		errors = Object.keys(state.blogposts.errors).map(field => {
			return {field, message: state.blogposts.errors[field]};
		});
	}
	if (state.blogcategories.errors) {
		errors = [...errors, Object.keys(state.blogcategories.errors).map(field => {
			return {field, message: state.blogcategories.errors[field]};
		})];
	}
	return {
		blogposts: state.blogposts,
		blogcategories: state.blogcategories,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchBlogposts: (category) => {
			dispatch(blogposts.fetchBlogposts(category));
	    },
		fetchBlogCategories: () => {
			dispatch(blogcategories.fetchBlogCategories());
	    },

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
