import {useEffect, useState} from "react"
import {Card, Col, Row} from "react-bootstrap"
import axios from "axios"
const PostLists = () => {
  const [postLists, setPostList] = useState([])
  const [userPost, setUserPost] = useState([])
  useEffect(() => {
   getPostLists()
  },[])
  const getPostLists = async () => {
   let res = await axios.get("http://localhost:8080/user/posts")
   let posts = await res.data.posts
   let postTitle = await posts.flatMap((i) => i.post.map((t) => t.title))
   let postContent = await posts.flatMap((i) => i.post.map((c) => c.content))
   let authorId = await posts.flatMap((i) => i.post.map((a) => a.authorId))
   userPost.push({
    authorId:authorId,
    title:postTitle,
    content:postContent
   })
   setUserPost(userPost)
   setPostList(posts)
  }
  return (
   <div>
     <h2 className="text-center text-primary">User's post list</h2>
     <Row className="p-2">
       {postLists.length > 0 && postLists.map((post, index) => {
         return(
          <Col lg="12" key={index}>
            <Card className="m-2">
              <h2 className="text-center text-info">{post.firstName} {post.lastName}</h2>
            </Card>
          </Col>
         )
        })
       }
     </Row>
   </div>
  )
}
export default PostLists