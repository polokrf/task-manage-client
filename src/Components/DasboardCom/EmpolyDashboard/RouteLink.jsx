import React from 'react';
import { NavLink } from 'react-router';
import { IoCreateOutline } from 'react-icons/io5';
import { FilePlus,  LayersPlus,  UserPen, } from 'lucide-react';

const RouteLink = () => {
  return (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to={'/dashboard/my-task'}
        >
          <IoCreateOutline className=" size-4" />
          <span className="is-drawer-close:hidden">My Tasks</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to={'/dashboard/task-status'}
        >
          <LayersPlus className=" size-4" />

          <span className="is-drawer-close:hidden">Completed Task</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'text-secondary underline' : 'hover:bg-accent'
          }
          to={'/dashboard/my-profile'}
        >
          <UserPen className="size-4" />
          <span className="is-drawer-close:hidden">Profile</span>
        </NavLink>
      </li>
    </>
  );
};

export default RouteLink;