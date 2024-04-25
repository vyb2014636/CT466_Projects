import React, { useState } from "react";
import Collapse from "react-collapse";
import { createSlug } from "ultils/helpers";
import { NavLink } from "react-router-dom";
import icons from "ultils/icons";
import { useSelector } from "react-redux";

const Sidebar = () => {
  let { categories } = useSelector((state) => state.app);

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { FaChevronDown } = icons;

  return (
    <div className="card">
      <div
        onClick={handleToggle}
        className={`card_heading  flex justify-between collapsed text-black ${isOpen ? "active" : ""}`}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <NavLink key={"category"}>Categories</NavLink>
        <FaChevronDown />
      </div>
      <Collapse isOpened={isOpen}>
        <div className="card-body">
          <div className="shop__sidebar__categories text-left">
            <ul className="overflow-y-hidden outline-none tabindex-1">
              {categories.map((el) => (
                <li key={createSlug(el.title)}>
                  <NavLink
                    key={createSlug(el.title)}
                    to={createSlug(el.title)}
                    className={({ isActive }) => (isActive ? "" : " text-gray-400 hover:text-black")}
                  >
                    {el.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
// style="overflow-y: hidden; outline: none;" trong class nice-scroll
export default Sidebar;
