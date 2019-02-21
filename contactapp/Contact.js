import React, { Component, PropTypes } from "react";

class Contact extends Component {
	render() {
		return (
			<div>
				{this.props.name} - {this.props.email}
			</div>
		);
	}
}

Contact.PropTypes = {
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
};

export default Contact;
