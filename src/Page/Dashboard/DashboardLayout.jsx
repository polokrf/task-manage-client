import { BellRing, Home, Settings, LogOut } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import AsideBare from '../../Components/DasboardCom/AsideBare';
import { useAuth } from '../../Hooks/useAuth';
import EmployNotification from '../../Components/Notification/EmployNotification';
import AdminNotification from '../../Components/Notification/AdminNotification';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';

const DashboardLayout = () => {
  const { user } = useAuth()
  const [notificationCom, setNotificationCom] = useState(false)
  const instance = useAxios();
  // console.log(notification)

  const { data = [] } = useQuery({
    queryKey: ['admin-notification'],
    queryFn: async () => {
      const res = await instance.get('api/notification/admin');
      return res.data;
    },
    enabled: user?.role === 'admin',
    refetchInterval: 6000,
  });
  
   const { data: empolyData = [] } = useQuery({
     queryKey: ['admin-notification', user?.email],
     queryFn: async () => {
       const res = await instance.get(
         `api/notification/employ?email=${user?.email}`,
       );
       return res.data;
     },
     enabled: !!user?.email,
     refetchInterval: 6000,
   });
 const notificationLength = useMemo(() => {
   if (data?.result && data.result.length > 0) {
     return data.result.length;
   }
   return empolyData?.result?.length || 0;
 }, [data,empolyData]);
  
 console.log(notificationLength)
  // console.log(empolyData)
  return (
    <div className="drawer lg:drawer-open text-neutral bg-primary">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-primary ">
        {/* Navbar */}
        <nav className="navbar w-full bg-primary border-b border-accent flex justify-between items-center sticky top-0 z-100">
          <div className="px-4 flex items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-neutral "
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>

            {/* nav title */}
            <h1 className=" font-bold font-xl truncate   capitalize text-secondary">
              manage Work
            </h1>
          </div>

          {/* nav profile */}
          <div className="flex relative items-center justify-center gap-4 px-4">
            <button
              onClick={() => setNotificationCom(!notificationCom)}
              className="relative text-neutral flex items-center cursor-pointer focus:outline-none"
            >
              <BellRing className="size-5" />

              {notificationLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {notificationLength}
                </span>
              )}
            </button>
            <div>
              {notificationCom && (
                <div>
                  {user?.role === 'admin' && (
                    <AdminNotification
                      setNotificationCom={setNotificationCom}
                      data={data}
                    />
                  )}

                  {user?.role === 'employ' && (
                    <EmployNotification
                      empolyData={empolyData}
                      setNotificationCom={setNotificationCom}
                    />
                  )}
                </div>

               
              )}
            </div>

            <img
              title={user?.name}
              src={user?.image}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover border border-accent"
            />
          </div>
        </nav>

        {/* Page content here */}
        <div className="py-4  px-2 md:px-4 text-neutral bg-primary">
          <Outlet />
        </div>
      </div>

      {/* side bare */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <AsideBare />
      </div>
    </div>
  );
};

export default DashboardLayout;
