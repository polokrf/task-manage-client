import React, { useEffect, useState } from 'react';
import {UserPlus,Search,X,Check,} from 'lucide-react';
import useManageData from '../../../Hooks/useMageData';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../../Hooks/useAuth';

const AssignTask = () => {
  const { search, setSearch, isLoading, setIsLoading } = useManageData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const instance = useAxios()
  const limit = 10;
  const {user}=useAuth()
  const {register,handleSubmit,reset}=useForm()

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['assign-user', debouncedSearch, limit],
    queryFn: async () => {
      const res = await instance.get(`/api/employ/all?search=${debouncedSearch}&limit=${limit}`);
      return res.data;
    },
    enabled: !!debouncedSearch,
  });
 
  // console.log(data)

  const employ = data?.result?.users || [];

  const handleAssignTask = async (assignTask) => {
    if (!selectedUser) {
      toast.error('plz assign employ')
      return
    }
    try {
      setIsLoading(true)
      const newTask = {
        ...assignTask,
        admin_email: user?.email,
        admin_name: user?.name,
        admin_image:user?.image,
        employ_email: selectedUser?.email,
        employ_id: selectedUser?.id,
        employ_image: selectedUser.image,
        employ_name:selectedUser.name
      }

      const res = await instance.post('/api/task/post', newTask)
      // console.log(res)
      if (res?.data?.result?.acknowledged) {
        toast.success('task send success')
        reset()
      }
    } catch (error) {
      console.log(error)
      
    } finally {
      setIsLoading(false)
    }
  }

  
  return (
    <div className="w-full min-h-screen bg-primary  text-neutral flex justify-center items-start">
      <div className="w-full max-w-2xl bg-primary border border-accent rounded-2xl shadow-sm p-2 md:p-5  flex flex-col gap-6">
        {/*  Title */}
        <div >
          <h2 className="text-2xl font-bold text-neutral">Assign Task</h2>
          <p className="text-sm opacity-60 mt-1">
            Select team member and set task details
          </p>
        </div>

        <hr className="border-accent opacity-50" />

        {/* 2. Assign To (Searchable User Selection Dropdown Area) */}
        <div className="form-control w-full relative">
          <label className="label pt-0">
            <span className="labelText">
              Assign To <span className="text-secondary font-bold">*</span>
            </span>
          </label>

          {/* Search Bar Input or Selected Card Block */}
          {!selectedUser ? (
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search team member by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                className="input  taskAssignInPut"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60" />
            </div>
          ) : (
            /* Selected User */
            <div className="flex items-center justify-between p-3 bg-primary border-2 border-secondary rounded-xl transition-all">
              <div className="flex items-center gap-3">
                {/* image */}
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full border border-accent">
                    <img src={selectedUser.image} alt={selectedUser.name} />
                  </div>
                </div>
                {/* name */}
                <div>
                  <div className="font-bold text-neutral text-sm">
                    <h4> {selectedUser.name}</h4>
                  </div>
                  {/* email */}
                  <div className="text-xs opacity-60">
                    <p>{selectedUser.email}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setSearchQuery('');
                }}
                className="btn btn-square btn-sm btn-ghost hover:bg-secondary/10 text-neutral"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* user  dropdown  list */}
          {isDropdownOpen && !selectedUser && (
            <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-primary border border-secondary rounded-xl shadow-xl max-h-60 overflow-y-auto z-50 p-2 flex flex-col gap-1">
              {employ.length > 0 ? (
                employ.map(user => (
                  <div
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center justify-between p-2 md:p-3 hover:bg-secondary hover:text-primary rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 ">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-accent"
                      />
                      <div>
                        <div className="text-sm font-semibold text-neutral group-hover:text-primary">
                          {user.name}
                        </div>
                        <div className="text-xs opacity-60 group-hover:text-primary/80">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary" />
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm opacity-50">
                  No users match your search terms
                </div>
              )}
            </div>
          )}
          {/* Backdrop layer helper to safely close search focus overlay dropdown elements */}
          {isDropdownOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}
        </div>

        <form  onSubmit={handleSubmit(handleAssignTask)} className=" space-y-2 fieldset">
          {/* 1. Task Title Field (Added as requested) */}

          <label className="label pt-0">
            <span className="labelText">
              Task Title <span className="text-secondary font-bold">*</span>
            </span>
          </label>

          <input
            type="text"
            {...register('title',{required:true})}
            placeholder="Enter task title..."
            className=" input taskAssignInPut "
          />

          {/* 3. Due Date Input Area Field */}

          <label className="label pt-0">
            <span className="labelText">
              Due Date <span className="text-secondary font-bold">*</span>
            </span>
          </label>

          <input type="date" {...register('last_date',{required:true})} className="input taskAssignInPut" />

          {/* 4. Priority Flag Picker Selection Row Field */}
          <label className="label pt-0">
            <span className="labelText">
              Priority <span className="text-secondary font-bold">*</span>
            </span>
          </label>

          <select {...register('priority',{required:true})} className="select taskAssignInPut">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* 5. Estimated Duration Selection Row Field */}

          <label className="label pt-0">
            <span className="labelText">Estimated Time</span>
          </label>

          <select {...register('estimate_time')} className="select taskAssignInPut   overflow-hidden">
            <option value="1-2">1 - 2 days</option>
            <option value="3-4">3 - 4 days</option>
            <option value="5-7">5 - 7 days</option>
            <option value="weekly">1+ Week</option>
          </select>

          {/* 6. Message Context Rich Textarea Frame Segment */}

          <label className="label pt-0">
            <span className="labelText">Add Description</span>
          </label>

          <textarea
            rows="4"
            maxLength="500"
            placeholder="Please focus on writing clean, well-documented code..."
          
            {...register('job_description',{required:true})}
            className="textarea  pl-10 pt-3  taskAssignInPut resize-none"
          />

          {/* Action Controls*/}
          <div className="flex items-center justify-end gap-3 mt-4">
            <button disabled={isLoading} className="btn  w-full bg-secondary text-primary hover:bg-secondary/90 border-none shadow-md  py-3 px-4">
              <UserPlus className="w-5 h-5" />
              <span>Assign Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
