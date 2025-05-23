const {PrismaClient} = require("@prisma/client")
const postLists = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const posts = await prisma.posts.findMany()
    res.status(200).json({postList:posts}) 
  }catch(error){
    res.status(400).json({message:error.message})  
 }
}
module.exports = postLists