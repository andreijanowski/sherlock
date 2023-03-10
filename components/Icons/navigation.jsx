const fillNone = { fill: "none" };
const strokeNone = { stroke: "none" };

export const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
       .svg-hamburger-cls-1 {
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 5px;
        }
      `}</style>
    </defs>
    <line
      className="svg-hamburger-cls-1 primary"
      x1="40.81"
      y1="42.48"
      x2="71.19"
      y2="42.48"
    />
    <line
      className="svg-hamburger-cls-1 primary"
      x1="40.81"
      y1="56"
      x2="71.19"
      y2="56"
    />
    <line
      className="svg-hamburger-cls-1 primary"
      x1="40.81"
      y1="69.52"
      x2="71.19"
      y2="69.52"
    />
  </svg>
);

export const LiveStream = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-livestream-cls-1 {
        fill: none;
        stroke: #aaacaf;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 5px;
        fill-rule: evenodd;
      }

      .svg-livestream-cls-2 {
        fill: currentColor;
      }
      `}</style>
    </defs>
    <path
      className="svg-livestream-cls-1 primary"
      d="M35.53,75.94a27.64,27.64,0,0,1,0-39.88"
    />
    <path
      className="svg-livestream-cls-1 primary"
      d="M76.47,36.06a27.64,27.64,0,0,1,0,39.88"
    />
    <path
      className="svg-livestream-cls-1 primary"
      d="M68.42,43.91a16.77,16.77,0,0,1,0,24.18"
    />
    <path
      className="svg-livestream-cls-1 primary"
      d="M43.58,68.09a16.77,16.77,0,0,1,0-24.18"
    />
    <path
      className="svg-livestream-cls-2 secondary"
      d="M56,53.36A2.64,2.64,0,1,1,53.29,56,2.67,2.67,0,0,1,56,53.36Zm0-5.22A7.86,7.86,0,1,0,64.07,56,8,8,0,0,0,56,48.14Z"
    />
  </svg>
);

export const BackArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="10"
    viewBox="0 0 22 10"
  >
    <g
      transform="translate(-14 -25)translate(15 26)"
      strokeWidth="1"
      fillRule="evenodd"
    >
      <rect x="1" y="3" width="20" height="2" rx="1" />
      <polyline
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 4)rotate(-270)translate(-2 -4)"
        points="-2 2 2 6 6 2"
      />
    </g>
  </svg>
);

export const ControlCenter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
        .svg-control-center-cls-1 {
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 4px;
        }
      `}</style>
    </defs>
    <path
      className="svg-control-center-cls-1 primary"
      d="M43.36,37.76c-2,0-2.78.15-3.56.57a3.48,3.48,0,0,0-1.47,1.47c-.42.78-.57,1.56-.57,3.56v3c0,2,.15,2.79.57,3.57a3.51,3.51,0,0,0,1.47,1.46,6.83,6.83,0,0,0,3.56.58h3a6.88,6.88,0,0,0,3.57-.58,3.54,3.54,0,0,0,1.46-1.46A6.88,6.88,0,0,0,52,46.34v-3a6.83,6.83,0,0,0-.58-3.56,3.51,3.51,0,0,0-1.46-1.47c-.78-.42-1.57-.57-3.57-.57Z"
    />
    <path
      className="svg-control-center-cls-1 primary"
      d="M65.66,37.76c-2,0-2.79.15-3.57.57a3.51,3.51,0,0,0-1.46,1.47,6.83,6.83,0,0,0-.58,3.56v3a6.88,6.88,0,0,0,.58,3.57,3.54,3.54,0,0,0,1.46,1.46,6.88,6.88,0,0,0,3.57.58h3a6.83,6.83,0,0,0,3.56-.58,3.51,3.51,0,0,0,1.47-1.46c.42-.78.57-1.57.57-3.57v-3c0-2-.15-2.78-.57-3.56a3.48,3.48,0,0,0-1.47-1.47c-.78-.42-1.56-.57-3.56-.57Z"
    />
    <path
      className="svg-control-center-cls-1 primary"
      d="M65.66,60.05a6.88,6.88,0,0,0-3.57.58,3.54,3.54,0,0,0-1.46,1.46,6.88,6.88,0,0,0-.58,3.57v3a6.83,6.83,0,0,0,.58,3.56,3.51,3.51,0,0,0,1.46,1.47c.78.42,1.57.57,3.57.57h3c2,0,2.78-.15,3.56-.57a3.48,3.48,0,0,0,1.47-1.47c.42-.78.57-1.56.57-3.56v-3c0-2-.15-2.79-.57-3.57a3.51,3.51,0,0,0-1.47-1.46,6.83,6.83,0,0,0-3.56-.58Z"
    />
    <path
      className="svg-control-center-cls-1 primary"
      d="M43.36,60.05a6.83,6.83,0,0,0-3.56.58,3.51,3.51,0,0,0-1.47,1.46c-.42.78-.57,1.57-.57,3.57v3c0,2,.15,2.78.57,3.56a3.48,3.48,0,0,0,1.47,1.47c.78.42,1.56.57,3.56.57h3c2,0,2.79-.15,3.57-.57a3.51,3.51,0,0,0,1.46-1.47A6.83,6.83,0,0,0,52,68.64v-3a6.88,6.88,0,0,0-.58-3.57,3.54,3.54,0,0,0-1.46-1.46,6.88,6.88,0,0,0-3.57-.58Z"
    />
  </svg>
);

export const Reservations = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
  >
    <g fillRule="evenodd">
      <path
        style={fillNone}
        strokeWidth="2"
        strokeOpacity=".4"
        d="M7.692 2c-2.288 0-3.204.177-4.15.683a4.452 4.452 0 0 0-1.859 1.858C1.177 5.488 1 6.404 1 8.691v4.617c0 2.288.177 3.204.683 4.15a4.452 4.452 0 0 0 1.858 1.859c.947.506 1.863.683 4.15.683h4.617c2.288 0 3.204-.177 4.15-.683a4.452 4.452 0 0 0 1.859-1.858c.506-.947.683-1.863.683-4.15V8.691c0-2.288-.177-3.204-.683-4.15a4.452 4.452 0 0 0-1.858-1.859C15.512 2.177 14.596 2 12.309 2H7.691z"
      />
      <path
        style={strokeNone}
        fillOpacity="0.4"
        d="M5.282 7h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H5.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77V8.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134z"
      />
      <path
        style={strokeNone}
        d="M7.282 13h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134zM11.282 7h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77V8.282c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134z"
      />
      <path
        style={strokeNone}
        fillOpacity="0.4"
        d="M13.282 13h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 0 1-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 0 1-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 0 1 .378-.378c.163-.088.324-.134.77-.134z"
      />
      <path
        style={strokeNone}
        d="M7 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zM13 0a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"
      />
    </g>
  </svg>
);

export const Delivery = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-delivery-cls-1,
      .svg-delivery-cls-2,
      .svg-delivery-cls-3 {
        fill: none;
        stroke-width: 4px;
      }

      .svg-delivery-cls-1 {
        stroke: currentColor;
      }

      .svg-delivery-cls-1,
      .svg-delivery-cls-3 {
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-delivery-cls-2,
      .svg-delivery-cls-3 {
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path className="svg-delivery-cls-1 secondary" d="M48.14,41l16,8" />
    <path
      className="svg-delivery-cls-2 primary"
      d="M57,36.69a2,2,0,0,0-1.77,0l-16,8a2,2,0,0,0-1.11,1.79V65.53a2,2,0,0,0,1.09,1.8l16,8a2,2,0,0,0,1.79,0l16-8a2,2,0,0,0,1.11-1.79V46.48A2,2,0,0,0,73,44.69Z"
    />
    <polyline
      className="svg-delivery-cls-3 primary"
      points="38.78 46.32 56.14 54 73.5 46.32"
    />
    <path className="svg-delivery-cls-3 primary" d="M56.14,75.52V54" />
  </svg>
);

export const Catering = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-catering-cls-1,
      .svg-catering-cls-4 {
        fill: none;
        stroke: currentColor;
        stroke-width: 4px;
      }

      .svg-catering-cls-2,
      .svg-catering-cls-3 {
        fill: currentColor;
      }

      .svg-catering-cls-2 {
        fill-rule: evenodd;
      }
      `}</style>
    </defs>
    <path
      className="svg-catering-cls-1 secondary"
      d="M40,67H72c0-7.76-2-20-16-20S40,59.25,40,67Z"
    />
    <path
      className="svg-catering-cls-2 primary"
      d="M38,65H74a2,2,0,0,1,2,2h0a2,2,0,0,1-2,2H38a2,2,0,0,1-2-2h0A2,2,0,0,1,38,65Z"
    />
    <circle
      className="svg-catering-cls-3 primary"
      cx="56.02"
      cy="47.02"
      r="4"
    />
    <circle
      className="svg-catering-cls-4 secondary"
      cx="56.02"
      cy="47.02"
      r="4"
    />
  </svg>
);

export const Privatisations = () => (
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
        d="M3 1h16a2 2 0 0 1 2 2v6c0 5.523-4.477 10-10 10A10 10 0 0 1 1 9V3a2 2 0 0 1 2-2z"
      />
      <path style={fillNone} d="M7 8l4 4 4-4" />
    </g>
  </svg>
);

export const SocialMedia = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="21"
    viewBox="0 0 18 21"
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        style={fillNone}
        strokeOpacity="0.4"
        d="M10.604 14.016l1.57.239a1.039 1.039 0 0 1 .583 1.757l-1.16 1.173.265 1.606a1.039 1.039 0 0 1-1.522 1.081L9 19.142l-1.34.73a1.039 1.039 0 0 1-1.522-1.08l.266-1.607-1.161-1.173a1.039 1.039 0 0 1 .582-1.757l1.57-.239.667-1.401a1.039 1 0 0 1 1.876 0l.666 1.401z"
      />
      <path
        style={fillNone}
        strokeWidth="2"
        d="M11.808 5.277l3.179.448a1.5 1.5 0 0 1 .817 2.579l-2.26 2.122.545 3.065a1.5 1.5 0 0 1-2.155 1.6L9 13.604l-2.934 1.487a1.5 1.5 0 0 1-2.155-1.6l.545-3.065-2.26-2.122a1.5 1.5 0 0 1 .817-2.58l3.179-.447L7.665 2.4a1.5 1.5 0 0 1 2.67 0l1.473 2.876z"
      />
    </g>
  </svg>
);

export const Billing = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="16"
    viewBox="0 0 20 16"
  >
    <g fill="none" fillRule="evenodd" stroke="#2A2F38" strokeWidth="2">
      <path
        style={fillNone}
        strokeOpacity=".4"
        d="M7.141 1c-1.736 0-2.7.202-3.6.683a4.452 4.452 0 0 0-1.858 1.858c-.48.9-.683 1.864-.683 3.6V8.86c0 1.736.202 2.7.683 3.6a4.452 4.452 0 0 0 1.858 1.858c.9.48 1.864.683 3.6.683h5.718c1.736 0 2.7-.202 3.6-.683a4.452 4.452 0 0 0 1.858-1.858c.48-.9.683-1.864.683-3.6V7.14c0-1.736-.202-2.7-.683-3.6a4.452 4.452 0 0 0-1.858-1.858c-.9-.48-1.864-.683-3.6-.683H7.14z"
      />
      <path strokeLinecap="round" style={fillNone} d="M6 6h8M6 10.5h2" />
    </g>
  </svg>
);

export const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <g
      fill="none"
      fillRule="evenodd"
      strokeWidth="2"
      transform="translate(1 2)"
    >
      <path
        style={fillNone}
        strokeOpacity="0.4"
        strokeLinecap="round"
        d="M16 15c0-2.33-.993-6-7.997-6C1 9 0 12.667 0 15"
      />
      <circle cx="8" cy="2" r="3" style={fillNone} />
    </g>
  </svg>
);

export const ProfileBasicInfo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
  >
    <g
      strokeWidth="2"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.6 7.7C17.6 7.9 17.7 8.1 17.7 8.3L17.7 17C17.7 19.2 15.9 21 13.7 21L5 21C2.8 21 1 19.2 1 17L1 8.3C1 6.1 2.8 4.3 5 4.3L13.7 4.3C13.9 4.3 14.1 4.4 14.3 4.4" />
      <circle cx="16.7" cy="3.3" r="3.3" strokeOpacity="0.4" />
    </g>
  </svg>
);

export const ProfileContact = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="22"
    viewBox="0 0 17 22"
  >
    <g
      strokeWidth="2"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={fillNone}
    >
      <path d="M13 5L15.7 5 15.7 21 3.7 21C2.2 21 1 19.8 1 18.3L1 3" />
      <path
        d="M15.7 5L3 5C1.9 5 1 4.1 1 3 1 1.9 1.9 1 3 1L14.3 1"
        strokeOpacity="0.4"
        style={fillNone}
      />
    </g>
  </svg>
);

export const ProfileOpeningHours = () => (
  <svg
    width="15px"
    height="22px"
    viewBox="0 0 15 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      strokeWidth="1"
      fillRule="evenodd"
      transform="translate(1.000000, 1.000000)"
    >
      <path
        d="M11.2903226,19.6774194 L11.2903226,15.3267742 C11.2904008,13.8555928 10.5738736,12.4765818 9.37,11.6309677 L7.58709677,10.3790323 C7.50105835,10.3186417 7.44984082,10.2201172 7.44984082,10.115 C7.44984082,10.0098828 7.50105835,9.91135826 7.58709677,9.85096774 L9.36967742,8.59903226 C10.5736733,7.75348925 11.290327,6.37446644 11.2903226,4.90322581 L11.2903226,0.322580645 M0.967741935,0.322580645 L0.967741935,4.90322581 C0.96773751,6.37446644 1.68439124,7.75348925 2.8883871,8.59903226 L4.67096774,9.85096774 C4.75700617,9.91135826 4.8082237,10.0098828 4.8082237,10.115 C4.8082237,10.2201172 4.75700617,10.3186417 4.67096774,10.3790323 L2.8883871,11.6309677 C1.68439124,12.4765108 0.96773751,13.8555336 0.967741935,15.3267742 L0.967741935,19.6774194 M0,19.6774194 L12.2580645,19.6774194 M7.10542736e-15,0.322580645 L12.2580645,0.322580645"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={fillNone}
      />
      <rect
        strokeOpacity="0.4"
        x="3"
        y="16"
        width="6.5"
        height="2"
        rx="1"
        style={fillNone}
      />
      <rect
        strokeOpacity="0.4"
        x="5"
        y="13"
        width="2.5"
        height="2"
        rx="1"
        style={fillNone}
      />
      <path d="M0,19.6774194 L12.2580645,19.6774194" style={fillNone} />
    </g>
  </svg>
);

export const ProfilePicturesAndMenus = () => (
  <svg
    width="22px"
    height="17px"
    viewBox="0 0 22 17"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
      strokeWidth="2"
    >
      <path d="M19,2.22222222 L14.8333333,2.22222222 L12.6666667,-5.5067062e-14 L7.33333333,-5.5067062e-14 L5.16666667,2.22222222 L1,2.22222222 C0.44771525,2.22222222 0,2.66993747 0,3.22222222 L0,13.4444444 C1.97372982e-15,13.9967292 0.44771525,14.4444444 1,14.4444444 L19,14.4444444 C19.5522847,14.4444444 20,13.9967292 20,13.4444444 L20,3.22222222 C20,2.66993747 19.5522847,2.22222222 19,2.22222222 L19,2.22222222 Z" />
      <circle
        strokeOpacity="0.4"
        cx="9.83333333"
        cy="7.83333333"
        r="2.83333333"
      />
    </g>
  </svg>
);

export const ProfileAdditionaInfo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
  >
    <g
      strokeWidth="2"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M10.5 18L1 18 1 4.7 18.3 4.7 18.3 12M2.3 3.7L2.3 1 17 1 17 3.7"
        style={fillNone}
      />
      <path
        d="M15.7 14L15.7 19.3M13 16.7L18.3 16.7"
        strokeOpacity="0.4"
        style={fillNone}
      />
    </g>
  </svg>
);

export const ProfileMembers = () => (
  <svg
    width="20px"
    height="19px"
    viewBox="0 0 20 19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
      strokeWidth="2"
    >
      <path
        d="M10.0666667,1 C10.611728,0.555659624 11.2969098,0.319390022 12,0.333333333 C13.3333333,0.333333333 15,1.13333333 15,3.2 L15,5.13333333 C14.9930293,6.2371942 14.5063911,7.28346646 13.6666667,8 L13.6666667,8.63333333 C13.6666667,9.03333333 13.6333333,9.73333333 15.6333333,10.1333333 C17.6333333,10.5333333 18,12.3333333 18,12.3333333 L18,13.6666667 L14.6666667,13.6666667"
        strokeOpacity="0.4"
        style={fillNone}
      />
      <path
        d="M11.8,12.3 C9.3,11.9666667 9.33333333,11.0666667 9.33333333,10.6 L9.33333333,9.83333333 C10.2333333,9.03333333 10.6666667,7.7 10.6666667,6.2 L10.6666667,3.86666667 C10.6666667,1.33333333 8.96666667,0.333333333 7.33333333,0.333333333 C5.7,0.333333333 4,1.33333333 4,3.86666667 L4,6.2 C4,7.7 4.43333333,9.06666667 5.33333333,9.86666667 L5.33333333,10.6666667 C5.33333333,11.1666667 5.36666667,11.9666667 2.86666667,12.3 C0.366666667,12.6333333 0,15 0,15 L0,16.3333333 L14.6666667,16.3333333 L14.6666667,15 C14.6666667,15 14.6666667,12.7333333 11.8,12.3 Z"
        style={fillNone}
      />
    </g>
  </svg>
);

export const Subscriptions = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="-16 -15 54 50"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path
        stroke="currentColor"
        className="secondary"
        d="M18.49 13a9 9 0 1 1-2.12-9.36L21 9"
      />
      <path stroke="currentColor" className="primary" d="M21 3v6h-6" />
    </g>
  </svg>
);

export const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="-16 -16 54 54"
  >
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <circle
        cx="10"
        cy="10"
        r="2.727"
        stroke="currentColor"
        className="primary"
      />
      <path
        stroke="currentColor"
        className="secondary"
        d="M16.727 12.727a1.5 1.5 0 0 0 .3 1.655l.055.054a1.818 1.818 0 1 1-2.573 2.573l-.054-.054a1.5 1.5 0 0 0-1.655-.3 1.5 1.5 0 0 0-.91 1.372v.155a1.818 1.818 0 1 1-3.635 0V18.1a1.5 1.5 0 0 0-.982-1.373 1.5 1.5 0 0 0-1.655.3l-.054.055a1.818 1.818 0 1 1-2.573-2.573l.054-.054a1.5 1.5 0 0 0 .3-1.655 1.5 1.5 0 0 0-1.372-.91h-.155a1.818 1.818 0 1 1 0-3.635H1.9a1.5 1.5 0 0 0 1.373-.982 1.5 1.5 0 0 0-.3-1.655l-.055-.054A1.818 1.818 0 1 1 5.491 2.99l.054.054a1.5 1.5 0 0 0 1.655.3h.073a1.5 1.5 0 0 0 .909-1.372v-.155a1.818 1.818 0 0 1 3.636 0V1.9a1.5 1.5 0 0 0 .91 1.373 1.5 1.5 0 0 0 1.654-.3l.054-.055a1.818 1.818 0 1 1 2.573 2.573l-.054.054a1.5 1.5 0 0 0-.3 1.655v.073a1.5 1.5 0 0 0 1.372.909h.155a1.818 1.818 0 1 1 0 3.636H18.1a1.5 1.5 0 0 0-1.373.91z"
      />
    </g>
  </svg>
);

export const SettingsBasicInfo = () => (
  <svg
    width="19px"
    height="22px"
    viewBox="0 0 19 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
      strokeWidth="2"
    >
      <circle strokeOpacity="0.4" cx="8.33499364" cy="5" r="5" />
      <path d="M8.33499364,10 C6.08806085,10.0218052 3.94313726,10.94118 2.37789317,12.5533814 C0.812649087,14.1655828 -0.0429413066,16.3367374 0.00166030816,18.5833333 L0.00166030816,20 L16.668327,20 L16.668327,18.5833333 C16.7129286,16.3367374 15.8573382,14.1655828 14.2920941,12.5533814 C12.72685,10.94118 10.5819264,10.0218052 8.33499364,10 Z" />
    </g>
  </svg>
);

export const SettingsPassword = () => (
  <svg
    width="17px"
    height="22px"
    viewBox="0 0 17 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      strokeWidth="2"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
    >
      <path d="M3,9.33333333 L3,4.33333333 C3,1.94009942 4.94009942,2.22044605e-15 7.33333333,1.77635684e-15 C9.72656725,1.77635684e-15 11.6666667,1.94009942 11.6666667,4.33333333 L11.6666667,9.33333333" />
      <polygon points="0 9.33333333 14.6666667 9.33333333 14.6666667 20 0 20" />
      <path
        d="M7.33333333,13 L7.33333333,16.3333333 L7.33333333,13 Z"
        strokeOpacity="0.4"
      />
    </g>
  </svg>
);

export const SettingsLogout = () => (
  <svg
    width="22px"
    height="22px"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      strokeWidth="2"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1.000000, 1.000000)"
    >
      <polyline
        strokeOpacity="0.4"
        points="13.338 12.0003333 16.0046667 9.33333333 13.338 6.663"
      />
      <path
        d="M16.0046667,9.33 L6.66666667,9.33 C5.56209717,9.33 4.66666667,10.2254305 4.66666667,11.33 C4.66703462,12.4344171 5.56224961,13.329632 6.66666667,13.33"
        strokeOpacity="0.4"
      />
      <circle cx="10" cy="10" r="10" />
    </g>
  </svg>
);

export const Integrations = () => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter
        id="prefix__a"
        width="156.2%"
        height="156.2%"
        x="-28.1%"
        y="-21.9%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="3" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="4"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0.298039216 0 0 0 0 0.407843137 0 0 0 0 1 0 0 0 0.48 0"
        />
      </filter>
      <circle id="prefix__b" cx="24" cy="24" r="24" />
    </defs>
    <g stroke="#FFF" strokeWidth="2">
      <path
        style={fillNone}
        strokeOpacity=".4"
        d="M4.5 10C2.567 10 1 11.567 1 13.5S2.567 17 4.5 17 8 15.433 8 13.5 6.433 10 4.5 10zM10.5 1C8.567 1 7 2.567 7 4.5S8.567 8 10.5 8 14 6.433 14 4.5 12.433 1 10.5 1z"
      />
      <path
        style={fillNone}
        d="M15.5 10c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5z"
      />
    </g>
  </svg>
);

export const Wholesalers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-wholesalers-cls-1,
      .svg-wholesalers-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-wholesalers-cls-1 {
        stroke: currentColor;
        stroke-width: 3px;
      }

      .svg-wholesalers-cls-2 {
        stroke: currentColor;
        stroke-width: 4px;
      }
      `}</style>
    </defs>
    <path className="svg-wholesalers-cls-1 secondary" d="M75.8,53.71H61.74" />
    <path
      className="svg-wholesalers-cls-2 primary"
      d="M66.48,64.05H61.74m0-17.24H72l3.8,6.9h3.36c.69,0,1.55.17,1.55,1.2v9.14H74.24"
    />
    <polyline
      className="svg-wholesalers-cls-2 primary"
      points="35.45 64.05 30.71 64.05 30.71 39.91 61.74 39.91 61.74 64.05 43.21 64.05"
    />
    <circle
      className="svg-wholesalers-cls-2 primary"
      cx="39.33"
      cy="67.5"
      r="5.17"
    />
    <circle
      className="svg-wholesalers-cls-2 primary"
      cx="70.36"
      cy="67.5"
      r="5.17"
    />
  </svg>
);

export const Restaurant = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
        .svg-restaurant-cls-1,
        .svg-restaurant-cls-2 {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .svg-restaurant-cls-1 {
          stroke: currentColor;
          stroke-width: 4px;
        }

        .svg-restaurant-cls-2 {
          stroke: currentColor;
          stroke-width: 3px;
        }
      `}</style>
    </defs>
    <polyline
      className="svg-restaurant-cls-1 primary"
      points="72.07 55.41 72.07 74.07 40.07 74.07 40.07 55.41"
    />
    <path
      className="svg-restaurant-cls-2 secondary"
      d="M56.07,39.41v0Zm-10,11,3.33-11Zm20,0-3.33-11Z"
    />
    <path
      className="svg-restaurant-cls-1 primary"
      d="M69.8,39.41H42.34l-6.27,11a5,5,0,0,0,10,0,5,5,0,0,0,10,0,5,5,0,0,0,10,0,5,5,0,0,0,10,0Z"
    />
  </svg>
);

export const Dashboard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-dashboard-cls-1,
      .svg-dashboard-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4px;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      className="svg-dashboard-cls-1 primary"
      d="M52.33,39.33A17.34,17.34,0,1,0,69.67,56.67H52.33Z"
    />
    <path
      className="svg-dashboard-cls-2 secondary"
      d="M59.67,32V49.33H77A17.34,17.34,0,0,0,59.67,32Z"
    />
  </svg>
);

export const IntegrationHub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-integration-hub-cls-1,
      .svg-integration-hub-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 3.5px;
      }

      .svg-integration-hub-cls-1,
      .svg-integration-hub-cls-2,
      .svg-integration-hub-cls-3,
      .svg-integration-hub-cls-4
      {
        stroke: currentColor;
      }

      .svg-integration-hub-cls-3, .svg-integration-hub-cls-4 {
        fill: currentColor;
      }
      `}</style>
    </defs>
    <path
      className="svg-integration-hub-cls-1 primary"
      d="M42.78,32.81V47.66a8.08,8.08,0,0,0,1.73,5L55,66"
    />
    <path
      className="svg-integration-hub-cls-1 primary"
      d="M67.08,39.13l0,22.23a4.26,4.26,0,0,1-1.68,3.38L55.15,73.43"
    />
    <path
      className="svg-integration-hub-cls-2 secondary"
      d="M67.08,32.81V44.73a4.24,4.24,0,0,1-1.69,3.39L55.05,56"
    />
    <line
      className="svg-integration-hub-cls-2 secondary"
      x1="54.97"
      y1="32.81"
      x2="54.97"
      y2="87.14"
    />
    <ellipse
      className="svg-integration-hub-cls-3 primary"
      cx="42.82"
      cy="30.25"
      rx="3.43"
      ry="3.39"
    />
    <ellipse
      className="svg-integration-hub-cls-4 secondary"
      cx="54.95"
      cy="30.25"
      rx="3.43"
      ry="3.39"
    />
    <ellipse
      className="svg-integration-hub-cls-4 secondary"
      cx="67.18"
      cy="30.25"
      rx="3.43"
      ry="3.39"
    />
  </svg>
);

export const MenuManagement = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="-14 -11 56 44"
  >
    <defs>
      <style>{`
      .svg-menu-management-cls {
        fill: none;
        stroke-linecap: round;
        stroke-width: 2.06372;
        stroke: currentColor;
      }
    `}</style>
    </defs>
    <path
      d="M10.1889 2C7.87497 2 6.58794 2.25714 5.38761 2.87429C4.32963 3.41223 3.46495 4.2458 2.90692 5.26571C2.24007 6.42286 2 7.66357 2 9.89428V12.0993C2 14.3364 2.26674 15.5771 2.90692 16.7279C3.46495 17.7478 4.32963 18.5813 5.38761 19.1193C6.58794 19.7621 7.87497 20 10.1889 20H17.8044C20.1184 20 21.4054 19.7364 22.6057 19.1193C23.6637 18.5813 24.5284 17.7478 25.0864 16.7279C25.7533 15.5771 26 14.3364 26 12.0993V9.89428C26 7.66357 25.7266 6.42286 25.0864 5.26571C24.5284 4.2458 23.6637 3.41223 22.6057 2.87429C21.4054 2.23143 20.1184 2 17.8044 2H10.1889Z"
      className="svg-menu-management-cls primary"
    />
    <path
      d="M8.66846 8.42822H19.3381"
      className="svg-menu-management-cls secondary"
    />
    <path
      d="M8.66846 14.2144H11.3359"
      className="svg-menu-management-cls secondary"
    />
  </svg>
);

export const Payments = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-payments-cls-1 {
        fill: none;
        stroke: currentColor;
        stroke-width: 4px;
      }
      .svg-payments-cls-1,
      .svg-payments-cls-2,
      .svg-payments-cls-3 {
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .svg-payments-cls-2,
      .svg-payments-cls-3 {
        fill: currentColor;
        stroke: currentColor;
      }
      .svg-payments-cls-2 {
        stroke-width: 3px;
      }
      .svg-payments-cls-3 {
        stroke-width: 2px;
      }
    `}</style>
    </defs>
    <rect
      className="svg-payments-cls-1 primary"
      x="32.49"
      y="39.47"
      width="47.02"
      height="33.06"
      rx="5.39"
    />
    <rect
      className="svg-payments-cls-2 secondary"
      x="38.46"
      y="53.97"
      width="3.91"
      height="4.09"
    />
    <line
      className="svg-payments-cls-2 secondary"
      x1="39.36"
      y1="65.09"
      x2="54.95"
      y2="65.09"
    />
    <line
      className="svg-payments-cls-2 secondary"
      x1="62.3"
      y1="65.09"
      x2="71.96"
      y2="65.09"
    />
    <circle
      className="svg-payments-cls-3 secondary"
      cx="71.27"
      cy="47.61"
      r="1.87"
    />
  </svg>
);

export const Bookings = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-bookings-cls-1 {
        fill: none;
        stroke: currentColor;
        stroke-width: 4px;
      }

      .svg-bookings-cls-2,
      .svg-bookings-cls-3 {
        fill: currentColor;
      }
    `}</style>
    </defs>
    <path
      className="svg-bookings-cls-1 secondary"
      d="M51.38,38c-4.57,0-6.4.35-8.3,1.37a9,9,0,0,0-3.71,3.71c-1,1.9-1.37,3.73-1.37,8.3v9.24c0,4.57.35,6.4,1.37,8.3a9,9,0,0,0,3.71,3.71c1.9,1,3.73,1.37,8.3,1.37h9.24c4.57,0,6.4-.35,8.3-1.37a9,9,0,0,0,3.71-3.71c1-1.9,1.37-3.73,1.37-8.3V51.38c0-4.57-.35-6.4-1.37-8.3a9,9,0,0,0-3.71-3.71c-1.9-1-3.73-1.37-8.3-1.37Z"
    />
    <path
      className="svg-bookings-cls-2 secondary"
      d="M46.56,48h2.88a2.85,2.85,0,0,1,1.54.27,1.81,1.81,0,0,1,.75.75A2.85,2.85,0,0,1,52,50.56v2.88A2.85,2.85,0,0,1,51.73,55a1.81,1.81,0,0,1-.75.75,2.85,2.85,0,0,1-1.54.27H46.56A2.85,2.85,0,0,1,45,55.73a1.81,1.81,0,0,1-.75-.75A2.85,2.85,0,0,1,44,53.44V50.56A2.85,2.85,0,0,1,44.27,49a1.81,1.81,0,0,1,.75-.75A2.85,2.85,0,0,1,46.56,48Z"
    />
    <path
      className="svg-bookings-cls-3 primary"
      d="M50.56,60h2.88a2.85,2.85,0,0,1,1.54.27,1.81,1.81,0,0,1,.75.75A2.85,2.85,0,0,1,56,62.56v2.88A2.85,2.85,0,0,1,55.73,67a1.81,1.81,0,0,1-.75.75,2.85,2.85,0,0,1-1.54.27H50.56A2.85,2.85,0,0,1,49,67.73a1.81,1.81,0,0,1-.75-.75A2.85,2.85,0,0,1,48,65.44V62.56A2.85,2.85,0,0,1,48.27,61a1.81,1.81,0,0,1,.75-.75A2.85,2.85,0,0,1,50.56,60Z"
    />
    <path
      className="svg-bookings-cls-3 primary"
      d="M58.56,48h2.88a2.85,2.85,0,0,1,1.54.27,1.81,1.81,0,0,1,.75.75A2.85,2.85,0,0,1,64,50.56v2.88A2.85,2.85,0,0,1,63.73,55a1.81,1.81,0,0,1-.75.75,2.85,2.85,0,0,1-1.54.27H58.56A2.85,2.85,0,0,1,57,55.73a1.81,1.81,0,0,1-.75-.75A2.85,2.85,0,0,1,56,53.44V50.56A2.85,2.85,0,0,1,56.27,49a1.81,1.81,0,0,1,.75-.75A2.85,2.85,0,0,1,58.56,48Z"
    />
    <path
      className="svg-bookings-cls-2 secondary"
      d="M62.56,60h2.88a2.85,2.85,0,0,1,1.54.27,1.81,1.81,0,0,1,.75.75A2.85,2.85,0,0,1,68,62.56v2.88A2.85,2.85,0,0,1,67.73,67a1.81,1.81,0,0,1-.75.75,2.85,2.85,0,0,1-1.54.27H62.56A2.85,2.85,0,0,1,61,67.73a1.81,1.81,0,0,1-.75-.75A2.85,2.85,0,0,1,60,65.44V62.56A2.85,2.85,0,0,1,60.27,61a1.81,1.81,0,0,1,.75-.75A2.85,2.85,0,0,1,62.56,60Z"
    />
    <path
      className="svg-bookings-cls-3 primary"
      d="M50,34h0a2,2,0,0,1,2,2v6a2,2,0,0,1-2,2h0a2,2,0,0,1-2-2V36A2,2,0,0,1,50,34Z"
    />
    <path
      className="svg-bookings-cls-3 primary"
      d="M62,34h0a2,2,0,0,1,2,2v6a2,2,0,0,1-2,2h0a2,2,0,0,1-2-2V36A2,2,0,0,1,62,34Z"
    />
  </svg>
);

export const PrivateEvents = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-private-events-cls-1 {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4px;
      }

      .svg-private-events-cls-2 {
        fill: currentColor;
        fill-rule: evenodd;
      }
    `}</style>
    </defs>
    <polyline
      className="svg-private-events-cls-1 primary"
      points="69.16 54.73 69.16 74.73 41.16 74.73 41.16 54.73 41.16 54.73"
    />
    <path
      className="svg-private-events-cls-2 secondary"
      d="M63.15,37.73h0a2,2,0,0,1,2,2v7a2,2,0,0,1-2,2h0a2,2,0,0,1-2-2v-7A2,2,0,0,1,63.15,37.73Z"
    />
    <polyline
      className="svg-private-events-cls-1 primary"
      points="35.16 59.73 55.16 39.73 75.16 59.73"
    />
  </svg>
);

export const Reviews = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-11 -11 44 39"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-reviews-cls-1,
      .svg-reviews-cls-2 {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-reviews-cls-1 {
        stroke-width: 1.76357;
      }

      .svg-reviews-cls-2 {
        stroke-width: 1.54313;
      }
    `}</style>
    </defs>
    <path
      d="M18.4348 1H3.5652C2.88487 1 2.2324 1.27277 1.75133 1.7583C1.27026 2.24383 1 2.90235 1 3.589V9.10788C1 9.79452 1.27026 10.453 1.75133 10.9386C2.2324 11.4241 2.88487 11.6969 3.5652 11.6969H11.4275C11.9892 11.6955 12.5303 11.9099 12.941 12.2967L17.956 17L17.879 12.2535C17.8779 12.1793 17.8914 12.1057 17.9189 12.0368C17.9464 11.968 17.9872 11.9054 18.039 11.8528C18.0908 11.8001 18.1525 11.7584 18.2204 11.7302C18.2884 11.7019 18.3613 11.6877 18.4348 11.6882V11.6882C19.1151 11.6882 19.7676 11.4155 20.2487 10.9299C20.7297 10.4444 21 9.78589 21 9.09924V3.57174C20.9955 2.88809 20.7232 2.23399 20.2427 1.75219C19.7621 1.27038 19.1122 0.999985 18.4348 1V1Z"
      className="svg-reviews-cls-1 primary"
    />
    <path
      d="M3.92851 4.49072H17.9559"
      className="svg-reviews-cls-2 secondary"
    />
    <path
      d="M3.92851 7.84375H14.3047"
      className="svg-reviews-cls-2 secondary"
    />
  </svg>
);

export const Detectives = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-detectives-cls-1 {
        fill: none;
        stroke: currentColor;
        stroke-width: 4px;
      }

      .svg-detectives-cls-1,
      .svg-detectives-cls-2 {
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-detectives-cls-2 {
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 2px;
      }
    `}</style>
    </defs>
    <ellipse
      className="svg-detectives-cls-1 secondary"
      cx="42.02"
      cy="51.54"
      rx="9.73"
      ry="8.96"
    />
    <ellipse
      className="svg-detectives-cls-1 secondary"
      cx="69.98"
      cy="51.54"
      rx="9.73"
      ry="8.96"
    />
    <path
      className="svg-detectives-cls-1 secondary"
      d="M51.53,53.46s4.31-4.13,8.94,0"
    />
    <path
      className="svg-detectives-cls-2 primary"
      d="M68.75,69.42a.31.31,0,0,0,.19-.58A26.5,26.5,0,0,0,55.87,65a26.36,26.36,0,0,0-12.75,3.64.41.41,0,0,0,.25.77Z"
    />
  </svg>
);

export const CommunityManagement = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="-10 -10 132 132"
  >
    <defs>
      <style>{`
      .svg-community-management-cls-1,
      .svg-community-management-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 3px;
      }

      .svg-community-management-cls-1 {
        stroke: currentColor;
      }

      .svg-community-management-cls-2 {
        stroke: currentColor;
      }
    `}</style>
    </defs>
    <path
      className="svg-community-management-cls-1 secondary"
      d="M40.72,75.07s.53-6.17-6.93-6.17S26.73,75,26.73,75"
    />
    <circle
      className="svg-community-management-cls-1 secondary"
      cx="33.73"
      cy="62.08"
      r="2.75"
    />
    <path
      className="svg-community-management-cls-1 secondary"
      d="M87.76,74.31s.54-6.16-6.93-6.16-7.06,6.13-7.06,6.13"
    />
    <circle
      className="svg-community-management-cls-1 secondary"
      cx="80.77"
      cy="61.33"
      r="2.75"
    />
    <path
      className="svg-community-management-cls-1 secondary"
      d="M64,39.66s.54-6.17-6.93-6.17S50,39.62,50,39.62"
    />
    <circle
      className="svg-community-management-cls-1 secondary"
      cx="57.02"
      cy="26.67"
      r="2.75"
    />
    <path
      className="svg-community-management-cls-2 primary"
      d="M26.89,52.64C28.62,41,35.62,35.07,40.78,31.5"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="38.69 29.05 42.41 30.11 42.12 34.04"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="29.91 52.6 27.01 55.14 23.86 52.76"
    />
    <path
      className="svg-community-management-cls-2 primary"
      d="M73.5,31.87C83.4,38.19,86,47,87.12,53.18"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="90.21 52.26 87.73 55.23 84.26 53.36"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="72.3 34.65 71.16 30.95 74.62 29.05"
    />
    <path
      className="svg-community-management-cls-2 primary"
      d="M69.71,84.73c-10.61,5-19.45,2.54-25.29.25"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="43.55 88.08 42.35 84.41 45.78 82.45"
    />
    <polyline
      className="svg-community-management-cls-2 primary"
      points="67.99 82.24 71.72 83.24 71.5 87.17"
    />
  </svg>
);

export const Marketing = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-marketing-cls-1,
      .svg-marketing-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4px;
      }

      .svg-marketing-cls-1 {
        stroke: currentColor;
      }

      .svg-marketing-cls-2 {
        stroke: currentColor;
      }

      .svg-marketing-cls-3 {
        fill: currentColor;
        fill-rule: evenodd;
      }
    `}</style>
    </defs>
    <path className="svg-marketing-cls-1 secondary" d="M44.71,61.82l6,10" />
    <path
      className="svg-marketing-cls-2 primary"
      d="M42.71,47.29c-4,0-6,3.13-6,7s2.13,7,6,7q1.62,0,16.45,4h0A6,6,0,0,0,66.51,61a6.28,6.28,0,0,0,.2-1.55V47.82a6,6,0,0,0-6-6,5.94,5.94,0,0,0-2,.35Q44.32,47.29,42.71,47.29Z"
    />
    <path
      className="svg-marketing-cls-3 secondary"
      d="M72.71,49.82h0a2,2,0,0,1,2,2v4a2,2,0,0,1-2,2h0a2,2,0,0,1-2-2v-4A2,2,0,0,1,72.71,49.82Z"
    />
  </svg>
);

export const Clients = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="-10 -12 40 50"
  >
    <defs>
      <style>{`
      .svg-clients-cls-1,
      .svg-clients-cls-2 {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-clients-cls-1 {
        stroke-width: 1.34911;
      }

      .svg-clients-cls-2 {
        stroke-width: 2;
      }
    `}</style>
    </defs>
    <path d="M13.2056 2.82422H17" className="svg-clients-cls-1 secondary" />
    <path d="M15.1017 1V4.65143" className="svg-clients-cls-1 secondary" />
    <path
      d="M2.46057 22.0002H14.2653C14.4728 22.0005 14.6779 21.9582 14.867 21.876C15.0561 21.7938 15.2248 21.6738 15.3618 21.5238C15.4988 21.3739 15.6009 21.1975 15.6613 21.0065C15.7218 20.8155 15.7391 20.6143 15.7122 20.4163C15.4087 18.0696 14.3597 13.7723 11.024 12.1494C11.616 11.7239 12.0875 11.1621 12.3951 10.5156C12.7027 9.86912 12.8366 9.15862 12.7846 8.44932C12.7256 7.33214 12.2121 6.28218 11.3552 5.52634C10.4983 4.77051 9.3667 4.36952 8.20505 4.41002C7.04339 4.45053 5.94495 4.92927 5.1471 5.7428C4.34926 6.55633 3.91609 7.6393 3.94122 8.75767C3.94214 9.41588 4.10196 10.0649 4.40807 10.6535C4.71419 11.2421 5.15824 11.7542 5.70518 12.1494C2.35939 13.7723 1.32058 18.0599 1.01365 20.4066C0.985184 20.6053 1.00135 20.8076 1.06107 20.9997C1.12079 21.1919 1.22266 21.3696 1.35981 21.5206C1.49697 21.6717 1.6662 21.7927 1.8561 21.8754C2.04599 21.9581 2.25212 22.0007 2.46057 22.0002Z"
      className="svg-clients-cls-2 primary"
    />
  </svg>
);

export const StockManagement = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-stock-management-cls-1,
      .svg-stock-management-cls-2,
      .svg-stock-management-cls-3 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .svg-stock-management-cls-1,
      .svg-stock-management-cls-3 {
        stroke: currentColor;
      }

      .svg-stock-management-cls-1,
      .svg-stock-management-cls-2 {
        stroke-width: 3px;
      }

      .svg-stock-management-cls-2 {
        stroke: currentColor;
      }

      .svg-stock-management-cls-3 {
        stroke-width: 4px;
      }
      `}</style>
    </defs>
    <line
      className="svg-stock-management-cls-1 secondary"
      x1="59.76"
      y1="59.48"
      x2="45.82"
      y2="51.97"
    />
    <polygon
      className="svg-stock-management-cls-2 primary"
      points="66.98 73.11 66.98 56.01 52.58 63.52 52.54 80.97 66.98 73.11"
    />
    <polyline
      className="svg-stock-management-cls-2 primary"
      points="66.98 56.01 52.54 48.41 46.42 51.65 38.17 56.01 52.58 63.52 38.17 56.01 38.17 72.3 52.54 80.97"
    />
    <polyline
      className="svg-stock-management-cls-3 secondary"
      points="32.37 50.74 52.5 38.59 64.41 45.13 79.63 33.06 70.31 33.35"
    />
    <line
      className="svg-stock-management-cls-3 secondary"
      x1="78.32"
      y1="40.92"
      x2="79.63"
      y2="33.06"
    />
  </svg>
);

export const Photography = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-photography-cls-1,
      .svg-photography-cls-2 {
        fill: none;
        stroke-width: 4px;
      }

      .svg-photography-cls-1 {
        stroke: currentColor;
      }

      .svg-photography-cls-1,
      .svg-photography-cls-2,
      .svg-photography-cls-3 {
        stroke - linecap: round;
        stroke-linejoin: round;
      }

      .svg-photography-cls-2,
      .svg-photography-cls-3 {
        stroke: currentColor;
      }

      .svg-photography-cls-3 {
        fill: currentColor;
      }`}</style>
    </defs>
    <rect
      className="svg-photography-cls-1 primary"
      x="31.84"
      y="40.24"
      width="48.31"
      height="33.97"
      rx="5.54"
    />
    <path
      className="svg-photography-cls-1 primary"
      d="M75.43,40.24V35.89a2.1,2.1,0,0,0-2.09-2.1h-4a2.1,2.1,0,0,0-2.1,2.1v4.35"
    />
    <circle
      className="svg-photography-cls-2 secondary"
      cx="55"
      cy="58.11"
      r="8.58"
    />
    <rect
      className="svg-photography-cls-3 secondary"
      x="68.31"
      y="47.45"
      width="5.01"
      height="3.52"
    />
  </svg>
);

export const DeliveryManagement = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
        .svg-delivery-management-cls-1,
        .svg-delivery-management-cls-2 {
          fill: none;
          stroke-width: 4px;
        }

        .svg-delivery-management-cls-1 {
          stroke: currentColor;
        }

        .svg-delivery-management-cls-2 {
          stroke: currentColor;
          stroke-linecap: round;
        }
      `}</style>
    </defs>
    <path
      className="svg-delivery-management-cls-1 primary"
      d="M48.58,41.29c-3.47,0-5.4.4-7.2,1.36a8.9,8.9,0,0,0-3.72,3.72c-1,1.8-1.36,3.73-1.36,7.2V57c0,3.48.4,5.41,1.36,7.2a8.9,8.9,0,0,0,3.72,3.72c1.8,1,3.73,1.37,7.2,1.37H60c3.47,0,5.4-.41,7.2-1.37a8.9,8.9,0,0,0,3.72-3.72c1-1.79,1.37-3.72,1.37-7.2V53.57c0-3.47-.41-5.4-1.37-7.2a8.9,8.9,0,0,0-3.72-3.72c-1.8-1-3.73-1.36-7.2-1.36Z"
    />
    <path
      className="svg-delivery-management-cls-2 secondary"
      d="M46.3,51.29h16"
    />
    <path
      className="svg-delivery-management-cls-2 secondary"
      d="M46.3,60.29h4"
    />
  </svg>
);

export const Analytics = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-analytics-cls-1 {
        fill: currentColor;
      }

      .svg-analytics-cls-2 {
        fill: currentColor;
      }

      .svg-analytics-cls-3 {
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 5px;
      }

      .svg-analytics-cls-4 {
        fill: currentColor;
      }
      `}</style>
    </defs>
    <path
      className="svg-analytics-cls-1 primary"
      d="M35.26,67.4V39.64A5.53,5.53,0,0,1,41,34.32h0a5.52,5.52,0,0,1,5.7,5.32V67.4a4.88,4.88,0,0,1-5,4.7H40.31A4.88,4.88,0,0,1,35.26,67.4Z"
    />
    <path
      className="svg-analytics-cls-2 primary"
      d="M50.3,67.4V53.24A5.52,5.52,0,0,1,56,47.92h0a5.52,5.52,0,0,1,5.7,5.32V67.4a4.88,4.88,0,0,1-5,4.7H55.34A4.88,4.88,0,0,1,50.3,67.4Z"
    />
    <line
      className="svg-analytics-cls-3 primary"
      x1="35.26"
      y1="77.68"
      x2="76.74"
      y2="77.68"
    />
    <circle
      className="svg-analytics-cls-4 secondary"
      cx="70.91"
      cy="66.36"
      r="5.58"
    />
  </svg>
);

export const ChevronDown = () => (
  <svg
    width="21"
    height="12"
    viewBox="0 0 21 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.14697 2L10.5245 9.72543L18.902 2"
      stroke="#4C68FF"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DropdownArrow = () => (
  <span className="DropdownArrow">
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.80538 5.11523L0.643727 0.528203L8.96703 0.528204L4.80538 5.11523Z"
        fill="#BDBDBD"
      />
    </svg>
  </span>
);

export const AppManager = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-9 -12 36 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-app-manager-cls-1,
      .svg-app-manager-cls-2,
      .svg-app-manager-cls-3 {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }

      .svg-app-manager-cls-1 {
        stroke-width: 0.702467;
      }

      .svg-app-manager-cls-2 {
        fill: currentColor;
        stroke-width: 0.936623;
      }

      .svg-app-manager-cls-3 {
        stroke-width: 1.87325;
      }

      `}</style>
    </defs>
    <path
      d="M5.81548 8.25684H4.21355C3.96497 8.25684 3.76346 8.45165 3.76346 8.69197V10.353C3.76346 10.5933 3.96497 10.7881 4.21355 10.7881H5.81548C6.06406 10.7881 6.26557 10.5933 6.26557 10.353V8.69197C6.26557 8.45165 6.06406 8.25684 5.81548 8.25684Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M13.7864 8.25684H12.1845C11.9359 8.25684 11.7344 8.45165 11.7344 8.69197V10.353C11.7344 10.5933 11.9359 10.7881 12.1845 10.7881H13.7864C14.035 10.7881 14.2365 10.5933 14.2365 10.353V8.69197C14.2365 8.45165 14.035 8.25684 13.7864 8.25684Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M9.82275 8.25684H8.22081C7.97223 8.25684 7.77072 8.45165 7.77072 8.69197V10.353C7.77072 10.5933 7.97223 10.7881 8.22081 10.7881H9.82275C10.0713 10.7881 10.2728 10.5933 10.2728 10.353V8.69197C10.2728 8.45165 10.0713 8.25684 9.82275 8.25684Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M5.81548 12.7766H4.21355C3.96497 12.7766 3.76346 12.9714 3.76346 13.2117V14.8727C3.76346 15.1131 3.96497 15.3079 4.21355 15.3079H5.81548C6.06406 15.3079 6.26557 15.1131 6.26557 14.8727V13.2117C6.26557 12.9714 6.06406 12.7766 5.81548 12.7766Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M13.7864 12.7766H12.1845C11.9359 12.7766 11.7344 12.9714 11.7344 13.2117V14.8727C11.7344 15.1131 11.9359 15.3079 12.1845 15.3079H13.7864C14.035 15.3079 14.2365 15.1131 14.2365 14.8727V13.2117C14.2365 12.9714 14.035 12.7766 13.7864 12.7766Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M9.82275 12.7766H8.22081C7.97223 12.7766 7.77072 12.9714 7.77072 13.2117V14.8727C7.77072 15.1131 7.97223 15.3079 8.22081 15.3079H9.82275C10.0713 15.3079 10.2728 15.1131 10.2728 14.8727V13.2117C10.2728 12.9714 10.0713 12.7766 9.82275 12.7766Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M5.81548 3.84009H4.21355C3.96497 3.84009 3.76346 4.0349 3.76346 4.27522V5.93622C3.76346 6.17653 3.96497 6.37135 4.21355 6.37135H5.81548C6.06406 6.37135 6.26557 6.17653 6.26557 5.93622V4.27522C6.26557 4.0349 6.06406 3.84009 5.81548 3.84009Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M13.7864 3.84009H12.1845C11.9359 3.84009 11.7344 4.0349 11.7344 4.27522V5.93622C11.7344 6.17653 11.9359 6.37135 12.1845 6.37135H13.7864C14.035 6.37135 14.2365 6.17653 14.2365 5.93622V4.27522C14.2365 4.0349 14.035 3.84009 13.7864 3.84009Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M9.82275 3.84009H8.22081C7.97223 3.84009 7.77072 4.0349 7.77072 4.27522V5.93622C7.77072 6.17653 7.97223 6.37135 8.22081 6.37135H9.82275C10.0713 6.37135 10.2728 6.17653 10.2728 5.93622V4.27522C10.2728 4.0349 10.0713 3.84009 9.82275 3.84009Z"
      className="svg-app-manager-cls-1 secondary"
    />
    <path
      d="M9.00001 20.3656C9.49984 20.3656 9.90503 19.9739 9.90503 19.4907C9.90503 19.0075 9.49984 18.6157 9.00001 18.6157C8.50018 18.6157 8.09499 19.0075 8.09499 19.4907C8.09499 19.9739 8.50018 20.3656 9.00001 20.3656Z"
      className="svg-app-manager-cls-2 secondary"
    />
    <path
      d="M14.3914 1H3.60859C2.16791 1 1 2.1291 1 3.52191V20.4781C1 21.8709 2.16791 23 3.60859 23H14.3914C15.8321 23 17 21.8709 17 20.4781V3.52191C17 2.1291 15.8321 1 14.3914 1Z"
      className="svg-app-manager-cls-3 primary"
    />
  </svg>
);

export const Payroll = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-12 -9 46 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-payroll-cls {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M3.85413 3.8982L19.5928 1C20.2312 1 20.8435 1.23512 21.2949 1.65362C21.7464 2.07213 22 2.63975 22 3.23161V12.4562C22 13.048 21.7464 13.6156 21.2949 14.0342C20.8435 14.4527 20.2312 14.6878 19.5928 14.6878L3.40751 18C3.09139 18 2.77836 17.9423 2.4863 17.8301C2.19424 17.718 1.92887 17.5536 1.70533 17.3464C1.4818 17.1392 1.30448 16.8931 1.18351 16.6224C1.06253 16.3516 1.00027 16.0614 1.00027 15.7684V7.3719C0.990138 6.58081 1.26549 5.80928 1.78256 5.1799C2.29964 4.55052 3.02878 4.09939 3.85413 3.8982Z"
      strokeWidth="2"
      className="svg-payroll-cls primary"
    />
    <path
      d="M5.90372 5.64999L17.2298 3.70406C17.6749 3.69178 18.1072 3.84345 18.4319 4.1259C18.7567 4.40834 18.9475 4.79855 18.9627 5.21112V11.4215C18.9475 11.8341 18.7567 12.2243 18.4319 12.5068C18.1072 12.7892 17.6749 12.9409 17.2298 12.9286L5.58216 15.1768C5.13663 15.188 4.70442 15.0353 4.37979 14.7522C4.05516 14.4691 3.86447 14.0785 3.8493 13.6656V7.99753C3.85305 7.44806 4.05856 6.91616 4.43199 6.48944C4.80543 6.06273 5.32451 5.76665 5.90372 5.64999V5.64999Z"
      strokeWidth="1.11244"
      className="svg-payroll-cls secondary"
    />
    <path
      d="M12.8408 7.76538C12.8408 7.76538 11.9476 6.65579 11.1035 7.59977C10.7685 7.98068 10.7328 8.67624 11.7957 9.25588C12.8586 9.83552 13.2383 10.3282 12.8408 10.9658C12.7453 11.1235 12.6062 11.2548 12.4378 11.3462C12.2695 11.4375 12.0779 11.4857 11.8828 11.4857C11.6877 11.4857 11.4961 11.4375 11.3278 11.3462C11.1594 11.2548 11.0203 11.1235 10.9248 10.9658"
      strokeWidth="0.800958"
      className="svg-payroll-cls secondary"
    />
    <path
      d="M11.9512 6.51514V12.1915"
      strokeWidth="0.667465"
      className="svg-payroll-cls secondary"
    />
  </svg>
);

export const FoodWaste = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-9 -12 36 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-food-waste-cls-1,
      .svg-food-waste-cls-2,
      .svg-food-waste-cls-3 {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }

      .svg-food-waste-cls-1 {
        stroke-width: 1.25891;
      }

      .svg-food-waste-cls-2 {
        stroke-width: 0.839272;
      }

      .svg-food-waste-cls-3 {
        fill: currentColor;
        stroke-width: 0.419636;
      }
      `}</style>
    </defs>
    <path
      d="M16.1898 4.87586C16.1898 4.87586 14.0181 3.67004 12.2692 4.60285C10.5202 5.53565 7.50293 5.5129 6.03879 4.56189C4.57465 3.61089 2.32282 4.37988 1.48172 5.28994C3.20063 6.38269 5.00115 7.33514 6.86654 8.1384C7.15313 7.79534 7.51756 7.52929 7.92795 7.3635C8.33834 7.19772 8.7822 7.13725 9.22073 7.18739C10.6359 7.2966 11.0943 8.1384 11.0943 8.1384C13.0544 7.55179 14.8178 6.42272 16.1898 4.87586V4.87586Z"
      className="svg-food-waste-cls-1 primary"
    />
    <path
      d="M16.1887 4.875C14.3502 7.48273 13.3685 10.6198 13.3851 13.8345C13.3851 19.2948 16.6827 20.7918 16.6827 20.7918C16.6827 20.7918 13.1225 23.9997 8.83246 23.9997C4.20419 23.9997 1.8233 21.802 1 20.7918C1 20.7918 3.92827 18.6714 3.92382 14.0529C3.92382 14.0529 4.3466 9.21595 1.47173 5.28907"
      className="svg-food-waste-cls-1 primary"
    />
    <path
      d="M1.94395 20.7939C1.94395 20.7939 6.1005 19.4744 6.83924 20.1205C7.57799 20.7666 8.08977 21.1944 8.76176 21.1944C9.43375 21.1944 9.95888 20.4117 10.3283 20.116C10.3283 20.116 11.2495 19.5062 15.6686 20.7939"
      className="svg-food-waste-cls-1 primary"
    />
    <path
      d="M7.6303 12.4297C7.42791 12.5291 7.25966 12.6887 7.14766 12.8877C7.03567 13.0867 6.98517 13.3156 7.00281 13.5445C7.00281 14.2771 7.34103 14.5911 7.6303 14.5911"
      className="svg-food-waste-cls-2 secondary"
    />
    <path
      d="M9.5542 12.4297C9.76284 12.524 9.93823 12.6814 10.0568 12.8807C10.1753 13.08 10.2313 13.3117 10.2173 13.5445C10.2173 14.2771 9.86127 14.5911 9.5542 14.5911"
      className="svg-food-waste-cls-2 secondary"
    />
    <path
      d="M12.6818 2.60691C12.6818 2.60691 9.38413 2.39304 9.18387 5.63738C9.18387 5.63738 12.9532 6.09695 12.6818 2.60691Z"
      className="svg-food-waste-cls-3 secondary"
    />
    <path
      d="M9.12238 5.68221C9.12238 5.68221 10.5109 1.46868 5.61558 1C5.61558 1.01365 4.72552 5.57756 9.12238 5.68221Z"
      className="svg-food-waste-cls-3 secondary"
    />
  </svg>
);

export const PresenceManagement = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-16 -10 50 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-presence-management-cls {
        stroke-width: 1.74939;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M18.5096 7.02166H15.33C15.2176 7.02317 15.1062 7.00152 15.0033 6.95818C14.9004 6.91485 14.8085 6.85085 14.7338 6.77053C14.6591 6.69021 14.6034 6.59545 14.5704 6.4927C14.5374 6.38994 14.5279 6.2816 14.5425 6.17503V6.17503L15.313 2.4832C15.5684 1.10741 14.0573 0.582335 13.074 1.36385C11.8922 2.88634 10.798 4.46935 9.7965 6.10583C9.59218 6.46402 9.37084 6.81 9.14099 7.15192L8.05131 9.02022V9.06092C7.73261 9.61635 7.56295 10.2387 7.55756 10.8722V13.9739C7.55756 14.4628 7.65833 14.9469 7.85411 15.3985C8.04989 15.8501 8.33684 16.2604 8.69856 16.606C9.06027 16.9515 9.48966 17.2254 9.96216 17.4122C10.4347 17.5989 10.941 17.6947 11.4523 17.6942H18.5181C19.4416 17.6942 20.3272 17.3434 20.9802 16.719C21.6332 16.0946 22 15.2477 22 14.3646V10.3512C22 9.9133 21.9097 9.47967 21.7341 9.07517C21.5586 8.67068 21.3014 8.30327 20.9772 7.99399C20.653 7.6847 20.2681 7.43962 19.8447 7.27277C19.4213 7.10592 18.9676 7.02059 18.5096 7.02166V7.02166Z"
      className="svg-presence-management-cls secondary"
    />
    <path
      d="M7.34225 8.18945H1V17.999H7.34225V8.18945Z"
      className="svg-presence-management-cls primary"
    />
  </svg>
);

export const CustomerLoyalty = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-16 -13 56 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-customer-loyalty-cls-1,
      .svg-customer-loyalty-cls-2 {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }

      .svg-customer-loyalty-cls-1 {
        stroke-width: 1.72438;
      }

      .svg-customer-loyalty-cls-2 {
        stroke-width: 1.29329;
      }
      `}</style>
    </defs>
    <path
      d="M20.1783 1H3.82172C3.07335 1 2.35564 1.28268 1.82646 1.78585C1.29729 2.28902 1 2.97147 1 3.68306V9.39799C1 10.1096 1.29729 10.792 1.82646 11.2952C2.35564 11.7984 3.07335 12.0811 3.82172 12.0811H8.70799L12 17L14.8546 12.0811H20.1783C20.9266 12.0811 21.6444 11.7984 22.1735 11.2952C22.7027 10.792 23 10.1096 23 9.39799V3.66518C22.995 2.95669 22.6956 2.27883 22.1669 1.77952C21.6383 1.28021 20.9234 0.999984 20.1783 1Z"
      className="svg-customer-loyalty-cls-1 primary"
    />
    <path
      d="M14.3749 4.64039C13.0534 3.88018 12.0235 5.22619 12.0235 5.22619C12.0235 5.22619 10.97 3.88466 9.67203 4.64039C8.12949 5.53474 9.24407 7.2832 9.67203 7.84218C10.397 8.5713 11.1749 9.25119 12 9.87683C12.8331 9.252 13.6188 8.5721 14.3514 7.84218C14.8217 7.2832 15.9174 5.53474 14.3749 4.64039Z"
      className="svg-customer-loyalty-cls-2 secondary"
    />
  </svg>
);

export const EventsManagement = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-18 -14 56 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-events-management-cls {
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M6.73424 8.22144L13.4895 15.3916"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M5.00575 11.4006L9.63802 16.601"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M2.9211 14.5525L5.85501 17.783"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M17.2255 13.914L9.08189 4.93551C9.00121 4.84347 8.89681 4.77181 8.77835 4.72715C8.65989 4.6825 8.53121 4.6663 8.40421 4.68004C8.27721 4.69379 8.15601 4.73705 8.05181 4.8058C7.94762 4.87456 7.8638 4.9666 7.80812 5.07339L1.14631 17.1996C1.02744 17.4152 0.979376 17.6584 1.0081 17.8992C1.03682 18.1399 1.14105 18.3675 1.30788 18.5537C1.4747 18.74 1.69677 18.8767 1.94656 18.9469C2.19635 19.0172 2.46286 19.0178 2.71305 18.9488L16.8646 15.0407C16.9853 15.0075 17.0951 14.9469 17.1841 14.8644C17.2731 14.7819 17.3385 14.68 17.3743 14.5681C17.4102 14.4562 17.4153 14.3378 17.3893 14.2235C17.3634 14.1093 17.307 14.0029 17.2255 13.914V13.914Z"
      className="svg-events-management-cls primary"
    />
    <path
      d="M11.7269 4.10787L12.8223 1.23193"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M19.6747 12.2718L22.2095 11.7715"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M15.8117 3.45834L16.9793 1"
      className="svg-events-management-cls primary"
    />
    <path
      d="M17.3697 6.57862L19.31 5.10913"
      className="svg-events-management-cls secondary"
    />
    <path
      d="M20.5119 8.55642L23 7.6897"
      className="svg-events-management-cls primary"
    />
  </svg>
);

export const InfluencerManagement = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-11 -12 44 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-influencer-management-cls-1,
      .svg-influencer-management-cls-2 {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }

      .svg-influencer-management-cls-1 {
        stroke-width: 1.1833;
      }

      .svg-influencer-management-cls-2 {
        stroke-width: 2.3666;
      }
      `}</style>
    </defs>
    <path
      d="M12.9797 16.1659L14.922 16.4399C15.157 16.4712 15.378 16.5623 15.5601 16.7028C15.7423 16.8433 15.8785 17.0279 15.9536 17.2357C16.0287 17.4436 16.0397 17.6667 15.9853 17.88C15.931 18.0933 15.8134 18.2884 15.6458 18.4436L14.2107 19.8023L14.5633 21.6177C14.617 21.9278 14.5361 22.245 14.3381 22.5004C14.1401 22.7558 13.8409 22.9289 13.5055 22.9821C13.2211 23.029 12.9278 22.9825 12.6766 22.8508L11.0188 22.0173L9.36098 22.8508C9.06321 23.0014 8.7128 23.0367 8.38683 22.9489C8.06086 22.8611 7.78602 22.6574 7.62276 22.3826C7.48 22.1508 7.42966 21.8802 7.48049 21.6177L7.75885 19.8023L6.32374 18.4608C6.20386 18.3514 6.10868 18.2212 6.04372 18.0776C5.97876 17.934 5.94531 17.78 5.94531 17.6244C5.94531 17.4689 5.97876 17.3148 6.04372 17.1713C6.10868 17.0277 6.20386 16.8975 6.32374 16.7881C6.51528 16.6121 6.76201 16.4963 7.02893 16.457L8.99602 16.1659L9.82492 14.5674C9.92987 14.3657 10.0944 14.1955 10.2996 14.0764C10.5048 13.9573 10.7423 13.894 10.9848 13.894C11.2272 13.894 11.4647 13.9573 11.6699 14.0764C11.8751 14.1955 12.0397 14.3657 12.1446 14.5674L12.9797 16.1659Z"
      stroke="#A9ACAF"
      className="svg-influencer-management-cls-1 primary"
    />
    <path
      d="M14.4703 6.18748L18.4045 6.70126C18.751 6.74656 19.0766 6.88137 19.3437 7.09013C19.6107 7.29889 19.8084 7.57309 19.9138 7.88108C20.0192 8.18907 20.0281 8.51829 19.9395 8.83075C19.8508 9.14321 19.6682 9.42617 19.4128 9.64695L16.6168 12.0674L17.2911 15.5669C17.3513 15.8802 17.3157 16.2028 17.1884 16.4985C17.061 16.7943 16.8469 17.0514 16.5701 17.2411C16.2932 17.4308 15.9646 17.5455 15.621 17.5725C15.2774 17.5994 14.9325 17.5375 14.625 17.3937L10.9939 15.6811L7.36898 17.3937C7.06141 17.5375 6.7165 17.5994 6.37293 17.5725C6.02936 17.5455 5.70072 17.4308 5.42387 17.2411C5.14702 17.0514 4.93291 16.7943 4.80557 16.4985C4.67822 16.2028 4.64266 15.8802 4.70289 15.5669L5.37715 12.0674L2.57497 9.64695C2.22215 9.33642 2.01593 8.91022 2.00089 8.46049C1.98584 8.01076 2.16317 7.57363 2.49455 7.24359C2.78392 6.95839 3.17025 6.77307 3.58944 6.71839L7.52363 6.20461L9.34226 2.9221C9.56689 2.5237 9.95209 2.22267 10.4149 2.08386C10.8777 1.94505 11.3811 1.97956 11.8166 2.17997C12.1622 2.34358 12.4435 2.60315 12.6208 2.9221L14.4703 6.18748Z"
      stroke="#505256"
      className="svg-influencer-management-cls-2 secondary"
    />
  </svg>
);

export const CustomerSupport = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-11 -11 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-customer-support-cls {
        stroke: currentColor;
        fill: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M11 0C4.9346 0 0 4.9346 0 11V15.5573C0 16.6837 0.9867 17.6 2.2 17.6H3.3C3.59174 17.6 3.87153 17.4841 4.07782 17.2778C4.28411 17.0715 4.4 16.7917 4.4 16.5V10.8427C4.4 10.551 4.28411 10.2712 4.07782 10.0649C3.87153 9.85859 3.59174 9.7427 3.3 9.7427H2.3012C2.9128 5.4857 6.5758 2.2 11 2.2C15.4242 2.2 19.0872 5.4857 19.6988 9.7427H18.7C18.4083 9.7427 18.1285 9.85859 17.9222 10.0649C17.7159 10.2712 17.6 10.551 17.6 10.8427V17.6C17.6 18.8133 16.6133 19.8 15.4 19.8H13.2V18.7H8.8V22H15.4C17.8266 22 19.8 20.0266 19.8 17.6C21.0133 17.6 22 16.6837 22 15.5573V11C22 4.9346 17.0654 0 11 0Z"
      className="svg-customer-support-cls primary"
    />
  </svg>
);

export const OperationalReport = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-12 -12 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-operational-report-cls {
        stroke-width: 4;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M7.89024 21.945C9.31467 22.6416 10.8787 23.0024 12.463 22.9998H12.547C15.3195 22.9998 17.9784 21.8935 19.9389 19.9244C21.8993 17.9553 23.0007 15.2846 23.0007 12.4999C23.0007 9.71514 21.8993 7.04445 19.9389 5.07534C17.9784 3.10623 15.3195 2 12.547 2H12.463C9.69049 2 7.03155 3.10623 5.0711 5.07534C3.11065 7.04445 2.00928 9.71514 2.00928 12.4999"
      stroke="#828282"
      className="svg-operational-report-cls secondary"
    />
    <path
      d="M9.13709 2.54297C6.78339 3.33389 4.78664 4.94014 3.50405 7.07436C2.22147 9.20859 1.73673 11.7316 2.13656 14.1919C2.5364 16.6522 3.79471 18.8894 5.68639 20.5032C7.57808 22.117 9.97971 23.0021 12.4616 23.0003H12.5457C15.3181 23.0003 17.9771 21.894 19.9375 19.9249C21.898 17.9558 22.9994 15.2851 22.9994 12.5004"
      className="svg-operational-report-cls primary"
    />
  </svg>
);

export const Intelligence = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="-20 -20 64 60"
    fill="none"
  >
    <defs>
      <style>{`
      .svg-intelligence-cls {
        stroke-width: 1.10962;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M6.37725 3.75448L4.81928 1.25977H2.26855"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M17.2393 3.75448L18.7972 1.25977H21.348"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M9.79299 17.8667L8.23501 20.7409H5.68066"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M13.8223 17.8667L15.3802 20.7409H17.9346"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M1.49219 7.36719C1.49219 7.36719 2.14436 9.28465 4.23494 8.86482"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M22.5728 7.36719C22.5728 7.36719 21.9243 9.28465 19.8301 8.86482"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M2.15625 16.6153C2.15625 16.6153 2.80842 14.6979 4.89901 15.1177"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M21.5504 16.6153C21.5504 16.6153 20.8982 14.6979 18.8076 15.1177"
      className="svg-intelligence-cls primary"
    />
    <path
      d="M1.13044 2.51894C1.75476 2.51894 2.26087 1.95505 2.26087 1.25947C2.26087 0.563884 1.75476 0 1.13044 0C0.506113 0 0 0.563884 0 1.25947C0 1.95505 0.506113 2.51894 1.13044 2.51894Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M22.3326 2.51894C22.9569 2.51894 23.463 1.95505 23.463 1.25947C23.463 0.563884 22.9569 0 22.3326 0C21.7083 0 21.2021 0.563884 21.2021 1.25947C21.2021 1.95505 21.7083 2.51894 22.3326 2.51894Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M18.9166 22.0004C19.5409 22.0004 20.047 21.4365 20.047 20.7409C20.047 20.0453 19.5409 19.4814 18.9166 19.4814C18.2922 19.4814 17.7861 20.0453 17.7861 20.7409C17.7861 21.4365 18.2922 22.0004 18.9166 22.0004Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M4.89118 22.0004C5.5155 22.0004 6.02161 21.4365 6.02161 20.7409C6.02161 20.0453 5.5155 19.4814 4.89118 19.4814C4.26686 19.4814 3.76074 20.0453 3.76074 20.7409C3.76074 21.4365 4.26686 22.0004 4.89118 22.0004Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M21.8443 18.7587C22.4686 18.7587 22.9747 18.1948 22.9747 17.4992C22.9747 16.8036 22.4686 16.2397 21.8443 16.2397C21.22 16.2397 20.7139 16.8036 20.7139 17.4992C20.7139 18.1948 21.22 18.7587 21.8443 18.7587Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M22.8697 7.3749C23.494 7.3749 24.0001 6.81101 24.0001 6.11543C24.0001 5.41984 23.494 4.85596 22.8697 4.85596C22.2454 4.85596 21.7393 5.41984 21.7393 6.11543C21.7393 6.81101 22.2454 7.3749 22.8697 7.3749Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M1.13044 7.3749C1.75476 7.3749 2.26087 6.81101 2.26087 6.11543C2.26087 5.41984 1.75476 4.85596 1.13044 4.85596C0.506113 4.85596 0 5.41984 0 6.11543C0 6.81101 0.506113 7.3749 1.13044 7.3749Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M1.90973 18.7587C2.53405 18.7587 3.04017 18.1948 3.04017 17.4992C3.04017 16.8036 2.53405 16.2397 1.90973 16.2397C1.28541 16.2397 0.779297 16.8036 0.779297 17.4992C0.779297 18.1948 1.28541 18.7587 1.90973 18.7587Z"
      fill="currentColor"
      className="primary"
    />
    <path
      d="M11.8005 16.7566C11.9273 16.7566 12.0831 17.8465 12.431 18.0927C13.3911 18.7669 13.681 17.5357 13.681 17.5357C14.4744 18.5247 15.4636 18.6659 16.1339 17.8828C17.4346 17.7092 18.5505 17.1199 18.2317 15.2468C19.1302 15.3881 19.7208 13.515 19.2462 12.6391C20.2969 12.2354 20.065 9.95866 19.4599 9.40966C19.181 9.15938 19.2643 8.64671 19.3513 8.25918C19.5759 7.20962 19.1085 6.11163 18.4201 5.79272C18.2179 5.7072 18.0373 5.5686 17.8935 5.3887C17.7497 5.20879 17.6469 4.99289 17.594 4.75931C17.3513 3.59269 16.7099 3.3303 15.623 3.12443C15.1821 3.03571 14.7832 2.77707 14.4962 2.39377C13.9165 1.58642 12.757 0.984945 11.757 2.34533H11.7027C10.6882 1.06164 9.52879 1.59046 8.96357 2.39377C8.67654 2.77707 8.27767 3.03571 7.83676 3.12443C6.77516 3.34645 6.11936 3.59269 5.87661 4.77142C5.82452 5.00543 5.72209 5.2218 5.57817 5.40185C5.43425 5.58189 5.25315 5.7202 5.05052 5.80483C4.36212 6.12374 3.89835 7.22174 4.12299 8.27129C4.20632 8.67497 4.29328 9.17149 4.01067 9.42177C3.4056 9.95866 3.17371 12.2475 4.22806 12.6512C3.75342 13.5271 4.34038 15.4002 5.24255 15.2589C4.92009 17.132 6.03966 17.7213 7.34038 17.8949C8.01067 18.6781 9.17371 18.5004 9.78966 17.5478C9.78966 17.5478 10.1846 18.7305 11.0433 18.1048C11.431 17.8182 11.5433 16.7687 11.6737 16.7687"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M7.02215 11.5331C7.02215 11.5331 5.14896 11.2061 4.24316 12.6392"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M16.377 11.5331C16.377 11.5331 18.2501 11.2061 19.1559 12.6392"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M11.6885 16.7565L11.7181 2.61572"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M8.96058 2.39404C8.73425 2.85245 8.64723 3.38019 8.71254 3.89829C8.77785 4.41639 8.99198 4.897 9.3229 5.26821"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M14.4346 2.31738C14.6609 2.77579 14.7479 3.30353 14.6826 3.82163C14.6173 4.33973 14.4032 4.82034 14.0723 5.19155"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M7.59375 9.88184C7.59375 9.88184 6.59737 11.876 8.07201 13.1112"
      className="svg-intelligence-cls secondary"
    />
    <path
      d="M15.5251 9.91846C15.5251 9.91846 16.5215 11.9126 15.0469 13.1479"
      className="svg-intelligence-cls secondary"
    />
  </svg>
);

export const Fork = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="42.51 38.52 10 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-fork-cls-1, .svg-fork-cls-2, .svg-fork-cls-3 {
        fill: none;
        stroke: currentColor;
        stroke-width: 3px;
      }
      .svg-fork-cls-1 {
        stroke-linejoin: round;
      }
      .svg-fork-cls-1, .svg-fork-cls-3 {
        stroke-linecap: round;
      }
      .svg-fork-cls-2, .svg-fork-cls-3 {
        stroke-miterlimit: 10;
      }
      `}</style>
    </defs>
    <line
      className="svg-fork-cls-1"
      x1="44.51"
      y1="53.1"
      x2="44.51"
      y2="61.36"
    />
    <line
      className="svg-fork-cls-1"
      x1="49.81"
      y1="53.1"
      x2="49.81"
      y2="61.36"
    />
    <path
      className="svg-fork-cls-2"
      d="M51.33,78.41a18.87,18.87,0,1,0-7.74.19"
    />
    <path
      className="svg-fork-cls-3"
      d="M38.82,52.39v7.75c0,7.33,4.81,8.75,4.81,8.75v19s-.05,3.92,3.53,3.92,3.42-3.92,3.42-3.92v-19s4.82-1.42,4.82-8.75V52.39"
    />
  </svg>
);

export const Adv = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="-12 -12 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>{`
      .svg-adv-cls-1 {
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: currentColor;
      }
      .svg-adv-cls-2 {
        fill-rule: evenodd;
        clip-rule: evenodd;
        fill: currentColor;
      }
      `}</style>
    </defs>
    <path
      d="M5.63293 14.6667L9.10672 20.0001"
      stroke="#45474B"
      className="svg-adv-cls-1 secondary"
    />
    <path
      d="M4.47378 6.91735C2.15793 6.91735 1 8.58669 1 10.6507C1 12.7147 2.23319 14.3841 4.47378 14.3841C5.09906 14.3841 8.27371 15.0952 13.9977 16.5174C14.4403 16.6259 14.9017 16.6526 15.3555 16.5962C15.8093 16.5398 16.2465 16.4013 16.642 16.1887C17.0375 15.976 17.3834 15.6934 17.6599 15.3572C17.9364 15.021 18.138 14.6377 18.2531 14.2294C18.3289 13.9593 18.3678 13.6816 18.3689 13.4027V7.20002C18.3689 6.35132 18.0029 5.53738 17.3515 4.93726C16.7 4.33714 15.8164 4 14.8951 4C14.5004 4.00054 14.1087 4.06369 13.7372 4.18667C8.18301 6.00712 5.0952 6.91735 4.47378 6.91735Z"
      className="svg-adv-cls-1 primary"
    />
    <path
      d="M21.8421 8.26685C22.1492 8.26685 22.4437 8.37923 22.6608 8.57927C22.878 8.77931 23 9.05062 23 9.33352V11.4669C23 11.7498 22.878 12.0211 22.6608 12.2211C22.4437 12.4212 22.1492 12.5335 21.8421 12.5335C21.535 12.5335 21.2404 12.4212 21.0233 12.2211C20.8061 12.0211 20.6841 11.7498 20.6841 11.4669V9.33352C20.6841 9.05062 20.8061 8.77931 21.0233 8.57927C21.2404 8.37923 21.535 8.26685 21.8421 8.26685Z"
      className="svg-adv-cls-2 secondary"
    />
  </svg>
);

export const Pocket = () => (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.2 1H20.8C21.3835 1 21.9431 1.23413 22.3556 1.65087C22.7682 2.06762 23 2.63285 23 3.22222V9.88889C23 12.8357 21.8411 15.6619 19.7782 17.7456C17.7153 19.8294 14.9174 21 12 21C9.08262 21 6.28473 19.8294 4.22183 17.7456C2.15893 15.6619 1 12.8357 1 9.88889V3.22222C1 2.63285 1.23179 2.06762 1.64437 1.65087C2.05695 1.23413 2.61652 1 3.2 1Z"
      stroke="#A5A8AE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.59961 8.77771L11.9996 13.2222L16.3996 8.77771"
      stroke="#4E4D66"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Timer = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1C9.02219 1 7.08879 1.58649 5.4443 2.6853C3.79981 3.78412 2.51809 5.3459 1.76121 7.17316C1.00433 9.00043 0.8063 11.0111 1.19215 12.9509C1.578 14.8907 2.53041 16.6725 3.92894 18.0711C5.32746 19.4696 7.10929 20.422 9.0491 20.8078C10.9889 21.1937 12.9996 20.9957 14.8268 20.2388C16.6541 19.4819 18.2159 18.2002 19.3147 16.5557C20.4135 14.9112 21 12.9778 21 11C21 8.34783 19.9464 5.8043 18.0711 3.92893C16.1957 2.05357 13.6522 1 11 1V1Z"
      stroke="#A5A8AE"
      strokeWidth="2"
    />
    <path
      d="M11 11L6.55554 15.4444"
      stroke="#4E4D66"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M11 5.44446V11"
      stroke="#4E4D66"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11 11.0001L15.4444 15.4446"
      stroke="#4E4D66"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
