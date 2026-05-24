import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useManageData from '../../../Hooks/useMageData';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';
import Pagination from '../../../Components/Pagination';
import { AlertCircle, Calendar, CheckCircle2, Clock, Eye, Search } from 'lucide-react';
import PageLoader from '../../../Components/Loder.jsx/PageLoader';


const CompletedTask = () => {
const instance = useAxios();
const { user } = useAuth();
   
   
  
   const {
     search,
     setSearch,
     totalPage,
     setTotalPage,
     currentPage,
     setCurrentPage,
  
   } = useManageData();

   const limit = 4;
   // Fetch tasks based on active status tab
   const { data ,isLoading} = useQuery({
     queryKey: ['my-task',user?.email, search, limit, currentPage],
     queryFn: async () => {
       const res = await instance.get(
         `/api/task/own?email=${user?.email}&status=done&search=${search}&limit=${limit}&skip=${currentPage * limit}`,
       );
       const page = Math.ceil(Number(res?.data?.result?.countTask) / limit);

       setTotalPage(page);
       return res.data;
     },
     enabled: !!user?.email,
   });

  const myTask = data?.result?.task || [];
  
  console.log(myTask)

  return (
    <div className="w-full min-h-screen bg-primary p-4 md:p-8 text-neutral">
      <div className="max-w-6xl mx-auto bg-primary border border-accent rounded-2xl shadow-sm overflow-hidden">
        {/* Navigation Tabs and Search Header Section */}
        <div className="flex flex-row items-center justify-center bg-secondary border-b border-accent p-4 gap-4">
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
            {isLoading ? <tbody>
              <PageLoader/>
         </tbody> :   <tbody>
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
                        <Link
                          to={`/dashboard/my-task/${task._id}`}
                         
                          className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {task.status === 'done' && (
                          <button
                            disabled
                            title="done"
                            className="btn  btn-sm btn-outline    text-neutral "
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
                        No matching Done tasks found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody> }
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

export default CompletedTask;