import React, { useState } from 'react';

const Form = ({ saveLyric }) => {

	const [search, saveSearch] = useState({
		artist: '',
		song: '',
	});

	//
	const [error, saveError] = useState(false);

	// Destructure search
	const { artist, song } = search;

	// Function for each input for read it's value.
	const updateState = (e) => {
		// Since this is an object we get a copy of `search`
		// and with e.target.name add the new content.
		saveSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	// Query the API
	const searchLyrics = (e) => {
		e.preventDefault();
		if ('' === artist.trim() || '' === song.trim()) {
			saveError(true);
			return;
		}
		saveError(false);
		// Send to App
		saveLyric(search);
	};

	return (
		<div>
			{error ? 'error' : null}
			<form onSubmit={searchLyrics}>
				<input type="text" name="artist" value={artist} onChange={updateState} placeholder="Artist" />
				<input type="text" name="song" value={song} onChange={updateState} placeholder="Song" />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default Form;
