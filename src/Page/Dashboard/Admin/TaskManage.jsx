import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import {
  Search,
  SlidersHorizontal,
  Eye,
  SquarePen,
  Trash2,

  Calendar,
  AlertCircle,
  
} from 'lucide-react';
import useManageData from '../../../Hooks/useMageData';
import Pagination from '../../../Components/Pagination';
import { Link } from 'react-router';
import TasEditModal from './TasEditModal';
import Swal from 'sweetalert2';
import PageLoader from '../../../Components/Loder.jsx/PageLoader';

const TaskManage = () => {
  const instance = useAxios();
  const [editTask, setEditTask] = useState({});
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const refEdit = useRef();
  const {
    search,
    setSearch,
    status,
    setStatus,
    totalPage,
    setTotalPage,
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
  } = useManageData();
  const limit = 6;

  
  const { data,isLoading:loading,refetch } = useQuery({
    queryKey: ['all-task',debouncedSearch,limit,currentPage,status],
    queryFn: async () => {
      const res = await instance.get(`/api/task/all?search=${debouncedSearch}&filter=${status}&limit=${limit}&skip=${currentPage * limit}`);
      const allData = Math.ceil(Number(res?.data.result?.totalTask) / limit);
      setTotalPage(allData)
      return res.data;
    },
  });

   useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500);
  
      return () => clearTimeout(timer);
    }, [search]);
// console.log(data)
  const allTask = data?.result?.task || [];
  
  // console.log(allTask)

  const handleEditTask = (id) => {
    const findTask = allTask.find(task => task._id === id);
    setEditTask(findTask)
    refEdit.current.showModal()
  }

  const handleDeleteTask =  (id) => {
    Swal.fire({
      title: 'Are you sure delete this task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async(result )=> {
      if (result.isConfirmed)
        try {
      setIsLoading(true)
          const res = await instance.delete(`/api/task/delete/${id}`)
          refetch()
      Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
      });
          console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
       
    });
    
  }

  return (
    <div className="w-full min-h-screen bg-primary  text-neutral">
      <div className="max-w-7xl mx-auto bg-primary border border-accent rounded-2xl shadow-sm overflow-hidden">
        {/*  Header  */}
        <div className="p-4 md:p-6 bg-secondary border-b border-accent flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-bold text-primary">Task Dashboard</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/*  Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search tasks..."
                className="input taskAssignInPut"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(0);
                }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60" />
            </div>

            {/*  Dropdown Filter */}
            <div
              value={status}
              onChange={e => {
                setStatus(e.target.value);
                setCurrentPage(0);
              }}
              className="relative w-full sm:w-44"
            >
              <select className="select taskAssignInPut">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
              </select>
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Table  */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="border-b border-accent text-neutral opacity-70 bg-primary">
                <th className="bg-primary py-4">Employee</th>
                <th className="bg-primary py-4">Task Title</th>
                <th className="bg-primary py-4">Deadline</th>
                <th className="bg-primary py-4">Priority</th>
                <th className="bg-primary py-4">Status</th>
                <th className="bg-primary py-4 text-right">Actions</th>
              </tr>
            </thead>

            {loading ? (
              <tbody className="flex justify-center items-center my-4">
                <div>
                  <PageLoader />
                </div>
              </tbody>
            ) : (
              <tbody>
                {allTask.length > 0 ? (
                  allTask.map(task => (
                    <tr
                      key={task._id}
                      className="hover:bg-base-200/30 border-b border-accent transition-colors"
                    >
                      {/* Employee Identity Grouping  */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-full border border-accent">
                              <img
                                src={task.employ_image}
                                alt={task.employ_name}
                                onError={e => {
                                  e.target.src =
                                    'https://placehold.co/100x100?text=User';
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral">
                              {task.employ_name}
                            </div>
                            <div className="text-xs opacity-50 max-w-[180px] truncate">
                              {task.employ_email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Task Title Field */}
                      <td className="py-4 font-medium max-w-[220px] truncate">
                        <span className="text-neutral block font-semibold">
                          {task.title}
                        </span>
                      </td>

                      {/*Deadline  */}
                      <td className="py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5 opacity-60" />
                          {task?.last_date}
                        </div>
                      </td>

                      {/* Priority  */}
                      <td className="py-4">
                        <span className="badge badge-sm border-accent bg-primary text-neutral capitalize font-bold px-2.5 py-2">
                          {task.priority}
                        </span>
                      </td>

                      {/* Task Process Status  */}
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            task.status === 'pending'
                              ? 'bg-primary text-neutral/40 border-accent'
                              : 'bg-primary text-secondary border-secondary'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      {/* Table Data Controller  */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Button */}
                          <Link
                            to={`/dashboard/task/${task._id}`}
                            title="view"
                            className="tableActionBtn"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          {/* Edit Button */}
                          {task?.status === 'pending' && (
                            <button
                              onClick={() => handleEditTask(task?._id)}
                              title="edit"
                              className="tableActionBtn"
                            >
                              <SquarePen className="w-4 h-4" />
                            </button>
                          )}
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteTask(task?._id)}
                            title="delete"
                            className="tableActionBtn"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Conditional Empty Data Layer Handler Layout */
                  <tr>
                    <td colSpan="6" className="text-center py-12 bg-primary">
                      <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                        <AlertCircle className="w-8 h-8" />
                        <p className="text-sm font-semibold">
                          No tasks available in records
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Bottom Pagination  */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>

      <TasEditModal refetch={refetch} refEdit={refEdit} editTask={editTask} />
    </div>
  );
};

export default TaskManage;
