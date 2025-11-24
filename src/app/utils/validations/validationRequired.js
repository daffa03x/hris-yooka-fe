export const validationRequired = ({ formData, requiredFields, setError }) => {
  for (let field of requiredFields) {
    if (!formData[field]) {
      setError(`Field ${field} harus diisi`);
      return false; // Tidak valid
    }
  }
  setError(""); // Clear error
  return true; // Valid
};
