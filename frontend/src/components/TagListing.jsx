import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {tags} from "../actions";
import PropTypes from 'prop-types'


class TagListing extends Component {

	static contextTypes = {
		router: PropTypes.object
	}

	componentDidMount() {
		if (!this.props.tags.length) {
	    	this.props.fetchTags();
		}
	}	

	handleTagClick(id){
		this.props.setTag(id);
		this.context.router.history.push(`/`);
	}

	render(){
		if (!this.props.tags.isLoading) {
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								{this.props.tags.tags.map((tag)=>{
									return(<a href="#" onClick={()=>this.handleTagClick(tag.id)}><div>{tag.name}</div></a>)
								})}
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
	if (state.tags.errors) {
		errors = Object.keys(state.tags.errors).map(field => {
			return {field, message: state.tags.errors[field]};
		});
	} 
	return {
		tags: state.tags,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTags: () => {
			dispatch(tags.fetchTags());
	    },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TagListing);
