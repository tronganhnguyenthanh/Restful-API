const {PrismaClient} = require("@prisma/client")
const userDetailPost = async (req, res) => {
  try{
    const userId = Number(req.params.userId)
    const prisma = new PrismaClient()
    const userDetailPosts = await prisma.user.findUnique({where:{userId:userId},include:{post:true}})
    res.status(200).json({posts:userDetailPosts})
  }catch(error){
    res.status(400).json({message:error.message}) 
  }
}
module.exports = userDetailPost