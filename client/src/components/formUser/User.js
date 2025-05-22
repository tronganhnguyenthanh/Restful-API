import {useState} from "react"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import axios from "axios"
import {ToastContainer, toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
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
   toast.error("Please enter your last name", {position:"top-center"})
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