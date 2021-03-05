const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const prefixRE = /^VUE_APP_/
const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g


function parse(src /*: string | Buffer */ , options /*: ?DotenvParseOptions */ ) /*: DotenvParseOutput */ {
    const obj = {}

    // convert Buffers before splitting into lines and processing
    src.toString().split(NEWLINE).forEach(function(line, idx) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(RE_INI_KEY_VAL)
            // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1]
                // default undefined or missing values to empty string
            let val = (keyValueArr[2] || '')
            const end = val.length - 1
            const isDoubleQuoted = val[0] === '"' && val[end] === '"'
            const isSingleQuoted = val[0] === "'" && val[end] === "'"

            // if single or double quoted, remove quotes
            if (isSingleQuoted || isDoubleQuoted) {
                val = val.substring(1, end)

                // if double quoted, expand newlines
                if (isDoubleQuoted) {
                    val = val.replace(RE_NEWLINES, NEWLINE)
                }
            } else {
                // remove surrounding whitespace
                val = val.trim()
            }

            obj[key] = val
        }
    })

    return obj
}

function config(options /*: ?DotenvConfigOptions */ ) /*: DotenvConfigOutput */ {
    let dotenvPath = path.resolve(process.cwd(), '.env')
    let encoding /*: string */ = 'utf8'
    let debug = false

    if (options) {
        if (options.path != null) {
            dotenvPath = options.path
        }
        if (options.encoding != null) {
            encoding = options.encoding
        }
        if (options.debug != null) {
            debug = true
        }
    }

    try {
        // specifying an encoding returns a string instead of a buffer
        const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })
        Object.keys(parsed).forEach(function(key) {
            if (!process.env.hasOwnProperty(key)) {
                process.env[key] = parsed[key]
            } else if (debug) {}
        })
    } catch (e) {
        // console.log(e); //sy-log
        // return { error: e }
    }
}

function loadEnv(mode) {
    const basePath = path.resolve(__dirname, `.env${mode ? `.${mode}` : ``}`)
    const localPath = `${basePath}.local`
    const load = path => {
      try {
        // const env = config({ path })
        const env = dotenv.config({ path })
        dotenvExpand(env)
      } catch (err) {
          console.log(err); //sy-log
      }
    }
    load();
    load(localPath)
    load(basePath)

    // by default, NODE_ENV and BABEL_ENV are set to "development" unless mode
    // is production or test. However the value in .env files will take higher
    // priority.
    if (mode) {
      const defaultNodeEnv = (mode === 'production' || mode === 'test')
        ? mode
        : 'development'
        process.env.BABEL_ENV = defaultNodeEnv
    }
    return JSON.stringify(process.env);
  }

module.exports = function resolveClientEnv() {
    var argv = require('minimist')(process.argv.slice(2));
    return loadEnv(argv.mode);
}