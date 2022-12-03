// frawem components for DirtyScript.js

import { Global, func, functionBuilder, createTagExtend } from "./dscript.js"



Global.view = func((main) => {
    if (main && main !== false) {

        return functionBuilder(main, {}, (text, data) => {
            return `${text}`
        }, (text, data) => {
            let boxStyle = data.boxStyle || {
                background: undefined,
                width: undefined,
                height: undefined,
                border: undefined,
                border_radius: undefined
            }

            return `
<div ${data.id ? `id="${data.id}"` : ""} 
${data.class ? `class="${data.class}"` : ""} 
style="
background:${data.background || boxStyle.background || "initial"};
width:${data.width || "initial"};
max-width:${data.maxWidth || data.width || "initial"};
max-height:${data.maxHeight || "initial"};
display:${data.display || "initial"};
padding:${data.padding || "initial"};
margin:${data.margin || "initial"};
border:${boxStyle.border || "initial"};
border-radius:${boxStyle.border_radius || "initial"};
width:${boxStyle.width || "initial"};
height:${data.height || boxStyle.height || "initial"}
">${text}</div>`.split("\n").join("")
        })
    }
}, {
    id: func(main => {return {id:main[0]}}),
    class: func(main => {return {class:main.join(" ")}}),
    width: func((main) => {
        return {
            width: main[0]
        }
    }),
    display: func(main=>{return {display:main[0]}}),
    max_width: func(main => {
        return {
            maxWidth: main[0]
        }
    }),
    height: func((main) => {
        return {
            height: main[0]
        }
    }),
    max_height: func((main) => {
        return {
            maxHeight: main[0]
        }
    }),
    background: func(main => {
        return {
            background: main[0]
        }
    }),
    padding: func(main => {
        let pad = ""
        switch (main.length) {
            case 1:
                pad = `${main[0]} ${main[0]} ${main[0]} ${main[0]}`
                break;
            case 2:
                pad = `${main[0]} ${main[1]} ${main[0]} ${main[1]}`
                break
            case 4:
                pad = `${main[0]} ${main[1]} ${main[2]} ${main[3]}`
                break
            default:
                pad = `${main[0]} ${main[0]} ${main[0]} ${main[0]}`
                break;
        }
        return {
            padding: pad
        }
    }),
    margin: func(main => {
        let pad = ""
        switch (main.length) {
            case 1:
                pad = `${main[0]} ${main[0]} ${main[0]} ${main[0]}`
                break;
            case 2:
                pad = `${main[0]} ${main[1]} ${main[0]} ${main[1]}`
                break
            case 4:
                pad = `${main[0]} ${main[1]} ${main[2]} ${main[3]}`
                break
            default:
                pad = `${main[0]} ${main[0]} ${main[0]} ${main[0]}`
                break;
        }
        return {
            margin: pad
        }
    })
})
Global.String = func(main => {
    return `${main[0]}`
})
Global.String_all = func(main => {
    return `${main.join("")}`
})
Global.html = func((main) => {
    return functionBuilder(main, {
        target: main.target || "#root",
        setnew: main.setnew || false,
    }, (text, data) => {
        return text
    }, (text, data) => {
        if(data.setnew) document.querySelector(data.target).innerHTML=""
        main.forEach(e => {
            if (typeof (e) == "string" || typeof (e) == "number") {
                document.querySelector(data.target).innerHTML += e
            }
        })
        return text
    })
}, {
    target: func(main => {
        return {
            target: main[0]
        }
    }),
    setnew: func(main => {return {setnew:true}})
})
Global.column = func(main => {
    return functionBuilder(main, {}, text => text, 
        (text,data) => {
            return `<div style="display:flex;flex-direction:column;${atr(data,"gap","gap: %d")}">${text}</div>`
        })
}, {
    gap: func(main => {return {gap: main[0]}})
})
Global.text_style = func((main) => {
    let fin = {}
    for (let i in main) {
        fin = {
            ...fin,
            ...main[i]
        }
    }
    return {
        style: {
            ...fin
        }
    }
}, {
    color: func((main) => {
        return {
            color: main[0]
        }
    }),

    size: func(main => {
        return {
            textSize: main[0]
        }
    }),

    weight: func(main => {
        return {
            textWeight: main[0]
        }
    })
})
Global.box_style = func((main) => {
    let fin = {}
    for (let i in main) {
        fin = {
            ...fin,
            ...main[i]
        }
    }
    return {
        boxStyle: {
            ...fin
        }
    }
}, {
    background: func((main) => {
        return {
            background: main[0]
        }
    }),

    width: func(main => {
        return {
            width: main[0]
        }
    }),

    height: func(main => {
        return {
            height: main[0]
        }
    }),

    border: func(main => {
        return {
            border: `${main[0]} ${main[1]} ${main[2]}`
        }
    }),

    border_radius: func(main => {
        return {
            border_radius: main[0]
        }
    })
})
Global.text = func((main, value) => {
    return functionBuilder(main, {
        value: main.value,
        id: main.id || "",
        fvar: main.fvar || "",
        style: main.text_style || {
            color: undefined,
            textSize: undefined,
            textWeight: "inherit"
        },
        size: main.size || undefined
    }, (text, data) => {
        return text || data.value
    }, (text, data) => {
        return `<span frtext ${data.fvar ? `fvar="${data.fvar}"` : ""} id="${data.id}" style="color:${data.style.color};font-size:${data.style.textSize || data.size};font-weight:${data.style.textWeight}">${data.value || text}</span>`
    })
}, {
    id: func(main => {return {id:main[0]}}),
    fvar: func(main => {return {fvar:main.join("")}}),
    value: func(main => {
        return {
            value: main.join("")
        }
    }),
    size: func(main => {
        return {
            size: main.join("")
        }
    })
})
Global.row = func((main, value) => {
    if (main && main !== false) {
        return returnHTML("div", "class='row'", main)
    }
})

Global.flex = func(main => {
    return functionBuilder(main, {
        gap: main.gap || undefined
    }, (text, data) => {
        return text
    }, (text, data) => {
        return `<div style="gap:${data.gap};display:inline-flex">${text}</div>`
    })
}, {
    gap: func(main => {
        return {
            gap: main[0]
        }
    })
}),
    Global.button = func((main, value) => {
        if (main) {
            return `<button>${main}</button>`
        }
    }),
    Global.center = func(main =>  `<center>${main.join("")}</center>`),
    Global.vcenter = func(main => {
        return `<div style="justify-content:center;display:inline-flex;width:100%">${main.join("")}</div>`
    }),
    Global.hcenter = func(main => {
        return `<div style="align-items:center;display:inline-flex;height:100%">${main.join("")}</div>`
    }),
    Global.fcenter = func(main => {
        return `<div style="align-items:center;justify-content:center;display:inline-flex;height:100%;width:100%">${main.join("")}</div>`
    }),
    Global.start = func(main => {
        return functionBuilder(main, {}, (text) => text,
            (text, data) => {
                return `<div style="width:100%;text-align:start;">${text}</div>`
            })
    }),
    Global.end = func(main => {
        return functionBuilder(main, {}, (text) => text,
            (text, data) => {
                return `<div style="width:100%;text-align:end;">${text}</div>`
            })
    }),
    Global.link = func(main => {
        return functionBuilder(main, {}, (text) => text,
            (text, data) => {
                return `<div style="height:100%;width:100%;text-decoration:none;" onclick=
"window.open('${data.link || ""}','${data.add == "true" ? "_blank" : "_self"}')">${text}</div>`
            })
    }, {
        target: func(main => {
            return {
                link: main.join("")
            }
        }),
        open_new: func(main => {
            return {
                add: "true"
            }
        })
    }),
    Global.edit = func(main => {
        return functionBuilder(main, {
            id: main.id || "",
            class: main.class || "",
            add: main.add || ""
        }, (text) => text, (text, data) => {
            return `<div class="${data.class}" id="${data.id}" ${data.add}>${text}</div>`
        })
    }, {
        id: func(main => {
            return {
                id: main[0]
            }
        }),

        class: func(main => {
            return {
                class: main.join(" ")
            }
        }),

        add: func(main => {
            return {
                add: main.join(" ")
            }
        })
    })

Global.section = func(main => {
    return functionBuilder(main, {}, (text) => text,
        (text, data) => {
            return `<section ${createTagExtend(data)}>${text}</section>`
        })
}, {
    id: func(main => {
        return {
            id_add: main[0]
        }
    }),
})

Global.svg = func(main => functionBuilder(
    main, {}, text=>text, (text,data)=>{
        let h = data.height ? `height="${data.height}"` : ""
        let w = data.width ? `width="${data.width}"` : ""
        return `<img src="${data.link || text || ''}" ${h} ${w} >`
    }
), {
   link: func(main=>{return {link:main.join("")}}),
   src: func(main=>{return {link:main.join("")}}),
   width: func(main=>{return {width:main.join("")}}),
   height: func(main=>{return {height:main.join("")}}),
   size: func(main=>{return {
        height:main[0],
        width:main[0]
    }}),
})

Global.tp = func(main => main.join(""), {
    h1: func(main => {
        return functionBuilder(main, {}, text => text,
            (text,data) =>  `<span style='font-weight:bold !important;font-size:36px'>${text}</span>`)
    }) ,
    h2: func(main => {
        return functionBuilder(main, {}, text => text,
            (text,data) =>  `<h2>${text}</h2>`)
    }) ,
    h2: func(main => {
        return functionBuilder(main, {}, text => text,
            (text,data) =>  `<h3>${text}</h4>`)
    }) ,
})




// atr(data, "value", "value=%d")
export const atr = (obj, key, rep, def="") => obj[key] ? rep.replace(/\%d/gi, obj[key]) : def




Global.box = Global.view
Global.size = Global.view

Global.full_center = Global.fcenter
Global.middle = Global.fcenter

Global.atr = Global.edit
Global.class = Global.edit
Global.id = Global.edit
Global.direct = Global.edit
Global.styled = Global.edit
Global.img = Global.svg

Global.list = Global.text

export var global = Global