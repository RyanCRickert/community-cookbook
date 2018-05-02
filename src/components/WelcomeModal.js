import React from "react";
import Modal from "react-modal";

export default class PostForm extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<Modal
				ariaHideApp={false}
				onRequestClose={this.props.closeWelcomeModal}
				isOpen={!!this.props.firstVisit}
				closeTimeoutMS={200}
				className="modal-intro"
			>
				<div>
					<h1>Hello and Welcome</h1>
					<div className="modal-intro__body">
						Just a quick word of advice for a first time visitor.  I have provided a dummy account (tester@test.com//master) 
						for users who do not have their own account.  This account cannot write to the database but allows anyone to see how the account system works.  
						You can also reopen this modal by clicking "Community Cookbook".  Thanks for stopping by.
					</div>
					<button className="button" onClick={this.props.closeWelcomeModal}>Close</button>
				</div>
      </Modal>
		)
	}
}