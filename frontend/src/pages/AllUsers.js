
import React, { useState, useEffect } from "react";
import PaginatedItems from "../components/PaginatedItems";
import moment from "moment";
import SummaryApi from "../common";
import ChangeUserRole from "../components/ChangeUserRole";
import { toast } from "react-toastify";

import { MdModeEdit } from "react-icons/md";
const AllUsers = () => {
  const [currentItems, setCurrentItems] = useState(0);
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <div>
        <div className="bg-white pb-4">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems &&
                currentItems.map((el, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td>{el?.role}</td>
                      <td>{moment(el?.createdAt).format("LL")}</td>
                      <td>
                        <button
                          className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                          onClick={() => {
                            setUpdateUserDetails(el);
                            setOpenUpdateRole(true);
                          }}
                        >
                          <MdModeEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <PaginatedItems
          itemsPerPage={13}
          setCurrentItems={setCurrentItems}
          items={allUser}
        />
      </div>

      {
            openUpdateRole && (
                <ChangeUserRole
                    onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )
        }

    </>
  );
};

export default AllUsers;
