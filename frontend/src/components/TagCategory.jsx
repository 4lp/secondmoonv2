import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';

export default class TagCategory extends Component ***REMOVED***

	render()***REMOVED***
		const posts = this.props.posts.posts;
		const path = this.props.props.match.params.tagname;
		let images;
		let reviews;
        const post = posts.filter(post => ***REMOVED***
            if(post.path == path) ***REMOVED***
                return post;
            ***REMOVED***
        ***REMOVED***);
		if (!this.props.posts.isLoading) ***REMOVED***
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<h1 className="text-center">***REMOVED***post[0].name***REMOVED***</h1>
							</div>
							<div className="col-12 text-center">
								<div className="post-image">
									<img src=***REMOVED***post[0].image***REMOVED***/>
								</div>
							</div>
							<div className="col-12">
								<div dangerouslySetInnerHTML=***REMOVED******REMOVED***__html:post[0].text***REMOVED******REMOVED***></div>
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
