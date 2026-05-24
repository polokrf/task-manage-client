import { useState } from "react";

const useManageData = () => {
   const [search, setSearch] = useState('')
     const [status, setStatus] = useState('');
     const [sort, setSort] = useState('');
     const [totalPage, setTotalPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(0)
   const [isLoading,setIsLoading]=useState(false)
  return {
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
    sort,
    setSort,
  };
}
 
export default useManageData