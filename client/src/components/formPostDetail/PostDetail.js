import axios from "axios"
import {useEffect} from "react"
import {useState} from "react"
import {Button, Card, Col, Container, Row} from "react-bootstrap"
import {useParams} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
const PostDetail = () => {
  const {userId} = useParams()
  const [userPostsDetail, setUserPostsDetail] = useState({})
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
   getUserPostsDetail(userId)
  },[userId])
  const getUserPostsDetail = async (userId) => {
   let res = await axios.get(`http://localhost:8080/user/post/detail/${userId}`)
   let posts = await res.data.posts
   setUserPosts(posts.post)
   setUserPostsDetail(posts)
  }
  const deleteUserPost = async (userId) => {
    try{
     let deleteConfirmed = window.confirm("Are you sure to delete this post?")
     if(deleteConfirmed){
      let res = await axios.delete(`http://localhost:8080/user/posts/${userId}`)
      toast.success(res.data.message, {position:"bottom-center"})
      return
     }
    }catch(error){
      toast.error(error.message, {position:"top-center"})
      return
   }
  }
  return (
   <Container className="p-2">
     <ToastContainer/>
     <h2 className="text-center text-primary">User's detail post list ({userPostsDetail.firstName} {userPostsDetail.lastName})</h2>
     <Row className="p-2">
       <p className="text-primary"></p>
       {userPosts.length > 0 && userPosts.map((item, index) => {
         return(
          <Col lg="12" key={index}>
             <Card className="p-2 m-2">
               <h2 className="text-center text-info">{item.title}</h2>
               <span className="text-center text-secondary">{item.content}</span>
               <div className="d-flex justify-content-center">
                 <Button className="btn-delete" variant="danger" onClick={() => deleteUserPost(item.authorId)}>Delete</Button>
               </div>
             </Card>
           </Col>
         )
        })
       }
     </Row>
   </Container>
  )
}
export default PostDetail