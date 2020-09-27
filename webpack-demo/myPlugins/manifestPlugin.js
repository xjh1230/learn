class manifestWebpackPlugin{
    constructor(options){
        this.options=options
        this.msg ="做人嘛，最重要的是开心"
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync('manifestWebpackPlugin',(compilation,cb)=>{
            let len = Object.keys(compilation.assets).filter(s=>!s.endsWith('.html')).length
            var res = ''
            console.log()
            const output = {files:[]}
            console.log(Object.keys(compilation.assets))
            Object.keys(compilation.assets).forEach(fileName=>{
                if(!fileName.endsWith('.html')){
                    output.files.push(fileName)
                }
                
            })
             output['count']=len
            compilation.assets['manifest.json']={
                source:function(){
                    return JSON.stringify(output,null,'\t')
                },
                size:function(){
                    return JSON.stringify(output).length
                }
            }
            cb()
        })
    }
}

module.exports=manifestWebpackPlugin