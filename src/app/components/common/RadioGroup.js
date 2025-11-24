const RadioGroup = ({ name, value, onChange, options }) => {
  return (
    <div className="flex flex-col sm:flex-row mt-2">
      {options.map((option) => (
        <div key={option.value} className="form-check mr-5 mt-2 sm:mt-0">
          <input type="radio" value={option.value} name={name} checked={value === option.value} onChange={onChange} className="form-check-input" />
          <label className="form-check-label">{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
