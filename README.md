# Frank's Spotify Tool

Franks Spotify tool is a collection of useful Spotify tools. Current functionality includes:

- Create a Spotify playlist from a pasted text with Artists & Song names in the following format: <Artist Name> - <Song Title>

Build for Docker:
docker build . -t frankmathy/spotify-tool

Run:
docker run -p 3001:3001 -d frankmathy/spotify-tool
