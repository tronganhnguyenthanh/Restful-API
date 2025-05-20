const {PrismaClient} = require("@prisma/client")
const userList = async (req, res) => {
  try{
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()
    res.status(200).json({users:users})
  }catch(error){
    res.status(400).json({message:error.message}) 
  }
}
module.exports = userList