import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Redirect, matchPath} from 'react-router-dom';
import Home from "./components/Home";
import { Provider, connect } from "react-redux";
import gaiasApp from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Contact from './components/Contact';
import 'react-router-modal/css/react-router-modal.css';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { LastLocationProvider, withLastLocation } from 'react-router-last-location';
import TagDetail from "./components/TagDetail";
import TagListing from "./components/TagListing";
import TagCategory from "./components/TagCategory";
import Template from "./components/Template";
import About from "./components/About";
import {posts} from "./actions";

let store = createStore(gaiasApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

	state = {
		filteredTag: ''
	}

	componentDidMount() {
		{/*if(this.props.posts){
			this.props.fetchPosts(this.state.filteredTag);
		}*/}
	}	

	setTag(tag){
		this.setState({filteredTag: tag});
	}

	render() {
			return (
				<BrowserRouter>
					<div>
						<div>
								<ModalRoute 
									path="/contact" 
									parentPath="/" 
									component={Contact} 
									className='example-modal'
									inClassName='example-modal-in'
									outClassName='example-modal-out'
									backdropClassName='example-backdrop'
									backdropInClassName='example-backdrop-in'
									backdropOutClassName='example-backdrop-out'
									outDelay={500}
								/>
								<ModalRoute 
									path="/tag" 
									parentPath="/" 
									component={TagListing} 
									className='example-modal'
									inClassName='example-modal-in'
									outClassName='example-modal-out'
									backdropClassName='example-backdrop'
									backdropInClassName='example-backdrop-in'
									backdropOutClassName='example-backdrop-out'
									outDelay={500}
								/>
								<ModalRoute 
									path="/about" 
									parentPath="/" 
									component={About} 
									className='example-modal'
									inClassName='example-modal-in'
									outClassName='example-modal-out'
									backdropClassName='example-backdrop'
									backdropInClassName='example-backdrop-in'
									backdropOutClassName='example-backdrop-out'
									outDelay={500}
								/>

								<Route path="/post/:tagname" render={(props) => ( <Template component={<TagDetail />} {...props}/> )} />
								<Route path="/" render={(props) => ( <Home props={props} /> )} />
						</div>
						<div>
							<ModalContainer />
						</div>
					</div>
				</BrowserRouter>
			);
	}
}


const mapStateToProps = state => {
	let errors = [];
	if (state.posts.errors) {
		errors = Object.keys(state.posts.errors).map(field => {
			return {field, message: state.posts.errors[field]};
		});
	}
	return {
		posts: state.posts,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: (tag) => {
			dispatch(posts.fetchPosts(tag));
	    },
	}
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		)
	}
}
