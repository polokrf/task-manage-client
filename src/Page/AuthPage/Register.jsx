import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { hostImag } from '../../api/hostImage';
import useAxios from '../../Hooks/useAxios';
import { useAuth } from '../../Hooks/useAuth';
import imageCompression from 'browser-image-compression';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const{setToken}=useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const instance = useAxios();

  const handleRegister = async registerInfo => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      toast.error('confirm password not match');
      return;
    }
    const { name, email, image, password } = registerInfo;

    try {
      setIsLoading(true);
      const imageFil = image?.[0];
      const compressed = await imageCompression(imageFil, {
        maxSizeMB: 0.3, 
        maxWidthOrHeight: 500,
        useWebWorker: true, 
      });
      const imgUrl = await hostImag(compressed);
      const newEmploy = {
        name,
        image: imgUrl,
        email,
        password,
      };
      // console.log('img', imgUrl);
      const res = await instance.post('/api/auth/register', newEmploy);
      const login= await instance.post('/api/auth/login', {email,password});
      const token = login?.data?.token;
      if(!token)return
      localStorage.setItem('token', token);
      setToken(token);
      
      // console.log(res);
      if (res?.data?.insertedId) {
        toast.success('Register success');
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-2 ">
      <div className="w-full max-w-md border border-accent bg-primary my-20 md:my-0 p-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-info tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-info/70 mt-2">
            Sign up to start managing your tasks
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-neutral mb-1.5">
              Full Name
            </label>
            <div>
              <input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: true })}
                className="inputClass"
              />
            </div>
          </div>

          {/* Image Input */}
          <div>
            <label className="block text-sm font-semibold text-neutral mb-1.5">
              Profile Image
            </label>
            <div>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: true })}
                className="file-input border-accent focus:border-info focus:outline-none focus:ring-2 focus:ring-info/90  w-full"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-neutral mb-1.5">
              Email Address
            </label>
            <div>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="you@example.com"
                className="inputClass"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-neutral mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true, minLength: 6 })}
                placeholder="••••••••"
                className="inputClass"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-0 pr-3 flex items-center text-neutral hover:text-info transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

              <p className=" text-red-700 font-bold mt-2">
                {errors?.password && 'Password must be at least 6 characters.'}
              </p>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold text-neutral mb-1.5">
              Confirm Password
            </label>
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword', { required: true })}
                className="block inputClass"
              />
            </div>
          </div>

          {/* Submit Action Button (Icon Only) */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-secondary w-full"
            >
              <UserPlus className="h-5 w-5 " />
              Register
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/"
              className="font-semibold text-secondary hover:text-info/80 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
