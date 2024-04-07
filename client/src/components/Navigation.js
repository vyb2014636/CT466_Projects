import React, { memo } from "react";
import { navigation } from "../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 px-4 flex flex-col items-center justify-center">
      <nav className="header__menu mobile-menu flex justify-center">
        <ul className="flex gap-6 ">
          {navigation.map((el) => (
            <li className="active relative" key={el.id}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 text-[18px] border-red-500 font-semibold"
                    : "hover:after:content-[''] hover:border-b-2 hover:border-red-500 transition-all transform text-[18px] font-semibold"
                }
              >
                {el.value}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default memo(Navigation);
