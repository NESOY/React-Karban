import React, { Component, PropTypes } from "react";
import Contact from "./Contact";

class ContactList extends Component {
	render() {
		let filterContacts = this.props.contacts.filter(contact => {
			return contact.name.indexOf(this.props.filterText) !== -1;
		});

		let contacts = filterContacts.map(contact => {
			return (
				<li key={contact.email}>
					<Contact name={contact.name} email={contact.email} />
				</li>
			);
		});

		return (
			<div>
				<ul>{contacts}</ul>
			</div>
		);
	}
}

export default ContactList;
