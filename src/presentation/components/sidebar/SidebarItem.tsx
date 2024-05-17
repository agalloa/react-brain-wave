import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: string;
  title: string;
}

export const SidebarItem = ({ to, icon, title }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-gray-800 rounded	mt-2 p-2 transition-colors"
          : "flex justify-center items-center hover:bg-gray-800 rounded	mt-2 p-2 transition-colors"
      }
    >
      <i className={`${icon} text-2xl mr-4 text-white`}></i>
      <div className="flex flex-col flex-grow">
        <span className="text-white text-md">{title}</span>
      </div>
    </NavLink>
  );
};
