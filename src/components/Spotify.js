import React, {useState} from 'react'

const Spotify = ({spotid}) => {
	return (
		<div>
			<iframe src={`https://open.spotify.com/embed/track/${spotid}`}
			width="300"
			height="380"
			frameBorder="0"
			allowtransparency="true"
			allow="encrypted-media" />
			{console.log(spotid)}
		</div>
	 );
}

export default Spotify;