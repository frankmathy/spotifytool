import React from 'react';
import Typography from '@mui/material/Typography';

const TrackSearchResult = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <Typography onClick={handlePlay}>
      {track.artist} - {track.title}
    </Typography>
  );
};

export default TrackSearchResult;
