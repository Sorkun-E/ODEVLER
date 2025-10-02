const flagCursor = document.getElementById('flagCursor');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  flagCursor.style.left = x + 'px';
  flagCursor.style.top = y + 'px';
});
