const fs = require('fs')
module.exports.createLoader = config => {
    const loader = (scanFolder, cb) => {
        const files = fs.readdirSync(scanFolder);
        files.forEach(filename => {
            filename = filename.replace(".js", "");
            const file = require(scanFolder + "/" + filename);
            cb(filename, file);
        })
    }

    return {
        initFunction: scanFolder => {
            const ret = {}
            // ##BEGIN## 代码已加密
            //暗号：贪心算法
            loader(scanFolder,(fileName,file)=>{
                if(typeof file=='function'){
                    file = file(config)
                }
                ret[fileName]=file
            })
            // ##END##
            return ret
        }
    }
}

