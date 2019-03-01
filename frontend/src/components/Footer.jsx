import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Footer extends Component {
	render(){
		return(
			<div>
				<div id="footer" style={this.props.style}>
					<div className="row">
						<div className="col-3 text-center">
							<p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices molestie mauris, sed tincidunt dolor porttitor in. Mauris suscipit metus nec ullamcorper dictum. Vestibulum et semper velit, ac convallis velit. Aliquam at libero nunc. Nullam vel lacus ornare, congue enim non, congue justo. Mauris convallis velit dui, ac malesuada leo blandit at. Praesent non vulputate urna. Curabitur a urna eget purus tempus euismod. Nam varius luctus elit vitae tristique.</small></p>
						</div>
						<div className="col-3 text-center">
							<h6>Shop Now</h6>
								{this.props.products.products.map((product) => (
									<div key={product.id}>
										<Link to={"/products/"+product.path}>{product.name}</Link>
									</div>
								))}
						</div>
						<div className="col-3 text-center">
							<h6>Information</h6>
						</div>
						<div className="col-3 text-center">
							<h6>Contact Us</h6>
							<div>
								<i className="fas fa-home"></i>
							</div>	
							<div>
								<i className="fas fa-mobile-alt"></i>
							</div>	
							<div>								
								<i className="far fa-envelope"></i>
							</div>
						</div>
						<div className="col-12 text-center">
							<h6>Check us out elsewhere on the web!</h6>
							<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ChooseGaias"><i className="fab fa-twitter-square"></i></a>
							<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/choosegaias/"><i className="fab fa-instagram"></i></a>
							<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/choosegaias/"><i className="fab fa-facebook-square"></i></a>
							<a target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/gaiaschoice/"><i className="fab fa-pinterest-square"></i></a>
							<a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/company/gaiaschoice"><i className="fab fa-linkedin"></i></a>
							<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCIA6YCQOD6aVraoRITio54A?view_as=subscriber"><i className="fab fa-youtube-square"></i></a>
						</div>
					</div>
				</div>
				<div className="made-by col-12">Made with <span role="img" alt="love">❤</span> by <a href="http://slaponic.us" target="_blank">slaponicus</a></div>
			</div>
		)
	}
}
