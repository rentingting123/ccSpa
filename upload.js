const oss = require("ali-oss"),
    fs = require('fs'),
    path = require('path'),
    config = require('./config'),
    ossConfig = config.build.oss,
    client = new oss(ossConfig);

const webpath = require("./package.json").config
const currentWeb = webpath.website
var name = `${process.env.NODE_ENV}/${webpath.webVersion}`;

console.log(process.env.NODE_ENV)
//uploadJs
function fileUpload(root,isDirectory){
    fs.readdir(root, (err, file) => {
        console.log(file)
        if(err)return 
        file.map(async fileName=>{
            let localPath =`${root}/${fileName}`
            ,   bucketPath = localPath.replace(config.build.assetsRoot,name)
            var stats = fs.statSync(localPath)
            if(stats.isDirectory()){
                fileUpload(localPath,true)
            }
            else{
                //排除html
                //上传其余的文件
                if(fileName.indexOf('html')<0){put(localPath,bucketPath)}
                // put(localPath,bucketPath)
                 else if(isDirectory){
                  await put(localPath,bucketPath,false)
                     //如果是html文件丢到外层文件夹
                  fs.rename(localPath,path.join(root,'../',fileName),function(err){
                    if(err) throw err
                  })
                }
            }
        })
    })
}


async function put (localPath,bucketPath,del=true) {
    try {
      // 填写Object完整路径和本地文件的完整路径。Object完整路径中不能包含Bucket名称。
      // 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      let result = await client.put(bucketPath, localPath);
      if(result.res&&result.res.status == 200){
       // console.log(`${localPath} has been uploaded to oss :${bucketPath}`);
       if(del){
         fs.unlinkSync(localPath);
         console.log("上传成功，已删除")
       }else  console.log("上传成功")
        //console.log(`file >> ${localPath} << upload success! delete file`);
      }else{console.res}
    } catch (e) {
      console.log("上传失败，已保留")
      console.log(e);
    }
  }
fileUpload(config.build.assetsRoot)
