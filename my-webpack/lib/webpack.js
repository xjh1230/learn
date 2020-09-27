const fs = require('fs')
const path = require('path')

const paser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = class webpack {
    constructor(options) {
        this.entry = options.entry
        this.output = options.output
        this.modules = []
    }
    run() { //有点感动了怎么办？
        const source = this.parse(this.entry)
        this.modules.push(source)
        for (let i = 0; i < this.modules.length; i++) {
            const item = this.modules[i]
            const { dependencies } = item
            if (dependencies) {
                for (let dep in dependencies) {
                    this.modules.push(this.parse(dependencies[dep]))
                }
            }
        }
        const obj = Object.create(null)
        this.modules.forEach(item => {
            obj[item.entryFile] = {
                dependencies: item.dependencies,
                code: item.code
            }
        })
        this.file(obj)
    }
    parse(entryFile) {
        console.log('entryFile', entryFile)
        const source = fs.readFileSync(entryFile, 'utf-8')
        const ast = paser.parse(source, {
            sourceType: "module"
        })
        const dependencies = {}
        traverse(ast, {
            ImportDeclaration({ node }) {
                const realPath = `./${path.join(path.dirname(entryFile),node.source.value)}`
                dependencies[node.source.value] = realPath
            }
        })
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        return {
            entryFile,
            dependencies,
            code
        }
    }
    file(code) {
        const filePath = path.join(this.output.path, this.output.filename)
        const source = JSON.stringify(code)

        const bundle = `(function(modules){
                function require(module){
                    function newRequire(relativePath){
                        return require(modules[module].dependencies[relativePath])
                    }
                    var exports ={};
                    (function(require,exports,code){
                        eval(code)
                    })(newRequire,exports,modules[module].code)
                    return exports
                }
                require('${this.entry}')
            }
        )(${source})`
        fs.writeFileSync(filePath, bundle, 'utf-8')
    }

}