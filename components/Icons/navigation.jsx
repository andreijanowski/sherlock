const fillNone = { fill: "none" };
const strokeNone = { stroke: "none" };

export const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="18"
    viewBox="0 0 20 18"
  >
    <g fillRule="evenodd">
      <rect width="20" height="2" rx="1" />
      <rect y="8" width="20" height="2" rx="1" />
      <rect y="16" width="20" height="2" rx="1" />
    </g>
  </svg>
);

export const LiveStream = () => (
  <svg
    width="30px"
    height="22px"
    viewBox="0 0 30 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      strokeWidth="1"
      fillRule="evenodd"
      transform="translate(2.000000, 2.000000)"
    >
      <path
        d="M3.80982659,17.8843902 C1.45780347,15.5941463 0,12.4302439 0,8.94292683 C0,5.45414634 1.45780347,2.29170732 3.80982659,0"
        strokeLinecap="round"
      />
      <path
        d="M22.1766474,0 C24.5301734,2.29170732 25.986474,5.45414634 25.986474,8.94292683 C25.986474,12.4317073 24.5286705,15.5941463 22.1766474,17.8858537"
        strokeLinecap="round"
      />
      <path
        d="M18.5636994,3.51804878 C19.9914451,4.90829268 20.8751445,6.82682927 20.8751445,8.94146341 C20.8751445,11.057561 19.9914451,12.9760976 18.5636994,14.364878"
        strokeLinecap="round"
      />
      <path
        d="M7.42277457,14.3663415 C5.9950289,12.9760976 5.11132948,11.057561 5.11132948,8.94292683 C5.11132948,6.82682927 5.9950289,4.90829268 7.42277457,3.5195122"
        strokeLinecap="round"
      />
      <path
        d="M12.9939884,7.75756098 C13.6642775,7.75756098 14.2098266,8.28878049 14.2098266,8.94146341 C14.2098266,9.59414634 13.6642775,10.1253659 12.9939884,10.1253659 C12.3236994,10.1253659 11.7781503,9.59414634 11.7781503,8.94146341 C11.7781503,8.28878049 12.3221965,7.75756098 12.9939884,7.75756098 L12.9939884,7.75756098 Z M12.9939884,5.41609756 C10.9966474,5.41609756 9.37352601,6.99804878 9.37352601,8.94146341 C9.37352601,10.884878 10.9966474,12.4682927 12.9939884,12.4682927 C14.9913295,12.4682927 16.6144509,10.8863415 16.6144509,8.94292683 C16.6144509,6.9995122 14.9898266,5.41609756 12.9939884,5.41609756 L12.9939884,5.41609756 Z"
        fillRule="nonzero"
      />
    </g>
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
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <path
        style={fillNone}
        d="M3.764 1c-.986 0-1.372.076-1.758.283-.314.168-.555.409-.723.723C1.076 2.392 1 2.778 1 3.764v1.472c0 .986.076 1.372.283 1.758.168.314.409.555.723.723.386.207.772.283 1.758.283h1.472c.986 0 1.372-.076 1.758-.283.314-.168.555-.409.723-.723.207-.386.283-.772.283-1.758V3.764c0-.986-.076-1.372-.283-1.758a1.726 1.726 0 0 0-.723-.723C6.608 1.076 6.222 1 5.236 1H3.764z"
      />
      <path
        style={fillNone}
        strokeOpacity=".4"
        d="M14.764 1c-.986 0-1.372.076-1.758.283-.314.168-.555.409-.723.723-.207.386-.283.772-.283 1.758v1.472c0 .986.076 1.372.283 1.758.168.314.409.555.723.723.386.207.772.283 1.758.283h1.472c.986 0 1.372-.076 1.758-.283.314-.168.555-.409.723-.723.207-.386.283-.772.283-1.758V3.764c0-.986-.076-1.372-.283-1.758a1.726 1.726 0 0 0-.723-.723C17.608 1.076 17.222 1 16.236 1h-1.472z"
      />
      <path
        style={fillNone}
        d="M14.764 12c-.986 0-1.372.076-1.758.283-.314.168-.555.409-.723.723-.207.386-.283.772-.283 1.758v1.472c0 .986.076 1.372.283 1.758.168.314.409.555.723.723.386.207.772.283 1.758.283h1.472c.986 0 1.372-.076 1.758-.283.314-.168.555-.409.723-.723.207-.386.283-.772.283-1.758v-1.472c0-.986-.076-1.372-.283-1.758a1.726 1.726 0 0 0-.723-.723c-.386-.207-.772-.283-1.758-.283h-1.472z"
      />
      <path
        style={fillNone}
        strokeOpacity=".4"
        d="M3.764 12c-.986 0-1.372.076-1.758.283-.314.168-.555.409-.723.723-.207.386-.283.772-.283 1.758v1.472c0 .986.076 1.372.283 1.758.168.314.409.555.723.723.386.207.772.283 1.758.283h1.472c.986 0 1.372-.076 1.758-.283.314-.168.555-.409.723-.723.207-.386.283-.772.283-1.758v-1.472c0-.986-.076-1.372-.283-1.758a1.726 1.726 0 0 0-.723-.723C6.608 12.076 6.222 12 5.236 12H3.764z"
      />
    </g>
  </svg>
);

export const Bookings = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
  >
    <g fill="none" fillRule="evenodd">
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
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g fill="none" fillRule="evenodd">
      <path
        style={fillNone}
        strokeOpacity=".4"
        strokeWidth="2"
        d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
      />
      <path
        style={fillNone}
        strokeDasharray="1,1.5"
        strokeLinecap="round"
        d="M10 10l-4 4"
        opacity=".4"
      />
      <g strokeLinecap="round" strokeWidth="2">
        <path d="M10 5v5M10 10l4 4" />
      </g>
    </g>
  </svg>
);

export const TakeAway = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="22"
    viewBox="0 0 20 22"
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <path
        style={fillNone}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 3.5l8 4"
      />
      <path
        style={fillNone}
        strokeOpacity="0.4"
        d="M10.444 1.345a.999.999 0 0 0-.887 0l-8.002 4A1 1 0 0 0 1 6.24v9.527c-.003.38.21.729.547.899l8 4a1 1 0 0 0 .896 0l8.002-4.002A1 1 0 0 0 19 15.77V6.24a1 1 0 0 0-.557-.896l-7.999-3.999z"
      />
      <path
        style={fillNone}
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.32 6.16L10 10l8.68-3.84M10 20.76V10"
      />
    </g>
  </svg>
);

export const Catering = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 20 14"
  >
    <g fill="none" fillRule="evenodd" transform="translate(0 2)">
      <path
        style={fillNone}
        strokeOpacity="0.4"
        strokeWidth="2"
        d="M2 11h16c0-3.882-.993-10-7.997-10C3 1 2 7.112 2 11z"
      />
      <rect width="20" height="2" y="10" style={strokeNone} rx="1" />
      <circle cx="10" cy="1" r="2" style={fillNone} strokeWidth="2" />
    </g>
  </svg>
);

export const Privatizations = () => (
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

export const LeFood = () => (
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
    >
      <path d="M13 5L15.7 5 15.7 21 3.7 21C2.2 21 1 19.8 1 18.3L1 3" />
      <path
        d="M15.7 5L3 5C1.9 5 1 4.1 1 3 1 1.9 1.9 1 3 1L14.3 1"
        strokeOpacity="0.4"
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
      />
      <rect strokeOpacity="0.4" x="3" y="16" width="6.5" height="2" rx="1" />
      <rect strokeOpacity="0.4" x="5" y="13" width="2.5" height="2" rx="1" />
      <path d="M0,19.6774194 L12.2580645,19.6774194" />
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
      <path d="M10.5 18L1 18 1 4.7 18.3 4.7 18.3 12M2.3 3.7L2.3 1 17 1 17 3.7" />
      <path d="M15.7 14L15.7 19.3M13 16.7L18.3 16.7" strokeOpacity="0.4" />
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
      />
      <path d="M11.8,12.3 C9.3,11.9666667 9.33333333,11.0666667 9.33333333,10.6 L9.33333333,9.83333333 C10.2333333,9.03333333 10.6666667,7.7 10.6666667,6.2 L10.6666667,3.86666667 C10.6666667,1.33333333 8.96666667,0.333333333 7.33333333,0.333333333 C5.7,0.333333333 4,1.33333333 4,3.86666667 L4,6.2 C4,7.7 4.43333333,9.06666667 5.33333333,9.86666667 L5.33333333,10.6666667 C5.33333333,11.1666667 5.36666667,11.9666667 2.86666667,12.3 C0.366666667,12.6333333 0,15 0,15 L0,16.3333333 L14.6666667,16.3333333 L14.6666667,15 C14.6666667,15 14.6666667,12.7333333 11.8,12.3 Z" />
    </g>
  </svg>
);

export const Subscriptions = () => (
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
        d="M18.49 13a9 9 0 1 1-2.12-9.36L21 9"
      />
      <path style={fillNone} d="M21 3v6h-6" />
    </g>
  </svg>
);

export const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="#2A2F38"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1 1)"
    >
      <circle cx="10" cy="10" r="2.727" style={fillNone} />
      <path
        style={fillNone}
        strokeOpacity=".4"
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

export const SettingsBilling = () => (
  <svg
    width="16px"
    height="22px"
    viewBox="0 0 16 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="translate(1.000000, 1.000000)"
    >
      <polygon points="0 0 0 20 14 20 14 5.33333333 8.66666667 0" />
      <path
        d="M3.33333333,7 L10.6666667,7 M3.33333333,11.3333333 L10.6666667,11.3333333 M3.33333333,15.6666667 L9.33333333,15.6666667"
        strokeOpacity="0.4"
      />
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
