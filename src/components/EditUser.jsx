import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../App';

const EditUser = () => {
    const {id} = useParams();
    const {setUsers} = useContext(userContext);
     const [editUser,setEditUser] = useState({
        name:"",
        password:"",
        age:"",
        education:""
    })
    const navigate = useNavigate();
    useEffect(()=>{
        getData()
    },[])
    const getData = async() =>{
        try {
             const res = await axios.get(`https://practice-be-nd0k.onrender.com/api/user/${id}`)
             setEditUser(res.data.user)
        } catch (error) {
            console.log(error.message);        
        }
    }
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setEditUser((preData)=>({...preData,[name]:value}))
    }
   
      const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
              const res = await axios.put(`https://practice-be-nd0k.onrender.com/api/user/${id}`,editUser)
              alert("user updated successfully")              
              setUsers(res.data.users)
              setEditUser({name:"",password:"",age:"",education:""})
              navigate("/home")
              window.location.reload()
        } catch (error) {
            console.log(error.message);           
        }
    }
  return (
    <form
      className="d-flex gap-3 justify-content-center align-items-center mt-5"
      onSubmit={handleSubmit}
    >
      <div className="card bg-warning" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-center">
            Edit User
          </h5>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={editUser.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              name="password"
              value={editUser.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Age"
              name="age"
              value={editUser.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-auto mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Education"
              name="education"
              value={editUser.education}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-auto mt-3">
              <Link className="btn btn-danger" to={"/home"}>
              Cancel
            </Link>
            <button className="btn btn-primary ms-3" type="submit">
              Update User
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditUser