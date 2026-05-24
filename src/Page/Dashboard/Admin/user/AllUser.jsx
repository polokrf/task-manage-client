import React, { useEffect, useState } from 'react';
import useAxios from '../../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, Trash2, ShieldCheck, UserMinus,} from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useManageData from '../../../../Hooks/useMageData';
import Pagination from '../../../../Components/Pagination';
import PageLoader from '../../../../Components/Loder.jsx/PageLoader';

const AllUser = () => {
  const instance = useAxios();
   const [debouncedSearch, setDebouncedSearch] = useState('');
  const {search,setSearch,status,setStatus,totalPage,setTotalPage,currentPage,setCurrentPage}=useManageData()
  
  let limit = 6;
  const { data,isLoading,refetch} = useQuery({
    queryKey: ['all-user',debouncedSearch,status,limit,currentPage],
    queryFn: async () => {
      const res = await instance.get(`/api/employ/all?search=${debouncedSearch}&filter=${status}&limit=${limit}&skip=${currentPage * limit}`);
      const totalUsers =Number(res.data.result.countUsers )
      const totalUsersPage = Math.ceil(totalUsers/ limit);
      setTotalPage(totalUsersPage);
      return res.data
    }
  })
   useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedSearch(search);
        }, 500);
    
        return () => clearTimeout(timer);
      }, [search]);
  const allUser = data?.result.users || [];
  // console.log(allUser)

  // update user status
  const handleUpdate =async (id, userStatus) => {
    try {
      const res = await instance.patch('/api/employ/status', { id, status: userStatus })
      if (res?.data?.success) {
        toast.success('update user status success')
        refetch()
      }
      // console.log(res)
    } catch (error) {
      console.log(error);
      toast.error(error?.message)
    }
  }
  const handleUpdateStatus = (id, userStatus) => {
    handleUpdate(id,userStatus)
  }

  //  delete any employ 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure do you remove this Employ ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then(async(result) => {
      if (result.isConfirmed)
        try {
          const res = await instance.delete(`/api/employ/delete/${id}`)
            Swal.fire({
              title: 'Remove!',
              text: 'Employ has been remove',
              icon: 'success',
            });
          refetch()
          console.log(res)
        } catch (error) {
          console.log(error)
            
        }
      
    });
   
  }

  
  return (
    <div className="w-full min-h-screen bg-primary   text-neutral">
      <div className="md:max-w-6xl w-full mx-auto bg-primary border border-accent rounded-xl shadow-sm overflow-hidden">
        {/* Top Header & Filter Bar Section */}
        <div className="p-3 md:p-6 bg-secondary border-b border-accent flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-bold text-primary">All Employees</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={search}
                placeholder="Search by name or email..."
                onChange={e => {
                  setSearch(e.target.value)
                  setCurrentPage(0)
                }}
                className="input input-bordered border-accent bg-primary text-neutral w-full pl-10 focus:outline-none focus:border-secondary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60" />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-44">
              <select
                value={status}
                onChange={e => {
                  setStatus(e.target.value);
                  setCurrentPage(0)
                }}
                className="select select-bordered border-accent bg-primary text-neutral w-full pl-10 focus:outline-none focus:border-secondary appearance-none"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="block">Block</option>
              </select>
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table Container  */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-accent text-neutral opacity-70 bg-primary">
                <th className="bg-primary py-4">User</th>
                <th className="bg-primary py-4">Email</th>
                <th className="bg-primary py-4">Role</th>
                <th className="bg-primary py-4">Status</th>
                <th className="bg-primary py-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}

            {isLoading ? <tbody className='flex justify-center items-center my-4'>
              <div>
                <PageLoader/>
              </div>
         </tbody> :   <tbody>
              {allUser.map(user => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200/30 border-b border-accent transition-colors"
                >
                  {/* User Profile Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full border border-accent">
                          <img
                            src={user.image}
                            alt={user.name}
                            onError={e => {
                              e.target.src =
                                'https://placehold.co/100x100?text=User';
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral">
                          {user.name}
                        </div>
                        <div className="text-xs opacity-50 md:hidden">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="hidden md:table-cell py-4 font-medium">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="py-4">
                    <span className="badge badge-sm border-accent bg-primary text-neutral capitalize font-semibold px-3 py-2">
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        user.status === 'active'
                          ? 'bg-primary text-secondary border-secondary'
                          : 'bg-primary text-neutral/40 border-accent'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Action Buttons  */}
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="active"
                        onClick={() => handleUpdateStatus(user?._id, 'active')}
                        className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button
                        title="block"
                        onClick={() => handleUpdateStatus(user?._id, 'block')}
                        className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                      <button
                        title="delete"
                        onClick={()=>handleDelete(user?._id)}
                        className="btn btn-square btn-sm btn-outline border-accent hover:bg-secondary hover:border-secondary text-neutral hover:text-primary"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>

        {/* Pagination Footer Section */}
       <Pagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
};



export default AllUser;