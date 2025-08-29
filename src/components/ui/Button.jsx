import React from "react";
import clsx from "clsx";

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth,
  loading = false, // renamed for external prop
  loadingText, // optional text during loading
  disabled,
  className,
  children,
  ...props
}) => {
  const isLoading = loading; // internal alias for consistency

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all relative select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400",
    outline:
      "bg-transparent text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm h-9 min-h-[44px]",
    md: "px-4 py-2 text-base h-11 min-h-[44px]",
    lg: "px-6 py-3 text-lg h-13 min-h-[48px]",
  };

  const spinner =
    "absolute w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin";

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className={spinner} />}
      <span className={clsx(isLoading && "opacity-0")}>
        {isLoading && loadingText ? loadingText : children}
      </span>
    </button>
  );
};

export default Button;
