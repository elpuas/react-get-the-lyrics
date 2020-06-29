import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Form from './components/Form';
import Song from './components/Song';

function App() {
	// initial state
	// Search starts as an empty object
  const [searchLyric, saveLyric] = useState({});

  // Results starts as an empty string
  const [lyric, savelyric] = useState('')


	useEffect(() => {
		// Return early and often.
		if (Object.keys(searchLyric).length === 0) return;

		// Create a Async/Await function to fetch API
		const searchApiLyric = async () => {

			const { artist, song } = searchLyric;

			const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;

			const res = await axios(url);

			savelyric(res.data.lyrics);
		};
		// Invoke the function
    searchApiLyric();

	}, [searchLyric]); // Check any change on state

	return (
		<Fragment>
			<Form saveLyric={saveLyric} />
      <div>
        <div></div>
        <div>
          <Song
            lyric={lyric}
          />
        </div>
      </div>
		</Fragment>
	);
}

export default App;
