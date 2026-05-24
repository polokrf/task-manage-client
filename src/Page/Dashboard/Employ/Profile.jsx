import React, { useRef, useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import {
 
  Mail,
  ShieldAlert,
  CheckCircle,
  SquarePen,
  Calendar,
  X,
} from 'lucide-react';
import { hostImag } from '../../../api/hostImage';
import useAxios from '../../../Hooks/useAxios';
import useManageData from '../../../Hooks/useMageData';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const profileRef = useRef()
  const [imageUpdate,setImageUpdate]=useState('')
  const [isEdit,setIsEdit]=useState(false)
  const instance = useAxios()
  const { isLoading, setIsLoading } = useManageData()
  const [image, setImage] = useState(null);

  const handleEditProfile = () => {
   profileRef.current.showModal()
  }
  
  const handleClick = (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    // console.log(file)
    setImage(URL.createObjectURL(file));
    setImageUpdate(file)
    setIsEdit(true)
  }

  const handleEditProfileImg = async() => {
    try {
      if (!imageUpdate) {
        return
      }
      setIsLoading(true)
      
      const imagUrl = await hostImag(imageUpdate);

      const res = await instance.patch('/api/employ/edit-profile', { image: imagUrl, id: user?._id })
      console.log(res)
      toast.success('your profile image updated')
     window.location.reload();
      setIsEdit(false);
      profileRef.current.close();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
     
    }
   
  }

 

  return (
    <div className="w-full min-h-screen bg-primary  text-neutral flex justify-center items-start">
      <div className="w-full max-w-xl bg-primary border border-accent rounded-2xl shadow-sm overflow-hidden ">
        {/*  Banner Background */}
        <div className="h-28 w-full bg-secondary relative">
          {/*  Edit Button  */}
          <button
            onClick={handleEditProfile}
            className="absolute top-4 right-4 btn btn-square btn-sm border-none bg-primary text-neutral hover:bg-primary/90 shadow-md"
          >
            <SquarePen className="w-4 h-4 text-secondary" />
          </button>
        </div>

        {/* Profile Details  */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col items-center sm:items-start">
          {/*  Image  */}
          <div className="avatar -mt-14 mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-primary bg-primary shadow-md overflow-hidden">
              <img src={user?.image} alt={user?.name} />
            </div>
          </div>

          {/* User Name  */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 border-b border-accent pb-4">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-neutral">{user?.name}</h2>
            </div>

            {/* Status */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border capitalize gap-1 ${
                user?.status === 'active'
                  ? 'bg-primary text-secondary border-secondary'
                  : 'bg-primary text-neutral/40 border-accent'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {user?.status}
            </span>
          </div>

          <div className="w-full flex flex-col gap-4 mt-5">
            {/* Email  */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-secondary/5 border border-accent rounded-xl gap-2">
              <div className="flex items-center gap-3">
                <div className="text-secondary opacity-80">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-neutral">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Role */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-secondary/5 border border-accent rounded-xl gap-2">
              <div className="flex items-center gap-3">
                <div className="text-secondary opacity-80">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider block">
                    Account System Role
                  </span>
                  <span className="text-sm font-bold text-neutral capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center sm:text-right mt-6 opacity-40 text-[11px] font-medium flex items-center justify-center sm:justify-end gap-1">
            <Calendar className="w-3 h-3" /> Account Activated:{' '}
            {new Date(user?.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* modal edit profile */}

      <dialog ref={profileRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className=" flex justify-between items-center border-b border-accent mb-2">
            <h3 className="font-bold text-lg mb-3 truncate ">
              Edit Your Profile Image!
            </h3>
            <div>
              <button onClick={() => {
                setImage('')
                setIsEdit(false)
                profileRef.current.close()
              }} className=" btn btn-xs">
                <X />
              </button>
            </div>
          </div>

          <div className=" flex  justify-center ">
            <div>
              <img
                className="w-[100px] h-[100px] rounded-full mb-3  object-cover mx-auto"
                src={image || user?.image}
                alt={user?.name}
              />
            </div>

            <div>
              {isEdit ? (
                <button
                  disabled={isLoading}
                  onClick={handleEditProfileImg}
                  className="btn btn-secondary btn-xs"
                >
                  Save
                </button>
              ) : (
                <div>
                  <label htmlFor="file">
                    <SquarePen className="w-4 h-4 text-secondary cursor-pointer" />
                  </label>

                  <input
                    onChange={handleClick}
                    id="file"
                    type="file"
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
