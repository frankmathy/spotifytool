import React from 'react';
import Button from '@mui/material/Button';

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private`;

  return (
    <Button variant="contained" href={AUTH_URL}>
      Login with Spotify
    </Button>
  );
};

export default Login;
