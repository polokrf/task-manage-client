import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const EmployNotification = ({ setNotificationCom, empolyData }) => {
  const navigate = useNavigate();
  const instance = useAxios()

  // console.log(data)

  const notification = empolyData?.result || [];
  // console.log(notification)

  const handleNavigate =async( item) => {
  try {
    
   await instance.patch(`/api/notification/${item._id}`)
   
    navigate(item?.link);
    setNotificationCom(false);
    
  } catch (error) {
    console.log(error)
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
            className={`p-3 border-b cursor-pointer border-accent/40 hover:bg-secondary/5 transition-colors text-left ${
              !item.is_read ? 'bg-secondary/5' : ''
            }`}
          >
            {/* Top Row: Image & Name together */}
            <div className="flex items-center gap-2 ">
              <div className="avatar shrink-0">
                <div className="w-8 h-8 rounded-full border border-accent overflow-hidden">
                  <img
                    src={item?.admin_image}
                    alt={item?.admin_name}
                    onError={e => {
                      e.target.src = 'https://placehold.co/100x100?text=User';
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-neutral font-bold truncate">
                {item?.admin_name}
              </p>
            </div>

            {/* Bottom Row: Title nicely placed below */}
            <div className="pl-[40px]">
              <p className="text-xs text-neutral opacity-80 break-words leading-relaxed">
                {item?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployNotification;