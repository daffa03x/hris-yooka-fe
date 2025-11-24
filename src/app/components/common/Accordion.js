const Accordion = ({ identitas_name, children }) => {
  return (
    <div className="intro-y box mt-5">
      <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto">{identitas_name}</h2>
      </div>
      {children}
    </div>
  );
};

export default Accordion;
