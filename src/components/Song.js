import React , {Fragment} from 'react'

const Song = ({lyric}) => {
	return (
		<Fragment>
			<h2>The Lyric</h2>
			<p>{lyric}</p>
		</Fragment>
	 );
}

export default Song;