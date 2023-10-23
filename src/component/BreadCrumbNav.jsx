import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

// const IconDashBoard = () => {
//   return (
//     <span>
//       {/* <i className='fa fa-home' aria-hidden='true'></i>Trang chủ */}
//       <i className='fa fa-home' aria-hidden='true'></i>Homepage
//     </span>
//   );
// };

// const routes = [
//     {
//       path: "/",
//       breadcrumb: IconDashBoard,
//     },
//   {
//     path: "/admin/user",
//     breadcrumb: "User management",
//   },
//   {
//     path: "/movie",
//     breadcrumb: "Movie management",
//   },
// ];

const routes = [
  {
    path: "/admin/user",
    breadcrumb: "User management",
  },
  {
    path: "/movie",
    breadcrumb: "Movie management",
  },
];

// const routes = [
//   {
//     path: "/admin/user",
//     breadcrumb: "User management",
//   },
// ];

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
