const Button = ({
  children,
  className,
  type,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
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
      >
        {children}
      </button>
    </>
  );
};

export default Button;
