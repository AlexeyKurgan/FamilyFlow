const PlaneSVG = ({ className }: { className?: string }) => {
  return (
    <>
      <svg
        width="238"
        height="162"
        viewBox="0 0 238 162"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clipPath="url(#clip0_1_2722)">
          <path
            d="M127.9 37.5L97 13.5L237.7 0L196.6 93L155.8 60.2678L126.1 75.3L143.5 50.4L237.7 0L127.9 37.5Z"
            fill="#FCECEB"
          />
          <path
            d="M125.8 75.9L127.6 37.8L238 0L143.5 50.1L125.8 75.9Z"
            fill="#EE7C92"
          />
          <path
            d="M0.5 162C66 162 83 151.5 83 102C83 49.0001 33 55.5001 33 85.5C33 127.586 126 150.5 126 76.5"
            stroke="#DED2FA"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12.68 12.68"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_2722">
            <rect
              width="237.5"
              height="162"
              fill="white"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default PlaneSVG;
