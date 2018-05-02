import React from "react";
import Modal from "react-modal";
import { firebase } from "../firebase/firebase";
import { startLogin } from "../actions/auth";

export default class PostForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			verify: ""
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		this.props.onRemove();
	};

	onRemoveChange = (e) => {
		const verify = e.target.value;
		this.setState({ verify });
	};

	render() {
		return (
			<Modal
				ariaHideApp={false}
				onRequestClose={this.props.handleCloseModal}
				isOpen={!!this.props.modalOpen}
				closeTimeoutMS={200}
				className="modal-remove"
			>
				<form className="form" onSubmit={this.onSubmit}>
					<h1 className="modal-remove__header no-margin">Attention!</h1>
					<h3 className="modal-remove__header">You are attempting to remove "{this.props.recipeName}"</h3>
					<div className="modal-remove__body">
						This would be a permanent change and cannot be undone.  If you are sure that you want to delete this recipe, please verify
						the name of the current recipe in the text box to remove it.
					</div>
					<input
						type="text"
						className="modal-remove__input"
						onChange={this.onRemoveChange}
					>

					</input>
				
				<button className={this.props.recipeName !== this.state.verify ? "button button-block" : "button button-verify"}
					onClick={this.props.onSubmit}
					disabled={this.props.recipeName !== this.state.verify}
					>
					Remove
				</button>
				</form>
      </Modal>
		)
	}
}