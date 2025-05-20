const {PrismaClient} = require("@prisma/client")
const userPosts = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const userPosts = await prisma.user.findMany({include:{post:true}})
    res.status(200).json({posts:userPosts})
  }catch(error){
    res.status(400).json({message:error.message}) 
  }
}
module.exports = userPosts