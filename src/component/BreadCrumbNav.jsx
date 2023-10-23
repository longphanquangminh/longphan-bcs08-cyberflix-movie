import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

let IconDashBoard = () => {
  return (
    <span>
      <i className='fa fa-home' aria-hidden='true'></i>Trang chủ
    </span>
  );
};

let routes = [
  {
    path: "/",
    breadcrumb: IconDashBoard,
  },
  {
    path: "/user",
    breadcrumb: "Quản lý người dùng",
  },
  {
    path: "/movie",
    breadcrumb: "Quản lý phim",
  },
];

export default function BreadCrumbNav() {
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <Breadcrumb className='p-5'>
      {breadcrumbs.map(({ breadcrumb, match }, index) => {
        console.log("😀 - {breadcrumbs.map - match:", match);
        return (
          <Breadcrumb.Item key={index}>
            <NavLink to={match.pathname}>{breadcrumb}</NavLink>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
