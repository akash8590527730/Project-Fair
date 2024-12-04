import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from '../assets/profile1.webp'
import SERVER_URL from '../services/serverUrl'
import { updateUserAPI } from '../services/allApi'

const Profile = () => {
  const [preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilepic:""
  })
  const [open, setOpen] = useState(false);
  useEffect(()=>{
if(sessionStorage.getItem("user")){
  const user = JSON.parse(sessionStorage.getItem("user"))
  setUserDetails({
    ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
  })
  setExistingProfileImg(user.profilepic)
}
  },[open])

useEffect(()=>{
if(userDetails.profilepic){
setPreview(URL.createObjectURL(userDetails.profilepic))
}else{
  setPreview("")
}
},[userDetails.profilepic])

const handleUpdateProfile = async ()=>{
  const {username,email,password,github,linkedin,profilepic} = userDetails
  if(linkedin && github){
const reqBody = new FormData()
reqBody.append("username",username)
reqBody.append("email",email)
reqBody.append("password",password)
reqBody.append("github",github)
reqBody.append("linkedin",linkedin)
preview ? reqBody.append("profilePic",profilepic): reqBody.append("profilePic",existingProfileImg)
const token = sessionStorage.getItem("token")
  if(token){
const reqHeader= {
  "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
}
try{
  const result = await updateUserAPI(reqBody,reqHeader)
  if(result.status==200){
    alert("User Profile update successfully")
    sessionStorage.setItem("user",JSON.stringify(result.data))
    setOpen(!open)
  }else{
    console.log(result);
  }
}catch(err){
  console.log(err);
  
}
  }
 }else{
    alert("Please fill the form completly")
  }
}
  return (
    <>
    <div className="d-flex justify-content-evenly ">
      <h3 className='text-warning'>Profile</h3>
      <button  onClick={() => setOpen(!open)}className='btn text-warning'><i className='fa-solid fa-chevron-down'></i></button>
    </div>
    <Collapse in={open}>

          <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded ' id='example-collapse-text '>
<label className='text-center'>
  <input onChange={e=>setUserDetails({...userDetails,profilepic:e.target.files[0]})} type="file" style={{display:'none'}} />
 {
  existingProfileImg=="" ?
 <img width={'200px'} height={'200px'} className=' rounded-circle' src={preview?preview:profileImg} alt="" />
 :
 <img width={'200px'} height={'200px'} className=' rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
 
 }
</label>
<div className="mb-2 w-100">
  <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text " className='form-control' placeholder='User GITHU Link' />
</div>
<div className="mb-2 w-100">
  <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text " className='form-control' placeholder='User LINKEDIN PROFILE Link' />
</div>
<div className="d-grid">
<button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
</div>
          </div>

      </Collapse>
    </>
  )
}

export default Profile