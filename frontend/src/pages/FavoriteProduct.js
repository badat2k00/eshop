import React, { useEffect, useState ,useContext  } from "react";
import SummaryApi from "../common";
import scrollTop from '../helpers/scrollTop'
import displayVNDCurrency from '../helpers/displayCurrency'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const FavoriteProduct = () => {
  const [allFavorite, setAllFavorite] = useState([]);
  const [productItems,setproductItems]=useState([]);
  const {t}=useTranslation();
  const fetchAllFavorites = async () => {
    try{
    const response = await fetch(SummaryApi.getAllFavorite.url, {
      method: SummaryApi.getAllFavorite.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataResponse = await response.json();

    console.log("product data", dataResponse?.data);
    console.log()
    setAllFavorite(dataResponse?.data || []);
    setproductItems(dataResponse?.data[0]?.productItems||[])
  }catch(err){
    console.error("Error fetching favorites:", err);
    setAllFavorite([]);
    setproductItems([]);
  }
  };
  useEffect(() => {
    fetchAllFavorites();
  }, []);
  return (
    
    <div className='container mx-auto p-4 gap-2'>
      {productItems.length===0 && <div>No data</div>}
       <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
      {allFavorite.map((favorite, index) => (
        <>
            {favorite.productItems.map((product) => (
               <Link to={"/product/"+product?.productId} className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
               <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                   <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
               </div>
               <div className='p-4 grid gap-3'>
                   <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                   <p className=' text-slate-500'>{t(product?.category)}</p>
                   <div className='flex gap-3'>
                       <p className='text-red-600 font-medium'>{ displayVNDCurrency(product?.sellingPrice) }</p>
                       <p className='text-slate-500 line-through'>{ displayVNDCurrency(product?.price)  }</p>
                   </div>
                  
               </div>
           </Link>
            ))}
        </>
      ))}
    </div>
    </div>
  );
};

export default FavoriteProduct;
