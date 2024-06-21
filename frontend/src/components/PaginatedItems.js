import React, { useEffect, useState } from 'react';

// import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';


// Example items, to simulate fetching from another resources.

// function Items({ currentItems }) {
//     return (
//       <>
//         {currentItems &&
//           currentItems.map((item) => (
//             <div>
//               <h3>Item #{item}</h3>
//             </div>
//           ))}
//       </>
//     );
//   }
  
  function PaginatedItems({ itemsPerPage,setCurrentItems,items }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [allUser,setAllUsers] = useState([])

    // const fetchAllUsers = async() =>{
    //     const fetchData = await fetch(SummaryApi.allUser.url,{
    //         method : SummaryApi.allUser.method,
    //         credentials : 'include'
    //     })
    
    //     const dataResponse = await fetchData.json()
    
    //     if(dataResponse.success){
    //         setAllUsers(dataResponse.data)
    //     }
    // }
    //     useEffect(()=>{
    //         fetchAllUsers()
    //     },[])
    const [itemOffset, setItemOffset] = useState(0);
   
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    },[itemOffset,itemsPerPage,setCurrentItems,items])
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        {/* <Items currentItems={currentItems} /> */}
        {/* <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {currentItems&&
                    currentItems.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                   
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div> */}
        <ReactPaginate className='flex justify-center gap-1 bg-blue-500 '
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
  
export default PaginatedItems;