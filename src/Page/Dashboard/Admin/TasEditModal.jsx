import { SquarePen, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hooks/useAxios';
import useManageData from '../../../Hooks/useMageData';
import toast from 'react-hot-toast';

const TasEditModal = ({ refEdit, editTask, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const { isLoading, setIsLoading } = useManageData();
  const { title, last_date, priority, job_description, estimate_time, _id } =
    editTask;
  const instance = useAxios();
  useEffect(() => {
    if (editTask) {
      reset({
        title,
        last_date,
        priority,
        estimate_time,
        job_description,
      });
    }
  }, [
    editTask,
    reset,
    title,
    last_date,
    priority,
    estimate_time,
    job_description,
  ]);

  const handleEdit = async editValue => {
    try {
      setIsLoading(true);
      const res = await instance.patch(`/api/task/update/${_id}`, editValue);
      toast.success('update success');
      refEdit.current.close();
      refetch()
      // console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
     refEdit.current.close();
  }
  return (
    <div className=" overflow-visible">
      <dialog
        ref={refEdit}
        className="modal modal-bottom sm:modal-middle overflow-visible "
      >
        <div className="modal-box">
          <div className=" flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg mb-4">
                You can update it if you want !
              </h3>
            </div>
            <div>
              <button onClick={handleClose} className=' btn btn-xs hover:btn-secondary'>
                <X className=' inline-block'/>
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleEdit)}
            className=" space-y-2 fieldset"
          >
            {/* 1. Task Title Field */}

            <label className="label pt-0">
              <span className="labelText">
                Task Title <span className="text-secondary font-bold">*</span>
              </span>
            </label>

            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Enter task title..."
              className=" input taskAssignInPut "
            />

            {/* 3. Due Date Input Area Field */}

            <label className="label pt-0">
              <span className="labelText">
                Due Date <span className="text-secondary font-bold">*</span>
              </span>
            </label>

            <input
              type="date"
              {...register('last_date', { required: true })}
              className="input taskAssignInPut overflow-hidden"
            />

            {/* 4. Priority Flag Picker Selection Row Field */}
            <label className="label pt-0">
              <span className="labelText">
                Priority <span className="text-secondary font-bold">*</span>
              </span>
            </label>

            <select
              {...register('priority', { required: true })}
              className="select taskAssignInPut"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* 5. Estimated Duration Selection Row Field */}

            <label className="label pt-0">
              <span className="labelText">Estimated Time</span>
            </label>

            <select
              {...register('estimate_time', { required: true })}
              className="select taskAssignInPut   overflow-hidden"
            >
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
              {...register('job_description', { required: true })}
              className="textarea  pl-10 pt-3  taskAssignInPut resize-none"
            />

            {/* Action Controls*/}
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                disabled={isLoading}
                className="btn  w-full bg-secondary text-primary hover:bg-secondary/90 border-none shadow-md  py-3 px-4"
              >
                <SquarePen className="w-4 h-4" />
                <span>Update Task</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TasEditModal;