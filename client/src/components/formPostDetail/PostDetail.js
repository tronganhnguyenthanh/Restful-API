import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Loading from "../../loading/Loading"
const PostDetail = () => {
  const { userId } = useParams()
  const [userPostsDetail, setUserPostsDetail] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getUserPostsDetail(userId)
  }, [userId])
  const getUserPostsDetail = async (userId) => {
    let res = await axios.get(`https://rest-api-server-1-iwtx.onrender.com/user/post/detail/${userId}`)
    let posts = await res.data.posts
    setUserPosts(posts.post)
    setUserPostsDetail(posts)
    setLoading(!loading)
  }
  return (
    <Container className="p-2">
      <div className="d-flex justify-content-between">
        <Link to="/post/lists">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </Link>
        <h2 className="text-center text-primary m-2">
          User's detail post list
          <>
           {
            loading 
            ? 
            <Loading/> 
            :
            <>
             ({userPostsDetail.lastName} 
             {userPostsDetail.firstName})
            </>
           }
          </>
        </h2>
      </div>
      <Row className="p-2">
        <>
        {
         loading ?
          <div>
            <Loading/>
          </div>
          :
          <>
           {userPosts.length > 0 && userPosts.map((item, index) => {
             return (
               <Col lg="12" key={index}>
                 <Card className="p-2 m-2">
                   <h2 className="text-center text-info">{item.title}</h2>
                   <span className="text-center text-secondary">{item.content}</span>
                 </Card>
               </Col>
             )
            })
           }
          </>
        }
        </>
      </Row>
    </Container>
  )
}
export default PostDetail