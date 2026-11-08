# KKTV – Samsung TV Edition

- Opens automatically on **7S Music** (PiShow 1257).
- **Chithiram** uses PiShow 1243.
- Remote: arrows move focus, OK selects, Channel Up/Down switches channels, Play/Pause controls video.
- Larger TV-friendly tiles and strong yellow focus outline.
- `config.xml` included as starter Tizen TV Web App metadata.

## Samsung Tizen packaging
Import these files into a Tizen Studio TV Web Application project, verify the unique app/package ID in `config.xml`, then build and sign with your Samsung developer certificate.

## Autoplay note
KKTV attempts to start 7S Music on page load. Some TV browsers block autoplay with sound; if so, press OK or Play. The app selects 7S Music automatically regardless.

## Stream notes
HLS links can expire, be blocked by CORS/geo/IP restrictions, or require provider authorization. Use streams you are authorized to access. Channel logo tiles are text placeholders. Polimer News still has no separate URL in the original list.
