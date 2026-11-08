# KKTV – Live TV Website

A simple TV-friendly live-channel website made with HTML, CSS and JavaScript.

## Run
1. Extract the ZIP.
2. Open `index.html` in a modern browser, or serve this folder using a local web server.
3. For Samsung Tizen, import the folder into Tizen Studio as a Web Application project and package/sign it using your Samsung developer certificate.

## TV remote controls
- Arrow keys: navigate focus
- OK / Enter: select a channel
- Page Up / Channel Up: previous channel
- Page Down / Channel Down: next channel
- Fullscreen button: fullscreen playback

## Important stream notes
- The website only plays the stream URLs supplied in the request. It does not host or redistribute video.
- Stream URLs can expire, be geo/IP restricted, require authorization, or block playback from a browser through CORS.
- Use only streams you are authorized to access and distribute.
- The Polimer News entry currently uses the News7 Tamil URL as a placeholder because a separate Polimer URL was not supplied. Replace it in `app.js`.
- PiShow IDs 1243 and 1257 are displayed by ID because channel names were not specified.
- Channel logo tiles are text-based branded placeholders. Replace each card's `logoText`/`logoBg` in `app.js` with approved official logo assets if available.

## Samsung TV compatibility
Samsung TV browsers generally support native HLS playback, but compatibility varies by model/year. The player first tries native HLS, then uses hls.js where supported. For production Tizen packaging, follow Samsung's current Tizen Studio and TV Web App requirements.
