import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { createSlug } from "ultils/helpers";
import icons from "ultils/icons";

const Breadcrum = ({ title, category }) => {
  const { IoIosArrowForward } = icons;
  const routes = [
    { path: "/", breadcrumb: "Trang chủ" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:pid", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <div className="text-md flex items-center gap-1">
      {breadcrumbs
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) =>
          index !== self.length - 1 ? (
            <Link
              className="flex gap-1 items-center hover:text-orange-500 capitalize"
              key={match.pathname}
              to={createSlug(match.pathname)}
            >
              <span>{breadcrumb}</span>
              <IoIosArrowForward />
            </Link>
          ) : (
            <div className="flex gap-1 items-center  capitalize" key={match.pathname}>
              <span className="text-gray-400">{breadcrumb}</span>
            </div>
          )
        )}
    </div>
  );
};

export default Breadcrum;
