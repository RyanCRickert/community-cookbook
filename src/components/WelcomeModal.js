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
						Just a quick word of advice for a first time visitor.  If you would like to create an account, please feel free to do so.  Initial accounts will only 
						have the privileges of editing their own personal shopping list.  To request the ability to add or edit recipes, please contact me.  I have allowed anyone to view 
						the process if they wish.
					</div>
					<button className="button" onClick={this.props.closeWelcomeModal}>Close</button>
				</div>
      </Modal>
		)
	}
}