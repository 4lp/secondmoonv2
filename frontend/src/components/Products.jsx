import ProductDetail from "./ProductDetail";
import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';

export default class Products extends Component ***REMOVED***

	render()***REMOVED***
		if (!this.props.products.isLoading)***REMOVED***
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h1 className="text-center">Products</h1>
								<br/>
							</div>
							***REMOVED***this.props.products.products.map((product) => ***REMOVED***
								let images = product.images.split(',');
								return (
									<div className="col-4 product-image text-center">
										<div key=***REMOVED***product.id***REMOVED***>
											<h4><Link to=***REMOVED***"/products/"+product.path***REMOVED***>***REMOVED***product.name***REMOVED***</Link></h4>
											<Link to=***REMOVED***"/products/"+product.path***REMOVED***><img src=***REMOVED***images[0]***REMOVED*** /></Link>
										</div>
									</div>
								)
							***REMOVED***)***REMOVED***
						</div>
					</div>
				</div>
			)
		***REMOVED*** else ***REMOVED***
			return(<div>loading...</div>)
		***REMOVED***
	***REMOVED***

***REMOVED***

