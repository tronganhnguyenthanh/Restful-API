const {PrismaClient} = require("@prisma/client")
const removeUserPosts = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const userId = Number(req.params.userId)
    await prisma.user.delete({where:{userId:userId}})
    res.status(200).json({message:"User posts deleted successfully"})
  }catch(error){
    res.status(400).json({message:error.message}) 
  }
}
module.exports = removeUserPosts