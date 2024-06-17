import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarItem } from "../components";

export const DashboardLayout = () => {
  return (
    <main className="p-1">
      <div className="flex flex-row w-11/12 mx-auto bg-white bg-opacity-10 rounded-s-xl	mt-3">
        <nav className="hidden sm:flex flex-col w-[370px] min-h-[calc(100vh-3.0rem)] bg-slate-800	bg-opacity-30 p-5 border-r-2  border-r-slate-700">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-indigo-700 via-indigo-200 bg-clip-text text-transparent text-center">
            BrainWave
          </h1>
          <span className="text-xl text-center">Bienvenido!!</span>
          <div className="border-gray-700 border my-3" />
          {menuRoutes.map((option) => (
            <SidebarItem key={option.to} {...option} />
          ))}
        </nav>
        <section className="flex flex-col w-full h-[calc(100vh-50px)]  bg-slate-600 bg-opacity-25 p-5">
          <div className="flex flex-row h-full">
            <div className="flex flex-col flex-auto h-full p-1">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
