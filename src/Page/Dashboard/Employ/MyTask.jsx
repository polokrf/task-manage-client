import React, { useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router';
import {
  Eye,
  Play,
  CheckCircle2,
  Calendar,
  Clock,
  AlertCircle,
  Search,
  SlidersHorizontal,
 
} from 'lucide-react';
import useManageData from '../../../Hooks/useMageData';
import Pagination from '../../../Components/Pagination';
import toast from 'react-hot-toast';
import PageLoader from '../../../Components/Loder.jsx/PageLoader';

const MyTask = () => {
  const instance = useAxios();
  const { user } = useAuth();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const activeTab = searchParams.get('tab') || 'pending';
  const {
    search,
    setSearch,
    totalPage,
    setTotalPage,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
    sort,
    setSort
  } = useManageData();

  const limit = 6
  // Fetch tasks based on active status tab
  const { data,refetch,isLoading:loading } = useQuery({
    queryKey: ['my-task', activeTab,user?.email,search,limit,currentPage],
    queryFn: async () => {
      const res = await instance.get(
        `/api/task/own?email=${user?.email}&status=${activeTab}&search=${search}&limit=${limit}&skip=${currentPage * limit}&sort=${sort}`,
      );
      const page = Math.ceil(Number(res?.data?.result?.countTask) / limit);

      setTotalPage(page)
      return res.data;
    },
    enabled: !!user?.email,
  });

  const myTask = data?.result?.task || [];

 
// console.log(data?.result?.countTask);
  
  // Status handler update trigger logic
  const handleStatusUpdate = async (taskId, currentStatus) => {
    try {
      setIsLoading(true)
      const res = await instance.patch('/api/task/status-update', {
        id: taskId,
        status: currentStatus,
        email: user?.email,
        image: user?.image,
        name:user?.name
      });
      if (res?.data?.result?.modifiedCount) {
        toast.success(`status ${currentStatus}`)
        refetch()
     }
    } catch (error) {
      console.log(error)
    } finally {
     setIsLoading(false) 
    }
  };

  const handleTab = tab => {
    setSearch(''); 
    setCurrentPage(0); 
    navigation(`/dashboard/my-task?tab=${tab}`);
  };

  return (
    <div className="w-full min-h-screen bg-primary text-neutral">
      <div className="max-w-6xl mx-auto bg-primary border border-accent rounded-2xl shadow-sm overflow-hidden">
        {/* Navigation Tabs and Search Header Section */}
        <div className="flex flex-col md:flex-row  items-center justify-center bg-secondary border-b border-accent p-4 gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <button
              onClick={() => handleTab('pending')}
              className={`cursor-pointer transition-all px-6 py-2.5 font-bold text-sm tracking-wide rounded-lg ${
                activeTab === 'pending'
                  ? 'bg-primary text-secondary shadow-sm'
                  : 'text-primary/80 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => handleTab('inprogress')}
              className={`cursor-pointer transition-all px-6 py-2.5 font-bold text-sm tracking-wide rounded-lg ${
                activeTab === 'inprogress'
                  ? 'bg-primary text-secondary shadow-sm'
                  : 'text-primary/80 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              In Progress
            </button>
          </div>

          {/* Search Input Filter field block */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search current tasks..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(0);
              }}
              className="input input-bordered border-accent bg-primary text-neutral w-full pl-10 focus:outline-none focus:border-secondary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60" />
          </div>

         
        </div>

        {/* table head */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="border-b border-accent text-neutral opacity-70 bg-primary">
                <th className="bg-primary py-4">Task Title</th>
                <th className="bg-primary py-4">Deadline</th>
                <th className="bg-primary py-4">Priority</th>
                <th className="bg-primary py-4">Est. Time</th>
                <th className="bg-primary py-4">Status</th>
                <th className="bg-primary py-4 text-right">Actions</th>
              </tr>
            </thead>
            {/* table body */}

            {loading ? (
              <tbody>
                <PageLoader />
              </tbody>
            ) : (
              <tbody>
                {myTask.length > 0 ? (
                  myTask.map(task => (
                    <tr
                      key={task._id}
                      className="hover:bg-base-200/30 border-b border-accent transition-colors"
                    >
                      {/* Task Title  */}
                      <td className="py-4 font-semibold text-neutral max-w-[240px] truncate">
                        {task.title}
                      </td>

                      {/* Deadline date */}
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {task.last_date || task['last-date']}
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-4">
                        <span className="badge badge-sm border-accent bg-primary text-neutral capitalize font-bold px-2.5 py-2">
                          {task.priority}
                        </span>
                      </td>

                      {/* Estimated time  */}
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-80">
                          <Clock className="w-3.5 h-3.5" />
                          {task.estimate_time} Days
                        </div>
                      </td>

                      {/* Status*/}
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${
                            task.status === 'pending'
                              ? 'bg-primary text-neutral/40 border-accent'
                              : 'bg-primary text-secondary border-secondary'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Details Button */}
                          <button
                            onClick={() =>
                              navigation(`/dashboard/my-task/${task._id}`)
                            }
                            className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Status Mutation Advancement Button Logic trigger */}
                          {task.status === 'pending' && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(task._id, 'inprogress')
                              }
                              disabled={isLoading}
                              title="inprogress"
                              className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}

                          {task.status === 'inprogress' && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(task._id, 'done')
                              }
                              disabled={isLoading}
                              title="done"
                              className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Empty Data State  */
                  <tr>
                    <td colSpan="6" className="text-center py-12 bg-primary">
                      <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                        <AlertCircle className="w-8 h-8" />
                        <p className="text-sm font-semibold capitalize">
                          No matching {activeTab} tasks found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination */}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default MyTask;
