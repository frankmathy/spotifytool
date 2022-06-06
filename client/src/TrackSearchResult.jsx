import React from 'react';

import { ResultText } from './styles/TrackSearchResults.styles';

const TrackSearchResult = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <ResultText onClick={handlePlay}>
      {track.artist} - {track.title}
    </ResultText>
  );
};

export default TrackSearchResult;
