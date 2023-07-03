import React, { forwardRef, useImperativeHandle, useRef } from "react";

const InputM = (
  {
    // @ts-ignore
    label,
    // @ts-ignore
    required,
    // @ts-ignore
    error,
    // @ts-ignore
    renderInput = undefined,
    ...inputProps
    // @ts-ignore
  },
  ref
) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => {
    return {
      getValue: () => inputProps?.value || '',
      // @ts-ignore
      focusInput: () => inputRef?.current.focus(),
      cfd: "Xin chào"
    }
  })

  return (
    <>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.(inputProps) || (
        <input
          ref={inputRef}
          className={`form__input ${!!error ? "formerror" : ""}`}
          {...inputProps}
        />
      )}

      <p className="error">{error || ""}</p>
    </>
  );
};

export const Input = forwardRef(InputM);

