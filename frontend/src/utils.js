export function navbarRectHeight() {
  let navbar = document.querySelector("#navbar");
  if (!navbar) return 0;
  return navbar.getBoundingClientRect().height;
}

export function sectionHeight100vh(section) {
  let height = navbarRectHeight();
  section.style.minHeight = `calc(100vh - ${height}px)`;
  return `calc(100vh - ${height}px)`;
}
