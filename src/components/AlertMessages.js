import { useEffect } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// components
import Alert from "./Alert";

// actions
import { deleteMessage } from "../actions/messages";

// css
import "./AlertMessages.css";

const AlertMessages = ({ messages, deleteMessage }) => {
	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<div className="AlertMessages">
			<TransitionGroup>
				{messages.map((message, id) => (
					<CSSTransition
						key={id}
						timeout={{ enter: 500, exit: 300 }}
						classNames="alert"
					>
						<Alert
							message={message.text}
							type={message.type}
							onClose={() => deleteMessage(id)}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

const mapStateToProps = (state) => ({
	messages: state.messages,
});

const mapDispatchToProps = (dispatch) => ({
	deleteMessage: (id) => dispatch(deleteMessage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessages);
