function Header() {
  return (
    <header className="app-header">
      <svg
        width="100px"
        height="100px"
        viewBox="-10.5 -9.45 21 18.9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-sm me-0 w-10 h-10 text-var(--react-blue) dark:text-blue-600 flex origin-center transition-all ease-in-out"
      >
        <circle cx="0" cy="0" r="2" fill="var(--react-blue)"></circle>
        <g stroke="var(--react-blue)" stroke-width="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>

      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
