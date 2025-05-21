import axios from "axios"
import {useEffect, useState} from "react"
import {Button, Col, Form, Row} from "react-bootstrap"
import {toast, ToastContainer} from "react-toastify"
const UserList = () => {
  const [users, setUsers] = useState([])
  const [checked, setChecked] = useState("")
  useEffect(() => {
   getUsers()
  },[])
  const getUsers = async () => {
   let res = await axios.get("http://localhost:8080/user/lists")
   setUsers(res.data.users)
  }
  const handleAddNewPost = async () => {
    if(checked === ""){
     toast.error("Please choose your user's email", {position:"top-center"})
     return
    }
  }
  return (
   <Row className="m-2">
     <ToastContainer/>
     {users.length > 0 && users.map((i) => {
       return(
         <Col lg="12" key={i.userId}>
          <Form.Check 
             type="checkbox" 
             label={i.email} 
             value={i.userId}
             onChange={(e) => setChecked(e.target.value)}
           />
           <div className="d-flex">
             <Button variant="info" onClick={handleAddNewPost}>Add new post</Button>
           </div>
         </Col>
       )
      })
      }
    </Row>
  )
}
export default UserList