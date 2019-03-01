import React, ***REMOVED***Component***REMOVED*** from "react";
import ***REMOVED***connect***REMOVED*** from "react-redux";
import ***REMOVED***Link, Redirect***REMOVED*** from "react-router-dom";
import ***REMOVED***auth***REMOVED*** from "../actions";


export default class Errors extends Component ***REMOVED***

	Capitalize(str)***REMOVED***
		return str.charAt(0).toUpperCase() + str.slice(1)
	***REMOVED***

	Replace(str, text, replacementText)***REMOVED***
		return str.replace(text, replacementText)
	***REMOVED***

	render() ***REMOVED***

		let errors = (
			<div>
				<div className="alert alert-danger" role="alert">
					<strong>Uh-oh! Looks like there are some errors with your submission</strong>
					***REMOVED***this.props.errors.map(error => ***REMOVED*** 
						if (error.message[0].match(/This field/g))***REMOVED***
							return(
								<div>
								<hr />
										<span>***REMOVED***this.Capitalize(this.Replace(error.field, "_", " "))***REMOVED***</span><span>***REMOVED***this.Replace(error.message[0],"This field","")***REMOVED***</span>
								</div>
							)
						***REMOVED*** else ***REMOVED***
							return(
								<div>
								<hr />
										<span>***REMOVED***error.message[0]***REMOVED***</span>
								</div>
							)

						***REMOVED***
					***REMOVED***)***REMOVED***
				</div>
			</div>
		)

		return (
			<div>
				***REMOVED***errors***REMOVED***
			</div>
		)
	***REMOVED***
***REMOVED***
