// load
let style = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;1,400;1,600&family=Roboto:wght@300;400;500;700&family=Signika+Negative:wght@300;400;500;600;700&display=swap');

* {
    box-sizing: border-box;
    vertical-aling:middle;
}

.material-symbols-outlined {
    vertical-aling:middle;
}

body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
}
`

document.head.innerHTML+=`<style>${style}</style>`

function useMaterialIcons() {
    document.head.innerHTML+=`<link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />`
}

export var frawem = {
        string: "string",
        element: "element",
        reset_elem: "reset-element",
    data: data,
    set: function (variable="string",content="content",type=this.string) {
        let back = true
        document.querySelectorAll("[fvar]").forEach(e=>{
            if(e.getAttribute("fvar")==variable) {
                back=false
                if(type=="element"||type=="reset-element") {
                    if(type=="reset-element") e.innerHTML=""
                    e.appendChild(content)
                } else {
                    e.innerHTML=content
                }
            }
        })
        if(back) {
            this.dec(variable,content,type)
        }
    },

    dec: function(variable="string") {
        var _txt = document.querySelector("body").innerHTML
        _txt = _txt.split(`{${variable}}`).join("<span fvar='"+variable+"'></span>")
        document.querySelector("body").innerHTML = _txt
    }
}

export var data = {
    save: (key, value) => {
        return localStorage.setItem(key, value)
    },
    get: (key) => {
        if(localStorage.getItem(key) == "null" || !localStorage.getItem(key)){
            return null
        }
        return localStorage.getItem(key) || null
    }
}

export var mkit = {
    cycle: (n, m) => {
        return ((n/m)-Math.floor(n/m))*m
    },
        
    round: (x) => {
        return Math.round(x)
    },

    min: (x, min) => {
        if(x<min) return 0
        else return x-min
    },

    max: (x, max) => {
        if(x>max) return max
        else return x
    },

    fract: (x) => {
        let c = x-Math.floor(x)
        return c
    },
}
