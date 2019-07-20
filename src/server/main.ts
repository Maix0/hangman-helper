import express from "express"
import bodyParser from "body-parser"
import * as fs from "fs"

const server = express()

server.use(bodyParser.json())

const wordList = (function () {
    let langFiles = fs.readdirSync("./lang/")
    let langData: {
        [lang: string]: string
    } = {}
    langFiles.forEach(function (lang: string) {
        langData[lang.split(".")[0]] = fs.readFileSync("./lang/" + lang).toString("UTF-8")
    })
    return langData
})()


server.get("/:lang/:request/:wrong", async function (req: express.Request, res: express.Response) {
    const ResponseData: {bestLetters?:[string,number][], words?:string[]} = {}
    if (!Object.keys(wordList).includes(req.params.lang)) {
        res.sendStatus(400).end()
    }
    let rQuerry = RegExp(`^${req.params.request.replace(/_/gi, `[^${req.params.wrong}]`)}$`, "gim")
    let wordSelection = wordList[req.params.lang].match(rQuerry)
    if (!wordSelection) {
        res.sendStatus(400).end()
    }
    ResponseData.words = wordSelection!
    let letterCount: Map < string, number > = new Map()
    for (let index = 0; index < "abcdefghijklmnopqrstuvwxyz".split("").length; index++) {
        const letter = "abcdefghijklmnopqrstuvwxyz".split("")[index];
        letterCount.set(letter, 0)
        wordSelection!.forEach(function (word: string) {
            let count = word.match(RegExp(letter, "gi"))
            if (count) {
                letterCount.set(letter, letterCount.get(letter) !+count.length)
            }
        })
    }
    ResponseData.bestLetters = (function () {
        let validLetters: Map < string, number > = new Map()
        letterCount.forEach(function (value, letter) {
                if (!req.params.request.match(RegExp(letter)) && !req.params.wrong.split("").includes(letter)) {
                    validLetters.set(letter, value)
                }
        })
        let counter = 0
        return [...validLetters.entries()].sort((a, b) => b[1] - a[1]).slice(0,3)
    })()
    res.send(JSON.stringify(ResponseData))
    res.end()
})


server.get("/", function (req:express.Request,res:express.Response) {
    res.sendFile( "index.html", {root: "./dist/client/"})
})


server.get("/:file",function (req:express.Request,res:express.Response) {
    if(!fs.readdirSync("./dist/client/").includes(req.params.file)) return res.sendStatus(404).end()
    res.sendFile( req.params.file, {root: "./dist/client/"})
})





server.listen(80)