const MobileHead = ({ handleOpenSubMobile, icon, title }) => {
  return (
    <div onClick={handleOpenSubMobile} className="menu menu--active cursor-pointer">
      <div className="menu__icon">{icon}</div>
      <div className="menu__title">{title}</div>
    </div>
  );
};

export default MobileHead;
