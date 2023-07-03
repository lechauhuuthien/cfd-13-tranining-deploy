import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext({
  selectedValue: "",
  handleChange: () => {},
});

// Component cha
const Radio = ({ children, defaultValue, onChange, disabled, ...props }) => {
  console.log("defaultValue", defaultValue);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue );
  }, [defaultValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioContext.Provider value={{ selectedValue, handleChange }}>
      <div style={{ pointerEvents: disabled ? "none" : "auto" }} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

// Component con
const RadioOption = ({ value, children, className }) => {
  const { selectedValue, handleChange } = useContext(RadioContext);
  return (
    <label className={`radiocontainer ${className}`}>
      <input
        type="radio"
        name="radio"
        value={value}
        checked={selectedValue === value}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

Radio.Option = RadioOption;

export default Radio;
