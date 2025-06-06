const {PrismaClient} = require("@prisma/client")
const removePostList = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const postId = req.params.postId
    await prisma.posts.delete({where:{postId:postId}})
    res.status(200).json({message:"Post deleted successfully"})
  }catch(error){
    res.status(400).json({message:error.message}) 
  }
}
module.exports = removePostList