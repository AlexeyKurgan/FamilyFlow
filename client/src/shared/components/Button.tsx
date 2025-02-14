const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <button
        className={`
            border-2
            border-transparent
            shadow-xl     
            rounded-lg
            cursor-pointer
            text-base
            font-semibold
            w-full
            flex 
            justify-center 
            align-middle
            delay-150
            p-[9px]
            transition duration-300
            ease-linear
            ${className}`}
        type="button"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
