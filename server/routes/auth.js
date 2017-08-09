import auth from '../controllers/user.js'
import asyncBusboy from 'async-busboy';
import koa_router from 'koa-router'
var router = koa_router()
var fn_upload = async(ctx,next)=>{
    try {
        const {files, fields} = await asyncBusboy(ctx.req);
        var filenames = [];
        files.forEach((file) =>{
            var filename = file.filename,
                uploaddir = path.join(__dirname , "../static"),
                fileExt = filename.substring(filename.lastIndexOf('.')),
                newfilename = new Date().getTime() + fileExt,
                targetdir='',middledir='';
            switch (true) {
                case ('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "imgs";
                    break;
                case ('.mp3').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "audio";
                    break;    
                case ('.mp4').indexOf(fileExt.toLowerCase()) > -1:
                    middledir = "video";
                    break;
                default:
                    middledir = "upload";
                    break;
            };
            targetdir = path.join(uploaddir,middledir);
            //检查目标存放目录是否存在
            if (!fs.existsSync(targetdir)) {
                fs.mkdir(targetdir);
            }
            //生成存储路径 这里必须为绝对路径
            var stream = fs.createWriteStream(path.join(targetdir,newfilename));
            filenames.push({
                name:filename.replace(fileExt,""),
                path:path.join(middledir,newfilename)
            });
            //写入文件流-- file是一个read流
            file.pipe(stream);
        })
        if(filenames.length > 0){
            // ctx.respData({data:{
            //     files:filenames
            // }});
            console.log('shoudao')
        }
    } catch (error) {
        // ctx.respData({errcode:1001});
        console.log(error);
    }
}
router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/login', auth.postUserAuth)
router.post('/upload',auth.upload)//上传图片
router.post('/register',auth.register)//注册
router.get('/getCode',auth.getCode)
console.log(auth.getCode)
export default router
