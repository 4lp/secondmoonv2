import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export default class TagCategory extends Component {

	render(){
		const posts = this.props.posts.posts;
		const path = this.props.props.match.params.tagname;
		let images;
		let reviews;
        const post = posts.filter(post => {
            if(post.path == path) {
                return post;
            }
        });
		if (!this.props.posts.isLoading) {
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
								<h1 className="text-center">{post[0].name}</h1>
							</div>
							<div className="col-12 text-center">
								<div className="post-image">
									<img src={post[0].image}/>
								</div>
							</div>
							<div className="col-12">
								<div dangerouslySetInnerHTML={{__html:post[0].text}}></div>
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
