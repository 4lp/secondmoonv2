import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import ***REMOVED***Link***REMOVED*** from 'react-router-dom';
import ***REMOVED***connect***REMOVED*** from 'react-redux';

export default class ProductDetail extends Component ***REMOVED***

	render()***REMOVED***
		const products = this.props.products.products;
		const path = this.props.props.match.params.productname;
		let images;
		let reviews;
        const product = products.filter(product => ***REMOVED***
            if(product.path == path) ***REMOVED***
				images = product.images.split(',');
				reviews = product.reviews.split(',');
                return product;
            ***REMOVED***
        ***REMOVED***);
		if (!this.props.products.isLoading) ***REMOVED***
			return(
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 text-center">
							</div>
							<div className="col-6">
								<h1 className="text-center">***REMOVED***product[0].name***REMOVED***</h1>
								<p>***REMOVED***product[0].description***REMOVED***</p>
								<div className="text-center">
									<button className="btn btn-primary"><strong>Buy now!</strong></button>
								</div>
								<br/>
								<h3 className="text-center">Reviews</h3>
								<p>
								***REMOVED***reviews.map((review) => (
									<div>
										***REMOVED***review***REMOVED***
									<hr/>
									</div>
								))***REMOVED***
								</p>
							</div>
							<div className="col-6">
								***REMOVED***images.map((image, index) => (
									<div className="product-image" key=***REMOVED***index***REMOVED***>
										<img src=***REMOVED***image***REMOVED***/>
									</div>
								))***REMOVED***
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
