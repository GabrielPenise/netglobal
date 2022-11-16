import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaStoreAlt,
  FaRegCalendarAlt,
  FaRegChartBar,
} from "react-icons/fa";

import style from "../assets/styles/components/SideBar.module.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Super Admin",
      icon: <FaTh />,
    },
    {
      path: "/guards",
      name: "Vigiladores",
      icon: <FaUserAlt />,
    },
    {
      path: "/sucursales",
      name: "Sucursales",
      icon: <FaStoreAlt />,
    },
    {
      path: "/calendar",
      name: "Calendario",
      icon: <FaRegCalendarAlt />,
    },
    {
      path: "/reports",
      name: "Reportes",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <div className={` ${style}[containerSideBar]`}>
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className={style["sidebar"]}
      >
        <div className={style["top_section"]}>
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className={style["logo"]}
          ></h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className={style["bars"]}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            to={item.path}
            key={index}
            className={style["link"]}
            activeclassName="active"
          >
            <div className={style["icon"]}>{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={style["link_text"]}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
