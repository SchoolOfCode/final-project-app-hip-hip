import React from "react";
import EndPage from "../../../Components/EndPage";

export default function({ joinedRoom }) {
	return (
		<div>
			<h2>
				The Kings and Queens of
				<span>Collaborate</span> are...
			</h2>
			<br />
			<EndPage joinedRoom={joinedRoom} />
		</div>
	);
}
