const multer=require("multer")
const fs=require("fs")
const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        console.log(process.cwd(),__dirname)

        if (!fs.existsSync("C:/Ahex-tasks/task3/uplode")){
            fs.mkdirSync("C:/Ahex-tasks/task3/uplode")
        }
        cd(null,"C:/Ahex-tasks/task3/uplode")
    },
    filename:(req,file,cd)=>{
        cd(null,file.originalname+"-"+Date.now()+"."+file.originalname.split(".").pop())
    }
    
})
const uplode=multer({storage:storage})
module.exports=uplode