import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItemAdmin = [
    {
      path: "/superadmin",
      name: "Super Admin",
      icon: <FaTh />,
    },
  ];

  const menuItemClients = [
    {
      path: "/guards",
      name: "Vigiladores",
      icon: <FaUserAlt />,
    },
    {
      path: "/branch",
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
    <div className={style["containerSideBar"]} style={{ maxWidth: "200px" }}>
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

        {!user.super_admin
          ? menuItemClients.map((item, index) => (
              <Link to={item.path} key={index}>
                <div
                  key={index}
                  className={style["link"]}
                  activeClassName="active"
                >
                  <div className={style["icon"]}>{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className={style["link_text"]}
                  >
                    {item.name}
                  </div>
                </div>
              </Link>
            ))
          : menuItemAdmin.map((item, index) => (
              <Link to={item.path} key={index}>
                <div
                  key={index}
                  className={style["link"]}
                  activeClassName="active"
                >
                  <div className={style["icon"]}>{item.icon}</div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className={style["link_text"]}
                  >
                    {item.name}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
