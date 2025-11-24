const HeadSidebar = ({ openSidebar, handleOpenSidebar, children, title, icon }) => {
  return (
    <>
      <div onClick={handleOpenSidebar} className={`side-menu cursor-pointer ${openSidebar ? "side-menu--active" : ""}`}>
        <div className="side-menu__icon">{icon}</div>
        <div className="side-menu__title">
          {title}
          <div className="side-menu__sub-icon transform rotate-180">
            <i data-lucide="chevron-down"></i>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default HeadSidebar;
