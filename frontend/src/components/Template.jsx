import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";


export default class Template extends Component {
	render(){
		let props = this.props;
		return (
			<div>
				<Header />
				{React.cloneElement(props.component, props={props})}
			{/*<Footer products={this.props.products}/>*/}
			</div>
		)
	}
}
