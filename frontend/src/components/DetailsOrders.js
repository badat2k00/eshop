import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
const DetailsOrders = ({ onClose, order }) => {
  const [data, setData] = useState({
    items: order?.items,
    customerName: order?.customerName,
    isPaid: order?.isPaid,
    totalAmount: order?.totalAmount,
    paymentMethod: order?.paymentMethod,
    orderDate: order?.orderDate,
    phoneNumber: order?.phoneNumber,
    productName: order?.productName,
    productImage: order?.productImage || [],
    status: order?.status,
    shippingAddress: order?.shippingAddress,
  });
  function fetchOrders() {
    console.log(data.items);
  }
  console.log(fetchOrders);
  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Details Order</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <div className=" grid p-4 gap-2 overflow-y-scroll  h-full pb-5">
          {data.items.map((item, key) => (
            <div
              key={item.productId}
              className="grid p-4 gap-0  h-full pb-5 grid-rows-1 grid-cols-2"
            >
              <img
                src={item.productImage}
                width={80}
                height={80}
                className="bg-slate-100 border cursor-pointer "
                alt=""
              />
              <div>
                <h4>{item.productName}</h4>
                <h1>{item.category}</h1>
                <h2>Selling Price:{item.sellingPrice}</h2>
                <h3>{item.quantity}</h3>
              </div>
            </div>
          ))}
            <hr/>
          <h3 className="text-right">Total Amount: {data.totalAmount}</h3>
          <h3>Customer Name: {data.customerName}</h3>
          <h3>Shipping Address: {data.shippingAddress}</h3>
          <h3>Phone Number: {data.phoneNumber}</h3>
          <h3>Ordered date: {data.orderDate}</h3>
          <h3>Status order:{data.status}</h3>
          
          <h3>Payment method: {data.paymentMethod}</h3>
          <h3>adasd</h3>
        </div>
      </div>
    </div>
  );
};

export default DetailsOrders;
