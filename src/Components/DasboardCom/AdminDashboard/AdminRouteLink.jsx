import { FilePlus, LayersPlus, Users } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router';

const AdminRouteLink = () => {
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to="/dashboard/all-user"
        >
          <Users className=" size-4" />
          <span className="is-drawer-close:hidden">All Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to={'/dashboard/task'}
        >
          <LayersPlus className=" size-4" />

          <span className="is-drawer-close:hidden">Tasks</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to={'/dashboard/assign-task'}
        >
          <FilePlus className=" size-4" />
          <span className="is-drawer-close:hidden">Assign Task</span>
        </NavLink>
      </li>
    </>
  );
};

export default AdminRouteLink;