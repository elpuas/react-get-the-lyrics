import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import Song from './components/Song';
import Spotify from './components/Spotify';

function App() {
	// initial state
	// Search starts as an empty object
	const [searchLyric, saveLyric] = useState({});

	// Results starts as an empty string
	const [lyric, saveTheLyric] = useState('');

	// Spotify ID start as an empty array
	const [spotid, saveSpotId] = useState('3lMVtX2zN22nm30jGVoOpT');

	// Audio DB starts with empty array
	const [genre, setGenre] = useState('Metal');

	useEffect(() => {
		// Return early and often.
		if (Object.keys(searchLyric).length === 0) return;

		// Create a Async/Await function to fetch API
		const searchApiLyric = async () => {
			const { artist, song } = searchLyric;
			const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
			const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
			const url3 = {
				url: `https://api.spotify.com/v1/search?q=track%3A${song}%20artist%3A${artist}&type=track%2Cartist&limit=1`,
				method: 'get',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization:
						'Bearer BQC9wAarLDylI9gkBAuOEDknhltDB7Z949_YG-eK2NPkzRF_7aT9ZerXpnulBqkPO3PvJmTGnMiVLYmt-CEqXKAQa1xi4RXI-4fj2L_WUB2JWKM7r9CqwB_xQo4mpo7eO0bD7wyIditMcIdnYyc',
				},
			};

			const [lyric, info, track] = await Promise.all([axios(url), axios(url2), axios(url3)]);

			saveTheLyric(lyric.data.lyrics);
			saveSpotId(track.data.tracks.items[0].id);
			setGenre(info.data.artists[0].strStyle);
		};
		// Invoke the function
		searchApiLyric();
	}, [searchLyric]); // Check any change on state

	return (
		<Fragment>
			<Form saveLyric={saveLyric} />
			<div>
				{'Metal' === genre ? (
					<div>
						<Spotify spotid={spotid} />
						<Song lyric={lyric} />
					</div>
				) : (
					'This is not a Metal Song'
				)}
			</div>
		</Fragment>
	);
}

export default App;
