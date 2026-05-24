import React, { useEffect, useState } from 'react';
import { LogIn, Eye, EyeOff, } from 'lucide-react';
import { Link, redirect, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { useAuth } from '../../Hooks/useAuth';
import Loader from '../../Components/Loder.jsx/Loader';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const instance = useAxios();
  const { register, handleSubmit ,reset} = useForm();
  const { user, setToken, token,loading } = useAuth();
  const navigate = useNavigate()
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPass, setDemoPass] = useState('');
  

  useEffect(() => {
    reset({
      email: demoEmail,
      password: demoPass,
    });
  }, [reset, demoEmail, demoPass]);

  if (loading || (token && !user)) {
    return <Loader />;
  }

  if (token) {
     navigate('/dashboard')
   }
  // console.log(user,token)
  const handleLogin =async( loginInfo) => {
   
    
    
    if (!loginInfo.email) {
      toast.error('email is missing')
      return
    }
    if (!loginInfo.password) {
      toast.error('password is missing');
      return
    }
    try {
      setIsLoading(true);
      const res = await instance.post('/api/auth/login', loginInfo)
      const token = res?.data?.token
      
      localStorage.setItem('token', token);
      setToken(token)
      navigate('/dashboard')
      toast.success('login success');
    } catch (err) {
      console.log(err)
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
  };

  const handleAdmin = () => {
    setDemoEmail('polokkumar30@gmail.com');
    setDemoPass('Polok@6ur');
  };

  const handleUser = () => {
    setDemoEmail('rajukumar40@gmail.com');
    setDemoPass('raju@6ur');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-2">
      <div className="w-full max-w-md border border-accent bg-primary p-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-info tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-info/70 mt-2">
            Log in to manage your daily tasks
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdmin}
              className="px-4 py-1.5 bg-primary hover:bg-secondary hover:text-primary text-neutral text-[10px] font-black uppercase rounded-xl shadow-sm border border-accent transition-all cursor-pointer"
            >
              Admin
            </button>
            <button
              onClick={handleUser}
              className="px-4 py-1.5 bg-primary hover:bg-secondary hover:text-primary text-neutral text-[10px] font-black uppercase rounded-xl shadow-sm border border-accent transition-all cursor-pointer"
            >
              User
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                className=" inputClass"
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
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password', { required: true })}
                className="inputClass"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral hover:text-secondary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-secondary w-full"
          >
            <LogIn className="h-4 w-4" />
            <span>{isLoading ? 'Verifying Account...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-neutral">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-secondary hover:text-info transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
