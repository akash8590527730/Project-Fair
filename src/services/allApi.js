import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI called by AUTH component when user click register btn
export const registerAPI = async (reqBody)=>{
 return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}
// loginAPI called by AUTH component when user click login btn
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
   }

//    addProjectAPi called by add component when user click add buttton
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}
// getHomeProjectApi called by Home component when page loaded in browser (useEffect)
 export const getHomeProjectApi = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
 }
 // allProjectApi called by Project component when page loaded in browser (useEffect)
 export const allProjectApi = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
 }
  // userProjectApi called by View component when page loaded in browser (useEffect)
  export const userProjectApi = async (reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}
// updateProjectAPI called by Edit component when user click update btn projects/6728b22ee1a447b0161a6118/edit
export const updateProjectAPI = async(id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}
  // userProjectApi called by View component when page loaded in browser (useEffect)
  export const userProjectRemoveAPI = async (id,reqHeader)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
  }
// updateUserAPI called by profile component when user click update btn edit-user 
export const updateUserAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}