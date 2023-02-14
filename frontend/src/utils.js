export function navbarRect() {
  let navbar = document.querySelector("#navbar");
  return navbar.getBoundingClientRect();
}

export function sectionHeight100vh(section) {
  let navRect = navbarRect();
  section.style.minHeight = `calc(100vh - ${navRect.height}px)`;
  return `calc(100vh - ${navRect.height}px)`;
}
