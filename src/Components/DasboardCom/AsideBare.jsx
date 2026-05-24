import { Home, LogOut } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router';
import RouteLink from './EmpolyDashboard/RouteLink';
import AdminRouteLink from './AdminDashboard/AdminRouteLink';
 import { VscCopilotSuccess } from 'react-icons/vsc';
import { useAuth } from '../../Hooks/useAuth';

const AsideBare = () => {
  const { logout, user, loading, token } = useAuth()
   if (loading || (token && !user)) {
     return <p>loading ...</p>;
   }
  return (
    <div className="flex min-h-full pt-3.5 flex-col items-start bg-primary is-drawer-close:w-14 is-drawer-open:w-64 border-r border-accent">
      {/* Sidebar content here */}
      <div className="  w-full px-5 pb-4.5    gap-1 border-b border-accent space-x-1">
        <VscCopilotSuccess size={24} className=" text-secondary inline-block" />
        <span className="  text-secondary font-bold text-xl is-drawer-close:hidden">
          taskManager
        </span>
      </div>
      <ul className="menu w-full grow p-2 space-y-1 ">
        {/* List item */}
        <li>
          <NavLink
            end={true}
            to={'/dashboard'}
            className={({ isActive }) => isActive ?'text-secondary underline' : 'hover:bg-accent'}
           
            data-tip="Homepage"
          >
            {/* Home icon instead of raw SVG */}
            <Home className="size-4 shrink-0" />
            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>
        {user?.role === 'admin' && <AdminRouteLink />}
        {user?.role === 'employ' && <RouteLink />}
       
      </ul>

      {/* Logout Action (Icon Only) */}
      <div className="w-full p-2 border-t border-accent">
        <button
          onClick={() => logout()}
          className="w-full cursor-pointer p-2 text-neutral hover:text-primary hover:bg-secondary rounded-lg flex items-center justify-center lg:justify-start gap-2 transition-all"
        >
          <LogOut className="size-4 shrink-0" />
          <span className="is-drawer-close:hidden hidden lg:block font-medium text-sm">
            LogOut
          </span>
        </button>
      </div>
    </div>
  );
};

export default AsideBare;