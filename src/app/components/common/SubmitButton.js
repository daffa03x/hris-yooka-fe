const SubmitButton = ({ isSubmitting }) => {
  if (isSubmitting) {
    return (
      <button
        type="submit"
        className="btn btn-primary w-24 xl:mr-3 align-top loading relative unique-loading-btn"
        disabled
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <span className="text" style={{ visibility: "hidden" }}>
          Loading
        </span>
        <div className="submit"></div>
      </button>
    );
  }
  return (
    <button className="btn btn-primary w-24 ml-2" type="submit">
      Simpan
    </button>
  );
};

export default SubmitButton;
