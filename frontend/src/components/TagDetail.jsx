import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {posts} from "../actions";

class TagDetail extends Component {

	componentDidMount(){
		const path = this.props.props.match.params.tagname;
		if(!this.props.posts.length){
			this.props.fetchPosts(null,path);
		}	
	}

	render(){
		if (!this.props.posts.isLoading) {
			return(
				<div>
				<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<h1 className="text-center">{this.props.posts.posts[0][0].name}</h1>
							</div>
							<div className="col-12 text-center">
								<div className="this.props.posts.posts-image">
									<img src={this.props.posts.posts[0][0].image}/>
								</div>
							</div>
							<div className="col-12">
								<div dangerouslySetInnerHTML={{__html:this.props.posts.posts[0][0].text}}></div>
							</div>
							<div className="col-12">
								<div>{this.props.posts.posts[0][0].tags.map((tag)=>{
									return(<span><Link className="tag-link" to={"/?tags__name="+tag.name}>#{tag.name}</Link>&nbsp;</span>)
								})}</div>
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
		fetchPosts: (tag,path) => {
			dispatch(posts.fetchPosts(tag,path));
	    },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail);
