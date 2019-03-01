import React, ***REMOVED*** Component ***REMOVED*** from 'react';
import './App.css';
import ***REMOVED***Route, Switch, BrowserRouter, Redirect, matchPath***REMOVED*** from 'react-router-dom';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ***REMOVED*** Provider, connect ***REMOVED*** from "react-redux";
import gaiasApp from "./reducers";
import ***REMOVED*** createStore, applyMiddleware ***REMOVED*** from "redux";
import thunk from "redux-thunk";
import ContactPage from './components/ContactPage';
import 'react-router-modal/css/react-router-modal.css';
import ***REMOVED*** ModalContainer, ModalRoute ***REMOVED*** from 'react-router-modal';
import ***REMOVED*** LastLocationProvider, withLastLocation ***REMOVED*** from 'react-router-last-location';
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
import ***REMOVED***products***REMOVED*** from "./actions";

let store = createStore(gaiasApp, applyMiddleware(thunk));

class RootContainerComponent extends Component ***REMOVED***

	componentDidMount() ***REMOVED***
	***REMOVED***	

	render() ***REMOVED***
		let ***REMOVED***AsyncRoute***REMOVED*** = this;
		if (!this.props.products.isLoading)***REMOVED***
			return (
				<BrowserRouter>
					<div>
						<div>
							<Switch>
								<Route exact path="/contact" render=***REMOVED***(props) => ( <Template component=***REMOVED***<ContactPage/>***REMOVED*** /> )***REMOVED*** />
								<Route exact path="/blog" render=***REMOVED***(props) => ( <Template component=***REMOVED***<Blog />***REMOVED*** /> )***REMOVED*** />
								<Route path="/tag/:tagname" render=***REMOVED***(props) => ( <Template component=***REMOVED***<ProductDetail />***REMOVED*** ***REMOVED***...props***REMOVED***/> )***REMOVED*** />
								<Route path="/" render=***REMOVED***(props) => ( <Template component=***REMOVED***<Home/>***REMOVED*** /> )***REMOVED*** />
								<Route component=***REMOVED***NotFound***REMOVED*** />
							</Switch>
						</div>
						<div>
							<ModalContainer />
						</div>
					</div>
				</BrowserRouter>
			);
		***REMOVED*** else ***REMOVED***
			return(<div>Loading...</div>)
		***REMOVED***
	***REMOVED***
***REMOVED***


const mapStateToProps = state => ***REMOVED***
	let errors = [];
	if (state.products.errors) ***REMOVED***
		errors = Object.keys(state.products.errors).map(field => ***REMOVED***
			return ***REMOVED***field, message: state.products.errors[field]***REMOVED***;
		***REMOVED***);
	***REMOVED***
	return ***REMOVED***
		products: state.products,
		errors
	***REMOVED***
***REMOVED***

const mapDispatchToProps = dispatch => ***REMOVED***
	return ***REMOVED***
		fetchProducts: () => ***REMOVED***
			dispatch(products.fetchProducts());
	    ***REMOVED***,
	***REMOVED***
***REMOVED***

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent)

export default class App extends Component ***REMOVED***
	render() ***REMOVED***
		return (
			<Provider store=***REMOVED***store***REMOVED***>
				<RootContainer />
			</Provider>
		)
	***REMOVED***
***REMOVED***
