/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@/components/ui/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DashboardHome = ({ initialData }) => {

    const [data, setData] = useState(initialData);
    const [sortingData, setSortingData] = useState("ASC")
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter()

    useEffect(() => {
        fetchData();
    }, [sortBy, sortOrder, searchQuery]);


    const fetchData = () => {

        const token = localStorage.getItem("token")
        if (!token) {
            router.replace('/auth/login');
            return;
        }

        const url = `http://localhost:5000/users?sort=${sortBy}&order=${sortOrder}&search=${searchQuery}`;
        fetch(url, {
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.data);
                // setData(prevData => [...prevData, data?.data]);
            }).catch(error => {
                console.log(error)
                router.replace("/auth/login")
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


    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };


    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);
    
        try {
          const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            body: formData,
          });
          const result = await response.text();
          console.log(result);
          toast.success('File uploaded successfully.');
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file.');
        }
      };
    

    return (
        <div>
            <Header></Header>
            <aside id="default-sidebar" class="fixed top-15 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64 mt-20">
                <div className='flex justify-between'>
                    <form action="">
                        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search user" className='input input-bordered w-full max-w-xs' />
                    </form>

                    {/* Upload file */}
                    {/* <form action="http://localhost:5000/users" method="post" enctype="multipart/form-data" >

                        <input type="file" name="file" id="file" accept=".csv, .xlsx, .xls" />
                        <button className='btn btn-sm' type="submit">Upload Users</button>
                    </form> */}


                    <form onSubmit={handleUpload}>
                        <input type="file" name="file" id="file" accept=".csv, .xlsx, .xls" />
                        <button className="btn btn-sm" type="submit">
                            Upload Users
                        </button>
                    </form>


                </div>
                <div>
                    <div className="overflow-x-auto mt-12">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className='text-lg text-slate-900'>
                                    <th></th>
                                    <th >Name</th>
                                    <th onClick={() => sorting('age')}>Age <span className='text-red-500'>( sort )</span></th>

                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>


                            <tbody className='text-gray-700'>
                                {data?.map((d, index) =>
                                    <tr key={d._id}>
                                        <th>{index + 1}</th>
                                        <th>{d.name}</th>
                                        <th>{d.age}</th>
                                        <td>{d.gender}</td>
                                        <td>{d.email}</td>
                                        <td>{d.phone}</td>
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

export async function getServerSideProps() {
    try {
        const token = localStorage.getItem("token")
        const url = `http://localhost:5000/users`;
        const res = await fetch(url, {
            headers: {
                Authorization: token
            }
        });
        const data = await res.json();

        return {
            props: {
                initialData: data.data || [], // Set to an empty array if data.data is undefined or null
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                initialData: null, // Set to null or an empty array, depending on what works for your frontend
            },
        };
    }
}



export default DashboardHome;
