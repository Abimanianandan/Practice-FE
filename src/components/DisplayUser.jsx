import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react'
import { userContext } from '../App';
import { Link } from 'react-router-dom';

const DisplayUser = () => {
    const {users,setUsers} = useContext(userContext)
    const [deleteUser,setDeleteUser] = useState([]);
    const [newUser,setNewUser] = useState({
        name:"",
        password:"",
        age:"",
        education:""
    })
    useEffect(()=>{
        fetchData()
    },[deleteUser])
    const fetchData = async() =>{
        try {
             const res = await axios.get("http://localhost:4001/api/user/allUsers")
             setUsers(res.data.users)
        } catch (error) {
            console.log(error.message);          
        }
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
              const res = await axios.post("http://localhost:4001/api/user/create",newUser)
              alert("user created successfully")              
              setUsers(res.data.users)
              setNewUser({name:"",password:"",age:"",education:""})
              window.location.reload()
        } catch (error) {
            console.log(error.message);           
        }
    }
    const handleChange = (e) =>{
       const{name,value} = e.target;
       setNewUser((preData)=>({...preData,[name]:value}))
    }
    const handleDelete = async(id) =>{
        try {
           await axios.delete(`http://localhost:4001/api/user/${id}`)
           alert("user deleted successfully")
           setDeleteUser((preData)=>preData.filter((item)=>item._id !== id))
        } catch (error) {
          console.log(error.message);          
        }
    }
  return (
    <>
     <form className="d-flex gap-3 justify-content-center align-items-center mt-5" onSubmit={handleSubmit}>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                required
              /> 
            </div> 
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                required
              /> 
            </div> 
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Age"
                name="age"
                value={newUser.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Education"
                name="education"
                value={newUser.education}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Add User
              </button>
            </div> 
            

          </form>
    <table className="table table-success table-striped w-50 mx-auto mt-5">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Education</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((item,index)=>{        
        return(
           <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.education}</td>
              <td>
                <Link className='btn btn-success' to={`/${item._id}`}>Edit</Link>
                <button className='btn btn-danger ms-3' onClick={()=>handleDelete(item._id)}>Delete</button>
              </td>
           </tr>
        )
    })}
  </tbody>
    </table>
    </>
  )
}

export default DisplayUser