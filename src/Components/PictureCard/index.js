import React from "react";
import css from "./PictureCard.module.css";
import puzzle from './iconmonstr-puzzle-1.svg'

const pic = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
function PuzzlePiece({ pictureUrl }) {
  return <img src={pictureUrl} clipPath={`url(${puzzle})`} className={css.picture} alt="not telling..." />;
}

PuzzlePiece.defaultProps = {
	pictureUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
}


export default  PuzzlePiece