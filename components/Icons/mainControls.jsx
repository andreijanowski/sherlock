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
    fill="currentColor"
  >
    <path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z" />
  </svg>
);

export const UploadFileIcon = () => (
  <svg
    width="46"
    height="33"
    viewBox="0 0 46 33"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.9899 9.82579C34.3551 9.82579 33.7341 9.88758 33.1292 9.99386C31.6204 4.69222 26.9468 0.831543 21.4107 0.831543C14.651 0.831543 9.1747 6.58549 9.1747 13.6815C9.1747 14.3143 9.2207 14.9371 9.3058 15.5501C8.97845 15.5065 8.64895 15.4843 8.3191 15.4833C3.7237 15.4833 0 19.3935 0 24.2205C0 29.0476 3.7237 32.9627 8.3191 32.9627H18.4V23.0762H12.65L23 10.7181L33.35 23.0762H27.6V32.9627H34.9899C41.0688 32.9627 46 27.7822 46 21.3955C46 15.0038 41.0688 9.82579 34.9899 9.82579Z"
      fill="currentColor"
    />
  </svg>
);

export const CircleWarningIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 6.3999V9.9999"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13.6001H10.009"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Arrow = () => (
  <svg
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.61475 12L7.61475 2"
      stroke="#4C68FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7L7.5 2L13 7"
      stroke="#4C68FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00012 2L8.00012 12"
      stroke="#F38176"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 7L8 12L2 7"
      stroke="#F38176"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AcceptedDetectiveIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <g filter="url(#filter0_d)">
        <path
          d="M16.0001 29.7142C23.5742 29.7142 29.7143 23.5741 29.7143 15.9999C29.7143 8.42574 23.5742 2.28564 16.0001 2.28564C8.42586 2.28564 2.28577 8.42574 2.28577 15.9999C2.28577 23.5741 8.42586 29.7142 16.0001 29.7142Z"
          fill="black"
        />
      </g>
      <path
        d="M16.0001 29.7142C23.5742 29.7142 29.7143 23.5741 29.7143 15.9999C29.7143 8.42574 23.5742 2.28564 16.0001 2.28564C8.42586 2.28564 2.28577 8.42574 2.28577 15.9999C2.28577 23.5741 8.42586 29.7142 16.0001 29.7142Z"
        fill="#4C68FF"
      />
      <path
        d="M12.8092 20.6574C13.9578 20.6574 14.8888 19.796 14.8888 18.7335C14.8888 17.6709 13.9578 16.8096 12.8092 16.8096C11.6607 16.8096 10.7296 17.6709 10.7296 18.7335C10.7296 19.796 11.6607 20.6574 12.8092 20.6574Z"
        stroke="#93A4FF"
        strokeWidth="0.857143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.7821 20.6574C19.9307 20.6574 20.8617 19.796 20.8617 18.7335C20.8617 17.6709 19.9307 16.8096 18.7821 16.8096C17.6336 16.8096 16.7025 17.6709 16.7025 18.7335C16.7025 19.796 17.6336 20.6574 18.7821 20.6574Z"
        stroke="#93A4FF"
        strokeWidth="0.857143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8407 19.1457C15.0984 18.8998 15.4402 18.7627 15.7956 18.7627C16.151 18.7627 16.4929 18.8998 16.7505 19.1457"
        stroke="#93A4FF"
        strokeWidth="0.857143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5473 22.5703C18.5627 22.5734 18.5786 22.5707 18.5922 22.5629C18.6058 22.5551 18.6161 22.5426 18.6213 22.5277C18.6265 22.5129 18.6261 22.4966 18.6203 22.482C18.6145 22.4674 18.6037 22.4554 18.5897 22.4481C17.7467 21.9328 16.7837 21.6487 15.7971 21.624C14.8384 21.6436 13.9006 21.9087 13.0724 22.3942C13.0543 22.4039 13.0402 22.4198 13.0325 22.439C13.0249 22.4582 13.0242 22.4795 13.0306 22.4992C13.037 22.5188 13.0501 22.5356 13.0676 22.5465C13.085 22.5574 13.1058 22.5619 13.1262 22.559L18.5473 22.5703Z"
        fill="white"
        stroke="white"
        strokeWidth="0.571429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.4082 14.6812L21.0371 14.3686C20.9668 14.3558 20.902 14.3218 20.8514 14.271C20.8008 14.2202 20.7669 14.1551 20.7542 14.0844L20.0469 11.3278C19.9128 10.8778 19.7512 10.4365 19.563 10.0064C19.314 9.3812 18.6293 9.0885 18.0238 8.88957C17.3824 8.68822 16.7153 8.58102 16.0433 8.57129H15.6783C15.0063 8.58102 14.3392 8.68822 13.6977 8.88957C13.0922 9.0885 12.4075 9.3812 12.1585 10.0064C11.9704 10.4365 11.8088 10.8778 11.6747 11.3278L10.9673 14.0844C10.9546 14.1551 10.9207 14.2202 10.8702 14.271C10.8196 14.3218 10.7548 14.3558 10.6844 14.3686L8.31336 14.6812C8.24659 14.693 8.18419 14.7226 8.13267 14.7668C8.08116 14.8111 8.0424 14.8684 8.02044 14.9329C7.99848 14.9973 7.99412 15.0664 8.00782 15.1331C8.02152 15.1998 8.05277 15.2616 8.09833 15.312C8.75192 15.9543 10.26 17.2331 15.7377 17.27H15.9754C21.4559 17.2331 22.964 15.9543 23.6147 15.312C23.6602 15.2622 23.6916 15.201 23.7058 15.1349C23.72 15.0688 23.7163 15.0001 23.6953 14.9359C23.6743 14.8716 23.6366 14.8142 23.5861 14.7694C23.5357 14.7247 23.4742 14.6942 23.4082 14.6812Z"
        fill="white"
        stroke="white"
        strokeWidth="0.857143"
        strokeMiterlimit="10"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="5.22137e-05"
        y="0.857073"
        width="32"
        height="32"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.857143" />
        <feGaussianBlur stdDeviation="1.14286" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.3 0 0 0 0 0.41 0 0 0 0 1 0 0 0 0.48 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <clipPath id="clip0">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const MainInfoIcon = () => (
  <svg
    width="43"
    height="43"
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="21.5001" cy="9.95097" r="2.40196" fill="#0F1554" />
    <path
      d="M19.0981 16.8137C19.0981 15.4872 20.1735 14.4118 21.5001 14.4118V14.4118C22.8267 14.4118 23.9021 15.4872 23.9021 16.8137V22.9902C23.9021 24.3168 22.8267 25.3922 21.5001 25.3922V25.3922C20.1735 25.3922 19.0981 24.3168 19.0981 22.9902V16.8137Z"
      fill="#0F1554"
    />
    <defs>
      <filter
        id="filter0_d_207_1057"
        x="0"
        y="0"
        width="43"
        height="43"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_207_1057"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_207_1057"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const InfoIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 12000 12000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="p137UvyeWP"
      d="M5665 10859 c-244 -17 -519 -59 -765 -115 -1110 -257 -2095 -899 -2793 -1822 -480 -634 -805 -1408 -922 -2195 -42 -282 -50 -398 -50 -727 0 -329 8 -445 50 -727 239 -1615 1301 -3021 2797 -3705 487 -222 1009 -361 1578 -420 165 -17 716 -17 880 0 455 47 846 136 1235 279 673 249 1255 622 1765 1133 667 666 1110 1472 1315 2390 79 356 110 644 110 1050 0 406 -31 694 -110 1050 -254 1139 -895 2133 -1833 2843 -922 698 -2095 1046 -3257 966z m785 -754 c679 -78 1283 -298 1840 -670 954 -637 1601 -1640 1784 -2765 42 -258 50 -370 50 -670 0 -298 -8 -408 -50 -669 -115 -721 -432 -1415 -903 -1976 -644 -766 -1533 -1274 -2502 -1429 -263 -42 -371 -50 -669 -50 -300 0 -411 8 -670 50 -572 93 -1104 300 -1591 619 -968 633 -1632 1654 -1813 2786 -42 263 -50 371 -50 669 0 298 8 406 50 669 184 1153 865 2182 1864 2819 591 376 1217 578 1975 636 108 8 557 -4 685 -19z"
    />
    <path
      id="puInvv4RX"
      d="M4570 8812 l0 -189 244 -7 c318 -9 368 -21 438 -107 60 -75 59 -37 56 -1375 l-3 -1219 -22 -41 c-73 -136 -220 -180 -575 -172 l-208 5 0 -183 0 -182 73 -6 c84 -6 2072 -76 2165 -76 l62 0 0 1583 c0 1517 1 1584 19 1623 24 53 78 96 147 118 65 20 238 35 412 36 l122 0 0 190 0 190 -1465 0 -1465 0 0 -188z"
    />
    <path
      id="p1BGpt0d23"
      d="M5735 4666 c-296 -68 -527 -277 -627 -566 -32 -92 -33 -100 -32 -255 0 -148 2 -167 28 -245 98 -298 335 -515 630 -576 104 -22 273 -19 371 6 376 96 635 425 636 807 0 375 -227 688 -584 806 -80 26 -110 30 -227 33 -91 3 -155 -1 -195 -10z"
    />
  </svg>
);

export const BellIcon = () => (
  <svg
    width="43"
    height="43"
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.5032 16.0131C25.5032 15.0423 25.1176 14.1114 24.4312 13.425C23.7448 12.7386 22.8138 12.3529 21.8431 12.3529C20.8724 12.3529 19.9414 12.7386 19.255 13.425C18.5686 14.1114 18.183 15.0423 18.183 16.0131C18.183 20.2832 16.3529 21.5033 16.3529 21.5033H27.3333C27.3333 21.5033 25.5032 20.2832 25.5032 16.0131Z"
      fill="#0F1554"
      stroke="#0F1554"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.8985 23.9434C22.7913 24.1282 22.6373 24.2817 22.4521 24.3884C22.2669 24.4951 22.0569 24.5512 21.8432 24.5512C21.6294 24.5512 21.4195 24.4951 21.2342 24.3884C21.049 24.2817 20.8951 24.1282 20.7878 23.9434"
      stroke="#0F1554"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_207_1061"
        x="0"
        y="0"
        width="43"
        height="43"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_207_1061"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_207_1061"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const WatchVideosIcon = () => (
  <svg
    width="43"
    height="43"
    viewBox="0 0 43 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.0344 12.55C30.927 12.1076 30.7081 11.7022 30.4 11.3749C30.0918 11.0475 29.7053 10.8098 29.2795 10.6856C27.7236 10.2941 21.5001 10.2941 21.5001 10.2941C21.5001 10.2941 15.2765 10.2941 13.7206 10.7229C13.2948 10.8471 12.9083 11.0848 12.6001 11.4122C12.292 11.7395 12.0732 12.1449 11.9657 12.5873C11.6809 14.2145 11.5417 15.8652 11.5496 17.5186C11.5394 19.1845 11.6787 20.8478 11.9657 22.4872C12.0842 22.9159 12.3079 23.3058 12.6153 23.6194C12.9227 23.9329 13.3034 24.1594 13.7206 24.2771C15.2765 24.7059 21.5001 24.7059 21.5001 24.7059C21.5001 24.7059 27.7236 24.7059 29.2795 24.2771C29.7053 24.1529 30.0918 23.9151 30.4 23.5878C30.7081 23.2604 30.927 22.8551 31.0344 22.4127C31.317 20.7977 31.4562 19.1596 31.4505 17.5186C31.4607 15.8527 31.3214 14.1895 31.0344 12.55Z"
      fill="white"
      stroke="#0F1554"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.098 20.5882L25.9608 17.5L19.098 14.4118V20.5882Z"
      fill="#0F1554"
      stroke="#0F1554"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_207_1065"
        x="0"
        y="0"
        width="43"
        height="43"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_207_1065"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_207_1065"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
