let express=require("express")
const uplode = require("../middlewares/multer")
const profileUplode = require("../controllers/fileUplode")
let router=express.Router()
router.get ("/uplode",uplode.single("file"),profileUplode)

module.exports=router

