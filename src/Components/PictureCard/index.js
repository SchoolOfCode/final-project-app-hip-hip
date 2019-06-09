import React from "react";
import css from "./PictureCard.module.css";

const pic =
	"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
function PuzzlePiece({ pictureUrl, teamColor }) {
	return (
		<div className={css.container}>
			{/* <div className={css.bottom} /> */}
			<img src={pictureUrl} className={css.picture} alt="not telling..." />
		</div>
	);
}

PuzzlePiece.defaultProps = {
	pictureUrl:
		"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
};

export default PuzzlePiece;
