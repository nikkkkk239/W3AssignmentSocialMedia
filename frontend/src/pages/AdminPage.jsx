import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

function AdminPage() {
  const {getTaskDetails,socket ,mediaDetails ,isMediaLoading,listenToTasks , unListenToTask} = useAuthStore();

  useEffect(()=>{
    getTaskDetails();
    listenToTasks();
  },[getTaskDetails,socket,listenToTasks,unListenToTask])
  if(isMediaLoading) return <div>Fetching details ....</div>

  return (
    <section className="container ml-1 mr-1 mt-20 px-4 h-fit mx-auto">
    <h2 className="text-lg font-medium text-gray-800 ">Users Social Media Handle</h2>


    <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                            {mediaDetails.length == 0 ? <div className='p-8 text-xl'>No user details</div> : <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Name</span>

                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                    <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                </svg>
                                            </button>
                                        </th>

                                        

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Social Media handle
                                        </th>

                                        <th scope="col" className="hidden md:block  px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Images</th>

                                        
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {mediaDetails && mediaDetails.map((user,i)=>{
                                    return <tr key={i}>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 className="font-medium text-gray-800 dark:text-white ">{user.name.slice(0,15)}</h2>
                                            
                                        </div>
                                    </td>
                                    
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 dark:text-gray-200">{user.handle}</h4>
                                            
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 hidden md:block text-sm whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {user.imageUrls.slice(0,5).map((url,i)=>{
                                                return <a href={url} key={i} target="_blank"   rel="noopener noreferrer" title='click me'>
                                                <img className=" cursor-pointer object-cover w-32 h-32 -mx-1 rounded-md border-2 border-white dark:border-gray-700 shrink-0" src={url}
                                                alt="Cloudinary Image"
                                                />
                                            </a>
                                            })}
                                        </div>
                                    </td>
                                </tr>
                                    })}
                                </tbody>
                            </table>}

                        </div>
            </div>
        </div>
    </div>

</section>
  )
}

export default AdminPage