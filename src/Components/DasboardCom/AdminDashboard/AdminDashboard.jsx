import React from 'react';
import {
  Users,
  ClipboardList,
  Clock,
  CheckCircle2,
 
  ChevronDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
 
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import { useAuth } from '../../../Hooks/useAuth';

const AdminDashboard = () => {
  // 1. Data for the Area Chart (Tasks Overview)
  const {user}=useAuth()
  const instance = useAxios()
  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const res = await instance.get('/api/dash/overView/admin')
      return res.data.result
    }
  })
 
 
  const overviewData = [
    { name: 'users', value: data?.totalUser },
    { name: 'totalTask', value: data?.totalTAsk },
    { name: 'Pending', value: data?.totalPending || 0 },
    { name: 'inprogress', value: data?.totalInprogress || 0 },
    { name: 'done', value: data?.totalDone },
  ];

 

  return (
    <div className="w-full min-h-screen bg-primary  text-neutral">
      <div className=' text-center space-y-2'>
        <h2 className=' text-3xl text-secondary font-bold capitalize'> Welcome { user?.role}</h2>
        <h4 className=' text-2xl font-bold text-secondary mb-5'>{ user?.name}</h4>
      </div>
      <div className="md:max-w-7xl w-full mx-auto flex flex-col gap-6">
        {/* STATS CARDS SECTION*/}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 justify-center">
          {/*  Total Users */}
          <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Total Users
              </span>
              <span className="text-3xl font-extrabold text-neutral">
                {data?.totalUser}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <Users className="w-6 h-6" />
            </div>
          </div>

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
          {/* <div className="bg-primary border border-accent rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold opacity-60">
                Inprogress Tasks
              </span>
              <span className="text-3xl font-extrabold text-neutral">{ data?.totalInprogress}</span>
            
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 text-secondary border border-accent">
              <Clock className="w-6 h-6" />
            </div>
          </div> */}

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
        <div className="grid grid-cols-1 ">
          {/* Chart Left: Tasks Overview AreaChart */}
          <div className="bg-primary border border-accent rounded-2xl p-5 shadow-sm lg:col-span-1 combined-class ">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-neutral">
                Tasks Overview
              </h3>
              <div className="flex items-center gap-1 text-xs border border-accent bg-primary rounded-lg px-2.5 py-1.5 font-medium cursor-pointer">
                This Week <ChevronDown className="w-3 h-3" />
              </div>
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

          {/* List Right: Recent Tasks Panel */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
