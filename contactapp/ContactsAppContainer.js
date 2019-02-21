import React, { Component } from "react";
import { render } from "react-dom";
import "whatwg-fetch";
import ContactsApp from "./ContactApp";

class ContactsAppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: []
		};
	}

	componentDidMount() {
		fetch("./contacts.json")
			.then(response => response.json())
			.then(responseData => {
				this.setState({
					contacts: responseData
				});
			})
			.catch(error => {
				console.log("Error fetching and parsing data", error);
			});
	}

	render() {
		return <ContactsApp contacts={this.state.contacts} />;
	}
}

export default ContactsAppContainer;
