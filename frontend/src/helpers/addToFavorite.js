import SummaryApi from "../common"
import { toast } from 'react-toastify'
const addToFavorite=async(e,id)=>{
    e?.stopPropagation()
    const response = await fetch(SummaryApi.addToFavorite.url,{
        method : SummaryApi.addToFavorite.method,
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


export default addToFavorite