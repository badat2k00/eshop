import SummaryApi from "../common"
import { toast } from 'react-toastify'
const deleteFavoriteProduct=async(e,id)=>{
    e?.stopPropagation()
    const response = await fetch(SummaryApi.deleteFavoriteProduct.url,{
        method : SummaryApi.deleteFavoriteProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()
    if(responseData.success){
        toast.success(responseData.message);
        
    }

    if(responseData.error){
        toast.error(responseData.message)
    }


    return responseData
}
export default deleteFavoriteProduct