import {Route, Routes} from "react-router-dom"
import User from "../components/formUser/User"
import UserList from "../components/userList/users"
const App = () => {
  return (
   <div className="App">
     <Routes>
       <Route path="/" element={<User/>}/>
       <Route path="/user/lists" element={<UserList/>}/> 
     </Routes>
   </div>
  )
}
export default App
