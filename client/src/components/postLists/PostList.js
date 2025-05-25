import axios from "axios"
import {useState, useEffect} from "react"
import {Button, Table} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import {toast, ToastContainer } from "react-toastify"
const PostList = () => {
  const [postLists, setPostLists] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
   getPostLists()
  },[])
  const getPostLists = async () => {
    let res = await axios.get("http://localhost:8080/post/lists")
    let posts = res.data.postList
    let uniquePosts = []
    let seenIds = new Set()
    for(let post of posts){
     if (!seenIds.has(post.authorId)){
      seenIds.add(post.authorId)
      uniquePosts.push(post)
      setPostLists(uniquePosts)
     }
    }
  }
  const viewPostDetail = (authorId) => {
    navigate(`/user/post/detail/${authorId}`)
  }
  const deletePost = async (postId) => {
    let isConfirmed = window.confirm("Are you sure to delete this post?")
    if(isConfirmed === true){
     let res = await axios.delete(`http://localhost:8080/post/${postId}`)
     toast.success(res.data.message, {position:"top-center"})
     window.location.reload(false)
    }
  }
  const handleFilter = (e) => {
    if(e.target.value === ""){
     getPostLists()
    }else{
      let filterPost = postLists.filter((i) => i.title.includes(e.target.value))
      setPostLists(filterPost)
    }
  }
  return (
    <div className="p-2">
      <h2 className="text-center text-primary m-2">Post lists</h2>
      <ToastContainer />
      <div className="d-flex justify-content-between">
        <Link to="/user/posts/add">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </Link>
        <div className="position-relative mb-3 search-bar">
          <span className="position-absolute text-muted icon-inside-input">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input 
            type="text" 
            className="form-control pl-4" 
            placeholder="Please enter your keyword"
            onChange={handleFilter}
          />
        </div>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th className="text-center">PostId</th>
            <th className="text-center">Title</th>
            <th>Content</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {postLists.length > 0 && postLists.map((i, index) => {
            return (
              <tr key={index}>
                <td className="text-center text-primary align-middle">{index + 1}</td>
                <td className="text-center text-info text-nowrap align-middle">{i.title}</td>
                <td className="text-secondary text-nowrap align-middle text-truncate">{i.content}</td>
                <td className="text-center text-nowrap align-middle">
                  <Button variant="primary" onClick={() => viewPostDetail(i.authorId)}>View posts</Button>
                  <Button variant="danger" className="m-2" onClick={() => deletePost(i.postId)}>Delete post</Button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
    </div>
  )
}
export default PostList