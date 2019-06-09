import { useState, useEffect } from "react";

const useAudio = url => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		if (playing) {
			audio.play();
		}
		return () => {
			console.log("cleaning up audio");
			audio.pause();
		};
	}, [playing]);

	return [playing, toggle];
};

export default useAudio;
