import React, { Component } from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Redirect, matchPath} from 'react-router-dom';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import { Provider, connect } from "react-redux";
import gaiasApp from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ContactPage from './components/ContactPage';
import 'react-router-modal/css/react-router-modal.css';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { LastLocationProvider, withLastLocation } from 'react-router-last-location';
import Blog from "./components/Blog";
import TagDetail from "./components/TagDetail";
import Template from "./components/Template";
import {posts} from "./actions";

let store = createStore(gaiasApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

	componentDidMount() {
		if(this.props.posts){
			this.props.fetchPosts();
		}
	}	

	render() {
		if (!this.props.posts.isLoading){
			return (
				<BrowserRouter>
					<div>
						<div>
							<Switch>
								<Route exact path="/contact" render={(props) => ( <Template component={<ContactPage/>} /> )} />
								<Route exact path="/blog" render={(props) => ( <Template component={<Blog />} /> )} />
								<Route path="/tag/:tagname" render={(props) => ( <Template component={<TagDetail posts={this.props.posts}/>} {...props}/> )} />
								<Route path="/" render={(props) => ( <Template component={<Home posts={this.props.posts} />} /> )} />
								<Route component={NotFound} />
							</Switch>
						</div>
						<div>
							<ModalContainer />
						</div>
					</div>
				</BrowserRouter>
			);
		} else {
			return(<div>Loading...</div>)
		}
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
		fetchPosts: () => {
			dispatch(posts.fetchPosts());
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
