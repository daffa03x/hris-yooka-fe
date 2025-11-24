"use client";
import { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const SelectPegawai = memo(({ options, value, onChange, defaultValue = null, isEdit = false }) => {
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

  return <Select className="basic-single" classNamePrefix="select" isClearable={true} isSearchable={true} name="id_pegawai" options={options} value={selectedOption || options.find((option) => option.value === value) || null} onChange={handleChange} />;
});

SelectPegawai.displayName = "SelectPegawai";

export default SelectPegawai;
