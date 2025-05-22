import {Route, Routes} from "react-router-dom"
import User from "../components/formUser/User"
import UserPost from "../components/formPost/Post"
import PostLists from "../components/formPostList/PostLists"
const App = () => {
  return (
   <div className="App">
     <Routes>
       <Route path="/" element={<User/>}/>
       <Route path="/user/posts/add" element={<UserPost/>}/>
       <Route path="/user/post/lists" element={<PostLists/>}/> 
     </Routes>
   </div>
  )
}
export default App
