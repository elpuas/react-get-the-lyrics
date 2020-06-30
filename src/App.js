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
	const [spotid, saveSpotId] = useState('');

	useEffect(() => {
		// Return early and often.
		if (Object.keys(searchLyric).length === 0) return;

		// Create a Async/Await function to fetch API
		const searchApiLyric = async () => {
			// const id = '2dQd2qrFB5VtuUMp45G41p'
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

			const [lyric, info, track] = await Promise.all([
				axios(url),
				axios(url2),
				axios(url3),
				// axios(url3)
			]);

			console.log('INFO', info.data.artists[0].strStyle);
			console.log('LETRA', lyric.data.lyrics);
			console.log('SPOTIFY ID', track.data.tracks.items[0].id);

			saveTheLyric(lyric.data.lyrics);
			saveSpotId(track.data.tracks.items[0].id);
		};
		// Invoke the function
		searchApiLyric();
	}, [searchLyric]); // Check any change on state

	return (
		<Fragment>
			<Form saveLyric={saveLyric} />
			<div>
				<div>
					<Spotify spotid={spotid} />

					<Song lyric={lyric} />
				</div>
			</div>
		</Fragment>
	);
}

export default App;
