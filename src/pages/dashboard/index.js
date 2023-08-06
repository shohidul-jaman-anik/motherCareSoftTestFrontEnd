import Header from '@/components/ui/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DashboardHome = () => {

    const [data, setData] = useState([])
    const [sortingData, setSortingData] = useState("ASC")
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('');


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = () => {
        const url = `http://localhost:5000/users?status=${statusFilter}&sort=${sortBy}&order=${sortOrder}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.data);
            });
    };



    const handleDelete = id => {
        console.log(id)
        const proceed = window.confirm('Are you sure ?')

        if (proceed) {
            const url = `http://localhost:5000/users/${id}`
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    const remaining = data.filter(d => d._id !== id)
                    setData(remaining)
                    if (result.status === "Success") {
                        toast.success("Successfully Delete")
                    }
                })
        }
    }



    const handleFilter = () => {
        fetchData();
    };

    const sorting = (data1) => {
        let sort;
        if (sortingData === "ASC") {
          sort = [...data].sort((a, b) => {
            const aValue = a[data1]?.toLocaleLowerCase() || ''; // Handle undefined or null
            const bValue = b[data1]?.toLocaleLowerCase() || ''; // Handle undefined or null
            return aValue > bValue ? 1 : -1;
          });
          setSortingData("DSC");
        } else {
          sort = [...data].sort((a, b) => {
            const aValue = a[data1]?.toLocaleLowerCase() || ''; // Handle undefined or null
            const bValue = b[data1]?.toLocaleLowerCase() || ''; // Handle undefined or null
            return aValue < bValue ? 1 : -1;
          });
          setSortingData("ASC");
        }
        setData(sort);
      };
      
      

    return (
        <div>
            <Header></Header>


            <aside id="default-sidebar" class="fixed top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">
                <div>

                    <div className="filter-bar">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className='filter'>
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            {/* Add more status options as needed */}
                        </select>

                        <button className="btn btn-xs" onClick={handleFilter}>Apply Filters</button>
                    </div>


                    <div className="overflow-x-auto mt-8">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className='text-lg text-slate-900'>
                                    <th></th>
                                    <th >Name</th>
                                    <th onClick={() => sorting('due_date')}>Age <span className='text-red-500'>( sort )</span></th>
                                
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>

                            <tbody className='text-gray-700'>
                                {data.map((d, index) =>
                                    <tr key={d._id}>
                                        <th>{index + 1}</th>
                                        <th>{d.name}</th>
                                        <th>{d.age}</th>
                                        <td>{d.gender}</td>
                                        <td>{d.email}</td>
                                        <td>${d.phone}</td>
                                        <td onClick={() => handleDelete(d._id)}> ❌ </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;