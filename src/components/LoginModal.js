import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { firebase, googleAuthProvider } from "../firebase/firebase";
import { startGoogleLogin } from "../actions/auth";

export class LoginModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			newUser: false,
			error: ""
      
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

	handleLogin = (e) => {
		e.preventDefault();

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((e) => {
			if(e.code === "auth/user-not-found") {
				this.setState({ error: "No user with that email found." });
			} else if (e.code === "auth/wrong-password") {
				this.setState({ error: "Incorrect password, please try again." });
			} else {
				this.setState({ error: e.message });
			}
    })
	};

	handleStartNewUser = () => {
		this.setState({ newUser: true });
	};

	handleCloseModal = () => {
		this.props.handleCloseModal()
		this.setState({ newUser: false });
	}

	handleCancelNewUser = () => {
		this.setState({ newUser: false });
	}

	handleCreateNewUser = (e) => {
		e.preventDefault();

		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((e) => {
			if (e.code === "auth/email-already-in-use") {
				this.setState({ error: "That email is already in use." });
			} else if (e.code === "auth/invalid-email") {
				this.setState({ error: "Incorrect username or password." });
			} else {
				this.setState({ error: e.message });
			}
		});
	}

	handleGoogleLogin = () => {
		startLogin();
	}

	render() {
		return (
			<Modal
				ariaHideApp={false}
				onRequestClose={this.handleCloseModal}
				isOpen={!!this.props.modalOpen}
				contentLabel="Login"
				closeTimeoutMS={200}
				className="modal"
			>
				{this.state.newUser ?
					<form className="form" onSubmit={this.handleCreateNewUser}>
					{this.state.error && <p className="modal__error">{this.state.error}</p>}
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
					<div className="modal-button">
						<button className="button">Create</button>
					</div>
					<div>
						<button className="button" onClick={this.handleCancelNewUser}>Cancel</button>	
					</div>
					<div className="modal-button__margin-top">
						<button className="button" onClick={this.handleCloseModal}>Close</button>
					</div>
					</form>
					:
					<div>
						<form className="form" onSubmit={this.handleLogin}>
							{this.state.error && <p className="modal__error">{this.state.error}</p>}
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
							<div className="modal-button">
								<div className="modal-button__group">
									<button className="button">Sign In</button>
									<button className="button" onClick={this.handleStartNewUser}>New User</button>
								</div>
								<div className="modal-google" onClick={(() => this.props.startGoogleLogin())}>Google Login</div>
							</div>
						</form>
						<div>
							<button className="button" onClick={this.handleCloseModal}>Close</button>
						</div>
					</div>
				}
      </Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startGoogleLogin: () => dispatch(startGoogleLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginModal);