// Handle GitHub Pages SPA redirects from public/404.html.
(function handleSpaRedirect(location) {
  if (location.search[1] !== '/') return;

  const decoded = location.search
    .slice(1)
    .split('&')
    .map((value) => value.replace(/~and~/g, '&'))
    .join('?');

  const candidatePath = `${location.pathname.replace(/\/$/, '')}${decoded}${location.hash}`;

  // Guard against open redirects: only allow same-site paths under the project base path.
  if (candidatePath.startsWith('/audio-scribe-site') && !candidatePath.startsWith('//')) {
    window.history.replaceState(null, '', candidatePath);
  }
}(window.location));
