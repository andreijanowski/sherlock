const fillNone = { fill: "none" };
const strokeNone = { stroke: "none" };

export const Orders = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="18"
    viewBox="0 0 14 18"
  >
    <g fillRule="evenodd" fillOpacity="0.4">
      <path
        style={strokeNone}
        d="M11.663 9.75v6.375c0 .28.267.375.389.375a.382.382 0 0 0 .39-.375s.006-12.58 0-14.449c-.726.811-1.989 3.897-2.593 8.074h1.814zm.39 8.25c-.936 0-1.946-.717-1.946-1.875v-4.876h-1.98C8.235 8.206 10.028 0 12.592 0c.783 0 1.4.608 1.405 1.384.008 1.01 0 14.741 0 14.741 0 1.034-.872 1.875-1.944 1.875zM5.948 0c.221 1.066.855 4.073 1.057 5.86.183 1.631-.803 2.33-1.365 2.729a.47.47 0 0 0-.196.364v7.154C5.444 17.146 4.671 18 3.54 18c-1.222 0-1.984-.85-1.984-1.893 0-.978 0-5.997-.003-7.193 0-.141-.092-.274-.206-.362-.539-.39-1.49-1.1-1.33-2.662C.204 4.094.819 1.085 1.037 0h4.912zM4.8 1.5h-.392l.026 3.75h-.65L3.69 1.5h-.408l-.108 3.75h-.635V1.5h-.37s-.438 2.952-.602 4.537c-.09.875.45 1.102.901 1.452.611.472.644.899.644 1.33v7.21c0 .212.06.471.384.471s.394-.246.394-.47V8.823c0-.439.058-.859.673-1.328.462-.353.998-.564.896-1.473C5.278 4.432 4.8 1.5 4.8 1.5z"
      />
    </g>
  </svg>
);

export const Time = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g fillRule="nonzero">
      <path
        style={strokeNone}
        d="M13.74 6.833a.263.263 0 0 0-.346-.005l-2.58 2.177a1.496 1.496 0 0 0-1.301 2.582 1.5 1.5 0 0 0 2.118-.12c.369-.412.461-.97.301-1.462l1.852-2.828a.265.265 0 0 0-.045-.344zM9 2.02V1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.02a8.383 8.383 0 0 0-3 0zm9 8.48a7.5 7.5 0 0 1-7.5 7.5 7.448 7.448 0 0 1-5.333-2.25h2.46c.853.473 1.829.75 2.873.75 3.308 0 6-2.692 6-6s-2.692-6-6-6c-1.044 0-2.02.277-2.873.75h-2.46A7.448 7.448 0 0 1 10.5 3a7.5 7.5 0 0 1 7.5 7.5z"
      />
      <path
        style={strokeNone}
        fillOpacity="0.4"
        d="M2.25 6.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5zM.75 9.75h4.5a.75.75 0 1 1 0 1.5H.75a.75.75 0 1 1 0-1.5zM3 12.75h3.75a.75.75 0 1 1 0 1.5H3a.75.75 0 1 1 0-1.5z"
      />
    </g>
  </svg>
);

export const Menu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="12"
    viewBox="0 0 14 12"
  >
    <g fillRule="evenodd">
      <rect width="14" height="2" style={strokeNone} fillOpacity="0.4" rx="1" />
      <rect width="14" height="2" style={strokeNone} y="5" rx="1" />
      <rect
        width="14"
        height="2"
        style={strokeNone}
        y="10"
        fillOpacity="0.4"
        rx="1"
      />
    </g>
  </svg>
);

export const Clock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g fillRule="evenodd" strokeWidth="2" transform="translate(1 1)">
      <circle cx="8" cy="8" r="8" style={fillNone} strokeOpacity="0.4" />
      <path
        strokeLinecap="round"
        style={fillNone}
        d="M8.348 3.087v5.26H5.174"
      />
    </g>
  </svg>
);

export const Location = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g fillRule="nonzero">
      <circle cx="9" cy="9" r="2" style={strokeNone} />
      <path
        fillOpacity="0.4"
        style={strokeNone}
        d="M16.282 8.182c-.41-3.437-3.11-6.137-6.464-6.464v-.9a.818.818 0 1 0-1.636 0v.9a7.159 7.159 0 0 0-6.464 6.464h-.9a.818.818 0 1 0 0 1.636h.9c.41 3.437 3.11 6.137 6.464 6.464v.9a.818.818 0 0 0 1.636 0v-.9c3.437-.41 6.137-3.11 6.464-6.464h.9a.818.818 0 0 0 0-1.636h-.9zM9 14.727A5.692 5.692 0 0 1 3.273 9 5.692 5.692 0 0 1 9 3.273 5.692 5.692 0 0 1 14.727 9 5.692 5.692 0 0 1 9 14.727z"
      />
    </g>
  </svg>
);

export const Pause = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="10"
    viewBox="0 0 7 10"
  >
    <g fillRule="evenodd">
      <rect width="2" height="10" rx="1" />
      <rect width="2" height="10" x="5" rx="1" />
    </g>
  </svg>
);
