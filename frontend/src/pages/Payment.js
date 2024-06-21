import React, { useContext, useState } from "react";
import Context from "../context";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {resetCartProduct} = useContext(Context)
  const [data, setData] = useState({
    customerName: "",
    shippingAddress: "",
    phoneNumber: "",
    paymentMethod: "VNPAY",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const createPaymentUrl=async(e)=>{
  //   try{
  //     const fetchResponse = await fetch(SummaryApi.createPaymentUrl.url, {
  //       method: SummaryApi.createPaymentUrl.method,
  //       credentials: "include",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const responseData = await fetchResponse.json();
  //     if(responseData){
  //       navigate(data.vnp_URL)
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  const createPaymentUrl = async () => {
    try {
      const fetchResponse = await fetch(SummaryApi.createPaymentUrl.url, {
        method: SummaryApi.createPaymentUrl.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          language:"VN"
        }),
      });
      const responseData = await fetchResponse.json();
      console.log(responseData.data)
      if (responseData && responseData.data && responseData.data.vnp_Url) {
        navigate("/order-success", { state: { orderData: responseData.data } });
      }
    } catch  {
  
      setError("Failed to create payment URL");
    }
  };
  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const fetchResponse = await fetch(SummaryApi.createOrder.url, {
  //       method: SummaryApi.createOrder.method,
  //       credentials: "include",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const responseData = await fetchResponse.json();

  //     if (!fetchResponse.ok) {
  //       const errorData = await fetchResponse.json();
  //       setError(errorData.message || "Something went wrong");
  //       return;
  //     }
  //     if(responseData.data.paymentMethod ==="COD"){
  //       resetCartProduct();
  //     }

  //     if (responseData.success) {
  //       // Nếu tạo đơn hàng thành công, chuyển hướng người dùng đến trang khác

  //       navigate("/order-success", { state: { orderData: responseData.data } });
  //     } else {
  //       // Xử lý lỗi
  //       console.error("Order creation failed:", responseData.message);
  //     }
  //   } catch (err) {
  //     setError(err.message || "Something went wrong");
  //   }
  //   console.log("Request data:", JSON.stringify(data));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchResponse = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await fetchResponse.json();
      console.log(responseData)
      if (!fetchResponse.ok) {
        const errorData = await fetchResponse.json();
        setError(errorData.message || "Something went wrong");
        return;
      }
      if (responseData.data.paymentMethod === "COD") {
        resetCartProduct();
      }

      if (responseData.success) {
        if (responseData.data.paymentMethod === "VNPAY") {
          await createPaymentUrl();
        } else {
          navigate("/order-success", { state: { orderData: responseData.data } });
        }
      } else {
        console.error("Order creation failed:", responseData.message);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <label>Họ tên :</label>

        <input
          type="text"
          name="customerName"
          value={data.customerName}
          onChange={handleChange}
          required
        />
        <label>Địa chỉ nhận hàng:</label>
        <input
          type="text"
          name="shippingAddress"
          value={data.shippingAddress}
          onChange={handleChange}
          required
        />

        <label>Số điện thoại</label>
        <input
          type="text"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
          required        
        />

        <h3>Phương thức thanh toán</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        


        <div className="controls mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={data.paymentMethod === "COD"}
              onChange={handleChange}
            />

            <span className="ml-2">Thanh toán khi nhận hàng </span>
          </label>
        </div>

        <div className="controls mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="VNPAY"
              checked={data.paymentMethod === "VNPAY"}
              onChange={handleChange}
            />
            <span className="ml-2">Thanh toán bằng VNPAY</span>
          </label>
        </div>

        {/* {
  data.paymentMethod==="VNPAY"&&(<><h3>Phương thức thanh toán</h3>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <div className="controls mb-2">
      <select>
        <option value="" key="">Hello</option>
        </select>    
      </div></>)
} */}
        <button type="submit">Tạo đơn hàng</button>
      </form>
      {/* <button onClick={resetCartProduct}>Click</button> */}

      {/* Còn thiếu reset giỏ hàng  */}
      
    </>
  );
};

export default Payment;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SummaryApi from "../common";

// const Payment = () => {
//   const [data, setData] = useState({
//     customerName: "",
//     shippingAddress: "",
//     phoneNumber: "",
//     paymentMethod: "COD", // Đặt giá trị mặc định là COD
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     try {
//       const fetchResponse = await fetch(SummaryApi.createOrder.url, {
//         method: SummaryApi.createOrder.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!fetchResponse.ok) {
//         const errorData = await fetchResponse.json();
//         setError(errorData.message || "Something went wrong");
//         return;
//       }

//       const responseData = await fetchResponse.json();

//       if (responseData.success) {
//         // Nếu tạo đơn hàng thành công, chuyển hướng người dùng đến trang khác
//         navigate("/order-success", { state: { orderData: responseData.data } });
//       } else {
//         // Xử lý lỗi
//         setError(responseData.message || "Order creation failed");
//       }
//     } catch (err) {
//       setError(err.message || "Something went wrong");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <h1>Payment</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Họ tên:</label>
//         <input
//           type="text"
//           name="customerName"
//           value={data.customerName}
//           onChange={handleChange}
//           required
//         />
//         <label>Địa chỉ nhận hàng:</label>
//         <input
//           type="text"
//           name="shippingAddress"
//           value={data.shippingAddress}
//           onChange={handleChange}
//           required
//         />
//         <label>Số điện thoại:</label>
//         <input
//           type="text"
//           name="phoneNumber"
//           value={data.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//         <h3>Phương thức thanh toán</h3>
//         <div className="controls mb-2">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="VNPAY"
//               checked={data.paymentMethod === "VNPAY"}
//               onChange={handleChange}
//             />
//             <span className="ml-2">Thanh toán bằng VNPAY</span>
//           </label>
//         </div>
//         <div className="controls mb-2">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="COD"
//               checked={data.paymentMethod === "COD"}
//               onChange={handleChange}
//             />
//             <span className="ml-2">Thanh toán khi nhận hàng</span>
//           </label>
//         </div>
//         <button type="submit">Tạo đơn hàng</button>
//       </form>
//     </>
//   );
// };

// export default Payment;
