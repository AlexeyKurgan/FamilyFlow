const Logo = ({ classNames }: { classNames?: string }) => {
  return (
    <>
      <svg
        width="200"
        height="60"
        viewBox="0 0 250 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames}
      >
        <line
          x1="10"
          y1="50"
          x2="115"
          y2="50"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="125"
          y1="50"
          x2="235"
          y2="50"
          stroke="#FABB18"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M15 10 Q125 -10, 235 10"
          stroke="black"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <text
          x="10"
          y="40"
          fontFamily="Poppins, sans-serif"
          fontSize="34"
          fontWeight="bold"
          fill="black"
        >
          Family
        </text>
        <text
          x="120"
          y="40"
          fontFamily="Poppins, sans-serif"
          fontSize="34"
          fontWeight="bold"
          fill="#FABB18"
        >
          Flow
        </text>
      </svg>
    </>
  );
};

export default Logo;
