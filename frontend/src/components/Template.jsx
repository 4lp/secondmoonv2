import React, {Component} from 'react';
import Header from "./Header";


export default class Template extends Component {
	state = {
		update: false
	}

	refreshHome(){
		this.setState({update: !this.state.update});
	}

	render(){
		let props = this.props;
		return (
			<div>
				<Header refreshHome={this.refreshHome} />
				{React.cloneElement(props.component, props={props})}
			</div>
		)
	}
}
