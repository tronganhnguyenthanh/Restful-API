import axios from "axios"
import {useEffect} from "react"
import {useState} from "react"
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const UserPost = () => {
  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
   getAuthors()
  },[])
  const getAuthors = async () => {
   let res = await axios.get("http://localhost:8080/user/lists")
   setAuthors(res.data.users)
  }
  const handleAddPost = async () => {
    if(title === ""){
     toast.error("Please enter your title", {position:"top-center"})
     return
    }
    if(content === ""){
     toast.error("Please enter your content", {position:"top-center"})
     return
    }
    if(selected === ""){
     toast.error("Please choose your author id", {position:"top-center"})
     return
    }else{
      let userPosts = await axios.post("http://localhost:8080/post/add", {
       postList:[{title:title, content:content,authorId:selected}]
      })
      toast.success(userPosts.data.message, {position:"top-center"})
      navigate("/post/lists")
    }
  }
  return (
   <Container>
     <ToastContainer/>
      <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </Link>
     <div className="post-form-wrapper">
      <Form>
        <Row>
         <Col lg="12">
           <div className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                className="form-custom-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </Col>
          <Col lg="12">
            <div className="mb-4">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                className="form-custom-control"
                as={"textarea"}
                rows={9}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </Col>
          <Col lg="12">
            <div className="mb-4">
             <Form.Label>Author</Form.Label>
              {authors.length > 0 && authors.map((author, index) => {
                return(
                 <Form.Check
                   key={index}
                   className="form-custom-control w-100"
                   type="radio"
                   value={author.userId}
                   label={author.firstName + " " + author.lastName + " " + `(${author.email})`}
                   name="name"
                   onChange={(e) => setSelected(e.target.value)}
                 />
                )
               })
              }
            </div>
          </Col>
        </Row>
        <Button type="button" className="m-1" onClick={handleAddPost}>Add new posts</Button>
      </Form>
     </div>
   </Container>
  )
}
export default UserPost