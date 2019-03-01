import ProductDetail from "./ProductDetail";
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export default class Products extends Component {

	render(){
		if (!this.props.products.isLoading){
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h1 className="text-center">Products</h1>
								<br/>
							</div>
							{this.props.products.products.map((product) => {
								let images = product.images.split(',');
								return (
									<div className="col-4 product-image text-center">
										<div key={product.id}>
											<h4><Link to={"/products/"+product.path}>{product.name}</Link></h4>
											<Link to={"/products/"+product.path}><img src={images[0]} /></Link>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			)
		} else {
			return(<div>loading...</div>)
		}
	}

}

