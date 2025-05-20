const {PrismaClient} = require("@prisma/client")
const addPosts = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const {postList} = await req.body
    await prisma.posts.createMany({data:postList})
    res.status(200).json({message:"Post added successfully"}) 
  }catch(error){
    res.status(400).json({message:error.message})  
 }
}
module.exports = addPosts