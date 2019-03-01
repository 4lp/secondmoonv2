import React, ***REMOVED***Component***REMOVED*** from 'react';
import Header from "./Header";
import Footer from "./Footer";


export default class Template extends Component ***REMOVED***
	render()***REMOVED***
		let props = this.props;
		return (
			<div>
				<Header />
				***REMOVED***React.cloneElement(props.component, props=***REMOVED***props***REMOVED***)***REMOVED***
			***REMOVED***/*<Footer products=***REMOVED***this.props.products***REMOVED***/>*/***REMOVED***
			</div>
		)
	***REMOVED***
***REMOVED***
