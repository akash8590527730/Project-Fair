import React, { useContext, useEffect, useState } from 'react'
import ADD from './Add'
import Edit from './Edit'
import { userProjectApi, userProjectRemoveAPI } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../../contexts/ContextApi'
const View = () => {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [userProjects,setUserProjects] = useState([])

useEffect(()=>{
  getUserProjects()
},[addProjectResponse,editProjectResponse])
console.log(userProjects);


  const getUserProjects = async()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
 "Authorization":`Bearer ${token}`
      }
      try{
const result = await userProjectApi(reqHeader)
console.log(result);

if(result.status==200){
  setUserProjects(result.data)
}
      }catch(err){
        console.log(err);
        
      }
    }
  }
  const deleteProject = async(id)=>{
    const token = sessionStorage.getItem("token")
if(token){
  const reqHeader = {
    "Authorization":`Bearer ${token}`
  }
  try{
await userProjectRemoveAPI(id,reqHeader)
getUserProjects()
  }catch(err){
    console.log(err);
    
  }
  }}
  return (
 <>
 <div className='d-flex justify-content-between'>
  <h2 className='text-warning'> All Projects</h2>
  <div><ADD/></div>
 </div>
    <div className='mt-2 allProjects'>
    {
      userProjects?.length>0?
      userProjects?.map(project=>(
        <div className='border rounded p-2 d-flex justify-content-between mb-3'>
        <h3>{project?.title}</h3>
        <div className='d-flex align-items-center'>
          <div ><Edit project={project}/> </div>
          <div className='btn'> <a target='_blank' href={project?.github}><i className='fa-brands fa-github'></i></a></div>
          <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
        </div>
      </div>
      ))
      :
      <div className='text-warning fw-bolder'>user not uploaded any projects</div>
    }
    </div>
 </>
  )
}

export default View