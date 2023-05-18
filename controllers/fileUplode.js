let fs=require("fs")
let pdfparser=require("pdf-parse")
const xlsx=require("xlsx")
let profileUplode=(req,res)=>{
    console.log(req.file.path)
    //reading the data from the text file
    fs.readFile(req.file.path,(er,data)=>{

        try{
            if (req.file.path.split(".").pop()==="txt"){
                if(er){console.log(er)} 
                res.status(200).json({"data":data.toString()})
            }
            //reading the data from the PDF by using pdf-parse library
            else if(req.file.path.split(".").pop()==="pdf"){

               const  filedata=fs.readFileSync(req.file.path)
               pdfparser(filedata).then((data)=>{
                console.log({ "numpages":data.numpages,"info":data.info,"metadata":data.metadata,"text":data.text,"numrender":data.numrender})
                res.status(200).json({ "text":data.text})
            })
            .catch((er)=>{console.log(er)})
            }
            //reading the data fron the xls file by using the "XLSX" library
            else if(req.file.path.split(".").pop()==="xls"){
                try{
                 const file=xlsx.readFile(req.file.path)
                 //sheetnames consist of all sheets in the xlsx file in form of array
                 const sheetNames=file.SheetNames
                 console.log("sheetNames....",sheetNames)
                 for (let i=0;i<sheetNames.length;i++){
                    //converting the  sheet data in to json format
                    const arr=xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]])
                    res.status(200).json((arr))
                 }
                 
                }catch(er){
                    console.log(er)
                }
            }
        }catch(er){console.log(er)}
    
     })

}
module.exports=profileUplode