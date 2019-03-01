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
import Products from "./components/Products";
import MissionStatement from "./components/MissionStatement";
import Experience from "./components/Experience";
import Faq from "./components/Faq";
import WhoCanUse from "./components/WhoCanUse";
import Benefits from "./components/Benefits";
import WhatIsCBD from "./components/WhatIsCBD";
import WhyWereDoingThis from "./components/WhyWereDoingThis";
import ProductDetail from "./components/ProductDetail";
import Template from "./components/Template";
import {products} from "./actions";

let store = createStore(gaiasApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

	componentDidMount() {
	}	

	render() {
		let {AsyncRoute} = this;
		if (!this.props.products.isLoading){
			return (
				<BrowserRouter>
					<div>
						<div>
							<Switch>
								<Route exact path="/contact" render={(props) => ( <Template component={<ContactPage/>} /> )} />
								<Route exact path="/blog" render={(props) => ( <Template component={<Blog />} /> )} />
								<Route path="/tag/:tagname" render={(props) => ( <Template component={<ProductDetail />} {...props}/> )} />
								<Route path="/" render={(props) => ( <Template component={<Home/>} /> )} />
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
	if (state.products.errors) {
		errors = Object.keys(state.products.errors).map(field => {
			return {field, message: state.products.errors[field]};
		});
	}
	return {
		products: state.products,
		errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => {
			dispatch(products.fetchProducts());
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
