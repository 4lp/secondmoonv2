import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';
import ***REMOVED***tags***REMOVED*** from "../actions";
import PropTypes from 'prop-types'


class TagListing extends Component ***REMOVED***

	static contextTypes = ***REMOVED***
		router: PropTypes.object
	***REMOVED***

	componentDidMount() ***REMOVED***
		if (!this.props.tags.length) ***REMOVED***
	    	this.props.fetchTags();
		***REMOVED***
	***REMOVED***	

	handleTagClick(id)***REMOVED***
		this.props.setTag(id,);
		this.context.router.history.push(`/`);
	***REMOVED***

	render()***REMOVED***
		if (!this.props.tags.isLoading) ***REMOVED***
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								***REMOVED***this.props.tags.tags.map((tag)=>***REMOVED***
									return(<Link to=***REMOVED***"/?tags__name="+tag.name***REMOVED***><div>***REMOVED***tag.name***REMOVED***</div></Link>)
								***REMOVED***)***REMOVED***	
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
	if (state.tags.errors) ***REMOVED***
		errors = Object.keys(state.tags.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.tags.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED*** 
	return ***REMOVED***
		tags: state.tags,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchTags: () => ***REMOVED***
			dispatch(tags.fetchTags());
	    ***REMOVED***,
	***REMOVED***
***REMOVED***

export default connect(mapStateToProps, mapDispatchToProps)(TagListing);
