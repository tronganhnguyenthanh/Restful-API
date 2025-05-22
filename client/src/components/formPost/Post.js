import axios from "axios"
import {useEffect} from "react"
import {useState} from "react"
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import {toast, ToastContainer} from "react-toastify"
const UserPost = () => {
  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState("")
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
     toast.error("Please choose your user's post", {position:"top-center"})
     return
    }else{
      let userPosts = await axios.post("http://localhost:8080/post/add", {postList:[{title:title, content:content,authorId:Number(selected)}]})
      toast.success(userPosts.data.message, {position:"top-center"})
    }
  }
  return (
   <Container>
     <ToastContainer/>
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