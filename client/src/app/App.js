import {Route, Routes} from "react-router-dom"
import User from "../components/formUser/User"
import UserPost from "../components/formPost/CreatePosts"
import PostDetail from "../components/formPostDetail/PostDetail"
import PostList from "../components/postLists/PostList"
const App = () => {
  return (
   <div className="App">
     <Routes>
       <Route path="/" element={<User/>}/>
       <Route path="/user/posts/add" element={<UserPost/>}/>
       <Route path="/post/lists" element={<PostList/>}/>
       <Route path="/user/post/detail/:userId" element={<PostDetail/>}/> 
     </Routes>
   </div>
  )
}
export default App
