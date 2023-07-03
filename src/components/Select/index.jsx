import React from "react";

export const Select = ({
  options,
  label,
  required,
  value,
  error,
  onChange,
  ...selectProps
}) => {
  return (
    <>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      <select
        className={`select form__input ${!!error ? "formerror" : ""}`}
        defaultValue=""
        value={value}
        {...selectProps}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!!error && <p className="error">{error}</p>}
    </>
  );
};
