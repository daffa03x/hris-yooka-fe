"use client";
import { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

const SelectReact = memo(({ options, value, onChange, defaultValue = null, isEdit = false, name_field }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Jika mode edit dan ada defaultValue, set selectedOption
    if (isEdit && defaultValue) {
      const defaultOpt = options.find((opt) => opt.value === defaultValue);
      if (defaultOpt) {
        setSelectedOption(defaultOpt);
      }
    }
  }, [defaultValue, options, isEdit]);

  // Handle perubahan select
  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return <ReactSelect className="basic-single" classNamePrefix="select" isClearable={true} isSearchable={true} name={name_field} options={options} value={selectedOption || options.find((option) => option.value === value) || null} onChange={handleChange} />;
});

SelectReact.displayName = "SelectReact";

export default SelectReact;
