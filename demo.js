const oss = require("ali-oss");
const co = require("co");
const store = oss({
    accessKeyId: "LTAI5tDGdR1ykZxNPJiwdYuC",
    accessKeySecret: "74VYjhif1I6j18bDinUEnWD0tuCmgu",
    bucket: "compeition-excute",
    region: "oss-cn-beijing"
},)

      co(function*() {
        return yield store.put(
          `pool/excel/file/js000009.xlsx`,
          `./作品链接.xlsx`
        );
      }).then(val => {
        console.log(`${val.name} has been uploaded to oss :${val.name}`);
      });