import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
	return async (dispatch) => {
		// Send state as Sending request
		dispatch(
			uiActions.showNotification({
				open: true,
				message: "Sending data",
				type: "info",
			})
		);

		const sendRequest = async () => {
			const res = await fetch(
				"https://redux-http-bc782-default-rtdb.firebaseio.com/cartItems.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);
			const data = await res.json();
			// Send state as Request is successful
			dispatch(
				uiActions.showNotification({
					open: true,
					message: "Sent Request to Database successfully",
					type: "success",
				})
			);
		};

		try {
			await sendRequest();
		} catch (error) {
			// Send state as Error
			dispatch(
				uiActions.showNotification({
					open: true,
					message: "Sent Request to Database failed",
					type: "error",
				})
			);
		}
	};
};

export const fetchData = () => {
	return async (dispatch) => {
		const fetchHandler = async () => {
			const res = await fetch(
				"https://redux-http-bc782-default-rtdb.firebaseio.com/cartItems.json"
			);
			const data = res.json();
			return data;
		};

		try {
			const cartData = await fetchHandler();
			dispatch(cartActions.replaceData(cartData));
		} catch (error) {
			console.log(error);
		}
	};
};
