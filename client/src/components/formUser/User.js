import {useState} from "react"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
const User = () => {
 const init_data = {
  firstName:"",
  lastName:"",
  email:""
 }
 const [data, setData] = useState(init_data)
 const navigate = useNavigate()
 const handleOnChange = (e) => {
  let newData = {...data}
  newData[e.target.name] = e.target.value
  setData(newData)
 }
 const handleAddUser = async () => {
  if(data.firstName === ""){
   toast.error("Please enter your first name", {position:"top-center"})
   return
  }
  if(data.lastName === ""){
   toast.error("Please enter your last name", {position:"top-center"})
   return
  }
  if(data.email === ""){
   toast.error("Please enter your email", {position:"top-center"})
   return
  }else{
    let res = await axios.post("http://localhost:8080/user/add", {firstName:data.firstName, lastName:data.lastName,email:data.email})
    toast.success(res.data.message, {position:"top-center"})
    setTimeout(function(){
     navigate("/user/posts/add")
    },1000)
  }
 }
 return (
  <Container>
    <ToastContainer/>
    <div className="d-flex justify-content-end">
      <Link to="/user/posts/add">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
         <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
       </svg>
      </Link>
    </div>
    <div className="user-form-wrapper">
      <Form>
        <Row>
         <Col lg="6">
           <div className="mb-4">
              <Form.Label>Firstname</Form.Label>
              <Form.Control className="form-custom-control" name="firstName" onChange={handleOnChange}/>
            </div>
          </Col>
          <Col lg="6">
            <div className="mb-4">
              <Form.Label>Lastname</Form.Label>
              <Form.Control className="form-custom-control" name="lastName" onChange={handleOnChange}/>
            </div>
          </Col>
          <Col lg="6">
            <div className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control className="form-custom-control" name="email" onChange={handleOnChange}/>
            </div>
          </Col>
        </Row>
        <Button type="button" className="m-1" onClick={handleAddUser}>Create user</Button>
      </Form>
    </div>
  </Container>
 )
}
export default User