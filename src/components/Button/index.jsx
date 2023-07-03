import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export const Button = ({
  variant = "primary",
  link = '',
  className,
  children,
  disabled,
  ...rest
}) => {
  // variants includes border and primary

  const variantClassName = useMemo(() => {
    if (disabled) {
      return "btn btn--grey"
    }

    switch (variant) {
      case "primary":
        return "btn btn--primary";

      case "border":
        return "btn btn--border --black";

      default:
        return "";
    }
  }, [variant, disabled]);

  if (!link) {
    return (
      <button className={`${variantClassName} ${className ?? ""}`} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <Link
      to={link}
      className={`${variantClassName} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
};
