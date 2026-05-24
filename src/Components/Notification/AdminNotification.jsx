import React from 'react';

import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';

const AdminNotification = ({ setNotificationCom,data  }) => {
  
 const navigate = useNavigate();
 const instance = useAxios();

 // console.log(data)

 const notification = data?.result || [];
 // console.log(notification)

 const handleNavigate = async( item )=> {
   try {
     await instance.patch(`/api/notification/${item._id}`);

     navigate(item?.link);
     setNotificationCom(false);
   } catch (error) {
     console.log(error);
   }
 };
  return (
    <div className="absolute  right-0 top-[calc(100%+12px)] w-70 bg-primary border border-accent rounded-xl shadow-xl overflow-hidden z-50 flex flex-col cursor-default">
      {/* Header */}
      <div className="p-3 bg-secondary text-primary font-bold text-sm text-left">
        Notifications
      </div>

      <div className="h-72 overflow-y-auto flex flex-col bg-primary">
        {notification.map(item => (
          <div
            onClick={() => handleNavigate(item)}
            key={item._id}
            className={` p-2 border-b  mb-2  cursor-pointer border-accent/40 hover:bg-secondary/5  transition-colors text-left ${
              !item.is_read ? 'bg-secondary/5' : ''
            }`}
          >
            {/* Employee Profile Image */}
            <div className="avatar shrink-0 mt-0.5 flex justify-center items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-accent">
                <img
                  src={item.employ_image}
                  alt={item.employ_name}
                  onError={e => {
                    e.target.src = 'https://placehold.co/100x100?text=User';
                  }}
                />
              </div>
              <div>
                <p className="text-xs text-neutral font-medium leading-relaxed">
                  <span className="font-bold text-neutral mr-1">
                    {item.employ_name}
                  </span>
                </p>
              </div>
            </div>

            {/* Notification Content  */}
            <div className="flex flex-col min-w-0  justify-center items-center">
              <p className="opacity-80 ">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotification;
