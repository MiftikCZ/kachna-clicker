import { lexer, isCharSame } from "./lexer_list.js"


var settings = {}


export var dScript = {
    create: function (text, workspace = "global") {
        settings = {
            string: false,
            currentString: "",
            syntax: "",
            workSpace: "global",
            thisWorkSpace: "",
            countWorkspace: true,
        }
        text = text.split("\n").filter(e=>!e.replace(/ /gi,"").startsWith("//")).join("\n")
        for (let lineN in text.split("\n")) {
            
            let line = text.split("\n")[lineN]
            if (line) {
                let ch = 0

                for (let charN in line.split("")) {
                    //get & check character
                    let char = line.split("")[charN]
                    if ((char != " " || settings.string)) {


                        // - STRING
                        //check for sring
                        ch++

                        if (isCharSame(char, lexer.string)) {
                            settings.string = !settings.string
                        }


                        //add string
                        if (settings.string) settings.currentString += char
                        

                        //SYNTAX
                        if (isCharSame(char, lexer.closeFunc) && !settings.string) {
                            settings.syntax += "]})"
                        } else if (isCharSame(char, lexer.openFunc) && !settings.string) {
                            settings.syntax += `(workspace=>{return [`
                        } else {
                            //get workspace
                            if (!settings.string) {
                                if ((char == "," || char == "|" || settings.syntax.at(-1)=="[" || ch == 1) && char !== ":" && char!==";" && char !== ")" && isNaN(char)) {
                                    char= char.split(",").join("").split(";").join("").split("|").join("")
                                    settings.syntax += workspace + "."
                                }


                                //check for workspace

                                if (char == ":" && !settings.string) {
                                    settings.syntax += "workspace."
                                    char = ""
                                }
                            }


                            //ADD CHARACTER
                            if (char == ";" && ch == 1) {

                            } else {
                                settings.syntax += char
                            }
                        }


                    } else {
                        settings.syntax += " "
                    }
                }
                if (isCharSame(line[line.length - 1], lexer.closeFunc)) {
                    settings.syntax += ","
                }

                settings.syntax += "\n"
            }
        }
        //console.log(settings.syntax)
        settings.syntax = settings.syntax.split("$<").join("(").split("$>").join(")").split("]}),").join("]})").split("]})").join("]}),")
        return "[" + settings.syntax + "]"
    }
}


export const func = (fn, args) => v => fn(v({
    ...args
}))


export var getData = (data) => (Name, Default = "") => (data[Name] == undefined || !data[Name] ? Default : data[Name]).toString()


export var createTagExtend = (data) => {
    let _data = Object.entries(data)
    let add = ""
    for (let i in _data) {
        let nname = _data[i][0]
        let nvalue = _data[i][1]
        if (nname.endsWith("_add")) {
            nname = nname.split("_add").join("")
            add += nname + "='" + nvalue + "' "

        }
    }
    return add
}

export var functionBuilder = (main, data, addTextFirst, addTextLast) => {
    if (main) {
        let text = main
        let fin = ""
        for (let i in main) {
            let k = null
            if (typeof (main[i]) == "string") {
                text = main[i].value || main[i]
                k = text
            } else {
                data = {
                    ...data,
                    ...main[i]
                }
                k = main[i].value
            }
            if (k) fin += addTextFirst(k, main[i])
        }

        return addTextLast(fin, data)


    }
    return main
}


export var Global = {}
Global.String = func(main => `${main.join("")}`)
Global.repeat = func(main => {
    return functionBuilder(main, {
        len: main.len || 1,
        start: main.start || 0,
        step: main.step || 1,
        content: main.content || undefined
    }, text => text,
        (text, data) => {
            let res = ""
            if (!data.content) data.content = text
            for (let i = data.start; i < data.len; i += data.step) {
                res += data.content
            }
            return res
        }
    )
}, {
    length: func(main => {
        return {
            len: Math.floor(parseInt(main.join("")))
        }
    }),
    len: func(main => {
        return {
            len: Math.floor(parseInt(main.join("")))
        }
    }),
    start: func(main => {
        return {
            start: Math.floor(parseInt(main.join("")))
        }
    }),
    step: func(main => {
        return { step: Math.floor(parseInt(main.join(""))) }
    }),
    content: func(main => {
        return {
            content: main.join("")
        }
    }),
    value: func(main => {
        return { content: main.join("") }
    }),

    value: func(main => {
        return { content: main.join("") }
    }),
})

export var joinObject = (data) => {
    let r = {}
    data.forEach(e => { r={
        ...r,
        ...e
    }})
    return r
}


Global.ToStr = Global.String