import React from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flag,
  Activity,
  Heading,
  FileText,
  Mail,
  User,
} from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import PageLoader from '../../../Components/Loder.jsx/PageLoader';

const TaskDetails = () => {
  const { id } = useParams()
  const instance =useAxios()
  const { data:task={} ,isLoading} = useQuery({
    queryKey: ['get-single-task',id],
    queryFn: async () => {
      const res = await instance.get(`/api/task/single/${id}`);
     return res.data.result
    },
    enabled:!!id
  })
  // console.log(task)

  return (
    <div>
      {isLoading ? (
        <div className=' flex  justify-center items-center'>
          <PageLoader />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-primary  text-neutral flex justify-center items-start">
          <div className="w-full md:max-w-3xl bg-primary border border-accent rounded-2xl shadow-sm p-2 md:p-5 flex flex-col gap-6">
            {/* Top bar header area with icon-only Back Button */}
            <div className="flex items-center justify-between border-b border-accent pb-4">
              <div className="flex items-center gap-4">
                <Link
                  to={'/dashboard/task'}
                  className="btn btn-square btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary w-10 h-10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h2 className=" text-sm md:text-xl font-bold text-neutral">
                    Task Specifics
                  </h2>
                  <p className="text-xs opacity-50 font-mono mt-0.5">
                    {task?.status === 'done' &&
                      new Date(task?.finish_At).toDateString()}
                    {task?.status === 'inprogress' &&
                      new Date(task?.start_At).toDateString()}
                  </p>
                </div>
              </div>

              {/* Current Status Badge Indicator */}
              <span
                className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                  task?.status === 'pending'
                    ? 'bg-primary text-neutral/50 border-accent'
                    : 'bg-primary text-secondary border-secondary'
                }`}
              >
                <Activity className="w-3.5 h-3.5 mr-1" />
                {task?.status}
              </span>
            </div>

            {/* 1. Main Task Assignment Header Banner */}
            <div className="bg-secondary/5 border border-accent rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full border-2 border-secondary">
                    <img
                      src={task?.employ_image}
                      alt={task?.employ_name}
                      onError={e => {
                        e.target.src = 'https://placehold.co/100x100?text=User';
                      }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold opacity-50 uppercase tracking-wider block">
                    Assigned Employee
                  </span>
                  <div className="font-bold text-neutral text-base flex items-center gap-1.5">
                    <User className="w-4 h-4 opacity-60" /> {task?.employ_name}
                  </div>
                  <div className="text-xs opacity-70 flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 opacity-50" />{' '}
                    {task?.employ_email}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. core Text Data Fields Section */}
            <div className="flex flex-col gap-4">
              {/* Task Title field wrapper */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold opacity-50 uppercase tracking-wider flex items-center gap-1">
                  <Heading className="w-3.5 h-3.5" /> Project Task Title
                </span>
                <div className="p-3.5 bg-primary border border-accent rounded-xl font-bold text-neutral text-lg">
                  {task?.title}
                </div>
              </div>

              {/* Task Description field area */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold opacity-50 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Job Description
                </span>
                <div className="p-4 bg-primary border border-accent rounded-xl text-sm leading-relaxed text-neutral font-medium min-h-[100px] whitespace-pre-line">
                  {task?.job_description}
                </div>
              </div>
            </div>

            {/* 3. Metrics Info Metadata Grid Layout columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {/* Due date box column component */}
              <div className="p-4 bg-primary border border-accent rounded-xl flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider block">
                    Deadline
                  </span>
                  <span className="text-sm font-bold text-neutral">
                    {task?.last_date}
                  </span>
                </div>
              </div>

              {/* Priority   */}
              <div className="p-4 bg-primary border border-accent rounded-xl flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider block">
                    Priority Rank
                  </span>
                  <span className="text-sm font-bold text-neutral capitalize">
                    {task?.priority}
                  </span>
                </div>
              </div>

              {/* Estimated performance duration */}
              <div className="p-4 bg-primary border border-accent rounded-xl flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider block">
                    Est. Duration
                  </span>
                  <span className="text-sm font-bold text-neutral">
                    {task?.estimate_time} Days
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Timeline creation */}
            <div className="border-t border-accent pt-4 mt-2 text-right">
              <span className="text-[11px] opacity-40 font-medium">
                Task Document Initialized:{' '}
                {new Date(task?.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
