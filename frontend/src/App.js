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
import TagListing from "./components/TagListing";
import TagCategory from "./components/TagCategory";
import Template from "./components/Template";
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
							<Switch>
								<Route exact path="/contact" render={(props) => ( <Template component={<ContactPage/>} /> )} />
								<Route exact path="/blog" render={(props) => ( <Template component={<Blog />} /> )} />
								{/*<Route path="/post/:tagname" render={(props) => ( <Template component={<TagDetail posts={this.props.posts}/>} {...props}/> )} />
								<Route path="/tag" render={(props) => ( <Template component={<TagListing setTag={this.setTag.bind(this)} posts={this.props.posts}/>} {...props}/> )} />
								<Route path="/tag/:tagname" render={(props) => ( <Template component={<TagCategory posts={this.props.posts}/>} {...props}/> )} />
								<Route path="/:tagname" render={(props) => ( <Template component={<Home posts={this.props.posts} />} /> )} />*/}
								<Route path="/post/:tagname" render={(props) => ( <Template component={<TagDetail />} {...props}/> )} />
								<Route path="/tag" render={(props) => ( <Template component={<TagListing />} {...props}/> )} />
								<Route path="/tag/:tagname" render={(props) => ( <Template component={<TagCategory />} {...props}/> )} />
								<Route path="/" render={(props) => ( <Template component={<Home />} /> )} />
									{/*<Route component={NotFound} />*/}
							</Switch>
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
