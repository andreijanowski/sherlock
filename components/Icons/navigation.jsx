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

export const AppManager = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-app-manager-cls-1,
      .svg-app-manager-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4px;
      }
      
      .svg-app-manager-cls-1 {
        stroke: currentColor;
      }
      
      .svg-app-manager-cls-2 {
        stroke: currentColor;
      }
    `}</style>
    </defs>
    <path
      className="svg-app-manager-cls-1 primary"
      d="M40.18,38.13h32a4,4,0,0,1,4,4v12a20,20,0,0,1-40,0v-12A4,4,0,0,1,40.18,38.13Z"
    />
    <polyline
      className="svg-app-manager-cls-2 secondary"
      points="48.18 52.13 56.18 60.13 64.18 52.13"
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
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-reviews-cls-1,
      .svg-reviews-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      
      .svg-reviews-cls-1 {
        stroke: currentColor;
        stroke-width: 4px;
      }
      
      .svg-reviews-cls-2 {
        stroke: currentColor;
        stroke-width: 3px;
      }
    `}</style>
    </defs>
    <path
      className="svg-reviews-cls-1 primary"
      d="M74.39,40.15H39.61a6,6,0,0,0-6,6V58.93a6,6,0,0,0,6,6H50l7,11,6.07-11H74.39a6,6,0,0,0,6-6V46.11A6,6,0,0,0,74.39,40.15Z"
    />
    <path
      className="svg-reviews-cls-2 secondary"
      d="M62.05,48.29c-2.81-1.7-5,1.31-5,1.31s-2.24-3-5-1.31c-3.28,2-.91,5.91,0,7.16A48,48,0,0,0,57,60a48,48,0,0,0,5-4.55C63,54.2,65.33,50.29,62.05,48.29Z"
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
    viewBox="0 0 112 112"
  >
    <defs>
      <style>{`
      .svg-clients-cls-1,
      .svg-clients-cls-2 {
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      
      .svg-clients-cls-1 {
        stroke: currentColor;
        stroke-width: 2px;
      }
      
      .svg-clients-cls-2 {
        stroke: currentColor;
        stroke-width: 4px;
      }
    `}</style>
    </defs>
    <path
      className="svg-clients-cls-1 secondary"
      d="M58.44,63.63l3.14.48a2.07,2.07,0,0,1,1.17,3.51L60.43,70,61,73.18a2.09,2.09,0,0,1-1.71,2.39,2,2,0,0,1-1.34-.23l-2.68-1.46-2.68,1.46a2.07,2.07,0,0,1-2.81-.82,2,2,0,0,1-.23-1.34L50,70l-2.32-2.35a2.06,2.06,0,0,1,0-2.93,2.08,2.08,0,0,1,1.14-.58L52,63.63l1.34-2.8a2.08,2.08,0,0,1,3.75,0Z"
    />
    <path
      className="svg-clients-cls-2 primary"
      d="M60.85,46.15l6.36.9a3,3,0,0,1,1.63,5.16l-4.52,4.24,1.09,6.13a3,3,0,0,1-4.31,3.2l-5.87-3-5.86,3a3,3,0,0,1-4.31-3.2l1.09-6.13-4.53-4.24A3,3,0,0,1,41.49,48a3,3,0,0,1,1.77-.92l6.36-.9,2.94-5.75a3,3,0,0,1,4-1.3,3,3,0,0,1,1.3,1.3Z"
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
