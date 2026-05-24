import React from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2,  ClipboardList, Clock, } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Link } from 'react-router';
const EmpolyDashboard = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const res = await instance.get(`/api/dash/overView/employ?email=${user?.email}`);
      return res.data.result;
    },
  });

  const overviewData = [
   

    { name: 'totalTask', value: data?.totalTAsk  || 0},
    { name: 'Pending', value: data?.totalPending || 0 },
    { name: 'inprogress', value: data?.totalInprogress || 0 },
    { name: 'done', value: data?.totalDone || 0 },
  ];

  console.log(data)
  return (
    <div className="w-full min-h-screen bg-primary  text-neutral">
      <div className=" text-center space-y-2">
        <h2 className=" text-3xl text-secondary font-bold"> Welcome To</h2>
        <h4 className=" text-2xl font-bold text-secondary mb-5">
          {user?.name}
        </h4>
      </div>
      <div className="md:max-w-7xl w-full mx-auto flex flex-col gap-6">
        {/* STATS CARDS SECTION*/}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 justify-center">
          {/*  Total Tasks */}
          <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Total Tasks
              </span>
              <span className="text-3xl font-extrabold text-neutral">
                {data?.totalTAsk}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Pending Tasks
              </span>
              <span className="text-3xl font-extrabold text-neutral">
                {data?.totalPending}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* total inprogress */}
          <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Inprogress Tasks
              </span>
              <span className="text-3xl font-extrabold text-neutral">
                {data?.totalInprogress}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/*  Completed Tasks */}
          <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Completed Tasks
              </span>
              <span className="text-3xl font-extrabold text-neutral">
                {data?.totalDone}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/*CHARTS & LISTS GRID*/}
        <div className="grid grid-cols-1 gap-4">
          {/* Chart Left: Tasks Overview AreaChart */}
          <div className="bg-primary border border-accent rounded-2xl p-5 shadow-sm lg:col-span-1 combined-class ">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-neutral">
                Tasks Overview
              </h3>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={overviewData}
                  margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorTasks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Tasks  */}

          {data?.recentTask?.length > 0 && (
            <div className="bg-primary border border-accent rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold text-neutral">
                    Recent Tasks
                  </h3>
                  <Link
                    to="/dashboard/my-task"
                    className="text-xs font-bold text-secondary hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    View All
                  </Link>
                </div>

                {/* Task */}
                <div className="flex flex-col gap-4">
                  {data?.recentTask.map(task => (
                    <div
                      key={task?.id}
                      className="flex items-center justify-between border-b border-accent/40 pb-3 last:border-none last:pb-0"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-neutral truncate">
                          {task?.title}
                        </span>
                        <span className="text-xs opacity-50 mt-0.5 font-medium">
                          Assigned to: {task?.employ_name}
                        </span>
                      </div>

                      {/* Styled Status Labels */}
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border capitalize whitespace-nowrap ${
                          task.status === 'Completed'
                            ? 'bg-primary text-secondary border-secondary'
                            : task.status === 'Pending'
                              ? 'bg-primary text-neutral/40 border-accent'
                              : 'bg-secondary text-primary border-none shadow-sm'
                        }`}
                      >
                        {task?.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpolyDashboard;