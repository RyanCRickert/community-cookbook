import React from "react";
import Modal from "react-modal";
import { firebase } from "../firebase/firebase";
import { startLogin } from "../actions/auth";

export default class PostForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
      
		}
	}

	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};

	onEmailChange = (e) => {
		const email = e.target.value;
    this.setState(() => ({ email }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((e) => {
      console.log("Error: ", e);
    })
	};

	render() {
		return (
			<Modal
				ariaHideApp={false}
				onRequestClose={this.props.handleCloseModal}
				isOpen={!!this.props.modalOpen}
				contentLabel="Login"
				closeTimeoutMS={200}
				className="modal"
			>
				<form className="form" onSubmit={this.onSubmit}>
					{this.state.error && <p className="form__error">{this.state.error}</p>}
					<input
						className="text-input"
						type="text"
						placeholder="Email"
						autoFocus
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					<input
						className="text-input"
            placeholder="Password"
            type="password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					></input>
					<div>
						<button className="button">Sign In</button>
					</div>
				</form>
				<button className="button" onClick={this.props.handleCloseModal}>Close</button>
      </Modal>
		)
	}
}