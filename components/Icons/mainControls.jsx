const fillNone = { fill: "none" };
const strokeNone = { stroke: "none" };

export const Docs = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="20"
    viewBox="0 0 22 20"
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path
        style={fillNone}
        strokeOpacity="0.4"
        d="M5 1h2a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4z"
      />
      <path
        style={fillNone}
        d="M17 1h-2a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h3a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"
      />
    </g>
  </svg>
);

export const Feedback = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="17"
    viewBox="0 0 20 17"
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <path
        style={fillNone}
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 10l3 5"
      />
      <path
        style={fillNone}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 2.732c-2 0-3 1.567-3 3.5s1.067 3.5 3 3.5c.542 0 3.284.66 8.226 1.98A3 3 0 0 0 15 8.813V3A3 3 0 0 0 10.995.173C6.198 1.88 3.533 2.732 3 2.732z"
      />
      <rect
        style={strokeNone}
        width="2"
        height="4"
        x="17"
        y="4"
        fillOpacity="0.4"
        rx="1"
      />
    </g>
  </svg>
);

export const Notifications = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g fill="none" fillRule="evenodd">
      <path
        style={strokeNone}
        fillOpacity="0.4"
        d="M8 16h2a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2z"
      />
      <path
        style={fillNone}
        strokeOpacity="0.4"
        strokeWidth="2"
        d="M9 1a6 6 0 0 0-6 6v2.303L1.941 10.89A2 2 0 0 0 3.606 14h10.788a2 2 0 0 0 1.665-3.11L15 9.304V7a6 6 0 0 0-6-6z"
      />
    </g>
  </svg>
);

export const ExpandIcon = () => (
  <span className="ExpandIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
    >
      <path
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  </span>
);

export const ExpandIconRestyled = () => (
  <span className="ExpandIcon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 10 6"
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1l4 4 4-4"
      />
    </svg>
  </span>
);

export const SidebarExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
        .svg-sidebar-expand-cls-1 {
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 8px;
        }
      `}</style>
    </defs>
    <polyline
      className="svg-sidebar-expand-cls-1"
      points="49.52 42.14 62.48 56 49.7 69.86"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z" />
    <path d="M0,0h24v24H0V0z" fill="none" />
  </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 36 36"
  >
    <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
  </svg>
);
