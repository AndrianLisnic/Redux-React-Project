import { Alert, Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import "./Notification.css";
import { useEffect } from "react";

export default function Notification({ type, message }) {
	const dispatch = useDispatch();
	const notification = useSelector((state) => state.ui.notification);

	const handleClose = () => {
		dispatch(
			uiActions.showNotification({
				open: false,
			})
		);
	};

	return (
		<div className="notification-container">
			{notification.open && (
				<Alert onClose={handleClose} severity={type}>
					{message}
				</Alert>
			)}
		</div>
	);
}
