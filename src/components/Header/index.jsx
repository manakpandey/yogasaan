import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import IconHome from "../../icons/home";
import IconProfile from "../../icons/profile";
import IconStats from "../../icons/stats";

import "./index.scss";

export default function Header() {
  const path = useLocation();

  const isSelected = (name) => {
    return name === path.pathname;
  };

  const IconLink = ({ icon, to, name }) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        className={"header_link"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to={to}>
          <icon.type color={isSelected(to) || hover ? "#6B38FB" : "#000"} />
        </Link>
        {isSelected(to) && <div>{name}</div>}
      </div>
    );
  };

  return (
    <div className={"header"}>
      <div className={"header_logo"}>LOGO</div>
      <div className={"header_links"}>
        <IconLink icon={<IconHome />} to="/" name="Home" />
        <IconLink icon={<IconStats />} to="/stats" name="Analytics" />
        <IconLink icon={<IconProfile />} to="/profile" name="Profile" />
      </div>
    </div>
  );
}
