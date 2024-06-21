import React, { useEffect, useState,useCallback } from "react";
import { useSelector } from "react-redux";
import ROLE from "../common/role";
import SummaryApi from "../common";
import DetailsOrders from "../components/DetailsOrders";
import PaginatedItems from "../components/PaginatedItems";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentItems, setCurrentItems] = useState(0);
  const user = useSelector((state) => state?.user?.user);
  // if roles=Admin  fetch , role =General =>
  const [openDetailOrder, setOpenDetailOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const fetchAllOrders =useCallback(async () => { 
    const dataResponse = await fetch(SummaryApi.getAllOrders.url, {
      method: SummaryApi.getAllOrders.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();

    setOrders(dataApi.data);
    console.log(orders);
  
    if (dataApi.success) {
      console.log("Success");
    }

    if (dataApi.error) {
      console.log("Failed");
    }
},[orders])
  const fetchOrdersByUser = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.getOrdersbyUser.url, {
      method: SummaryApi.getOrdersbyUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataApi = await dataResponse.json();

    setOrders(dataApi.data);
    console.log(orders);
    if (dataApi.success) {
      console.log("Success");
    }

    if (dataApi.error) {
      console.log("Failed");
    }
  },[orders]);

  const handleDetailOrder =(order)=>{
    setSelectedOrder(order);
    setOpenDetailOrder(true);
  }
  const closeDetailOrder=()=>{
    setOpenDetailOrder(false)
  }
  useEffect(() => {
    if (user?.role === ROLE.ADMIN) {
      fetchAllOrders();
    } else {
      fetchOrdersByUser();
    }
  }, [user,fetchAllOrders,fetchOrdersByUser]);

  return (
    <>
      {openDetailOrder && (
        <DetailsOrders onClose={closeDetailOrder} order={selectedOrder}/>
      )}
      {user?.role === ROLE.ADMIN && (
        <div className="bg-white pb-4">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>OrderId</th>
                <th>UserId</th>
                <th>CustomerName</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Details Order</th>
                <th>Ordered date</th>
                <th>Status</th>
                <th>isPaid</th>
                <th>PaymentMethod</th>
                <th>totalAmount</th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems&&
              currentItems.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.userId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.shippingAddress}</td>
                  <td>
                    <button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                      onClick={() => handleDetailOrder(order)}
                    >
                      Details
                    </button>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user?.role === ROLE.GENERAL && (
        <div className="bg-white pb-4">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>OrderId</th>
                <th>Details Orders</th>
                <th>Ordered date</th>
                <th>Status</th>
                <th>isPaid</th>
                <th>PaymentMethod</th>
                <th>totalAmount</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <th>
                  <button
                      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
                      onClick={() => handleDetailOrder(order)}
                    >
                      Details
                    </button>
                  </th>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <PaginatedItems
          itemsPerPage={12}
          setCurrentItems={setCurrentItems}
          items={orders}
        />
    </>
  );
};

export default AllOrders;
