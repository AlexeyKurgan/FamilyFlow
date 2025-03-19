const Button = ({
  children,
  className,
  type,
  disabled,
  form,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  form?: string;
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        form={form}
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
            flex-wrap 
            justify-between 
            align-middle
            items-center
            delay-150
            py-[9px]
            px-[10px]
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
