const {PrismaClient} = require("@prisma/client")
const addUser = async (req, res) => {
  try{
     const prisma = new PrismaClient()
     const {firstName, lastName, email} = await req.body
     await prisma.user.create({data:{firstName:firstName, lastName:lastName, email:email}})
     res.status(200).json({message:"User added successfully"}) 
   }catch(error){
     res.status(400).json({message:error.message})  
   }
}
module.exports = addUser