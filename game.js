import { dScript } from "./dscript/dscript.js"
import { global } from "./dscript/frawem.dscript.js"
import { data, frawem } from "./frawem/main.js"
import { shop, text, RAINBOW } from "./main.js"

const prices = [
    50, 750,50000,75000,100000,200000,500000,1000000
]

const bg = (c) => `hsl(${c},37%,48%);`

const barvy = [
    bg(40),bg(40),bg(40),bg(175),bg(120),bg(320),bg(340),bg(0),
    `linear-gradient(45deg,hsl(140,50%,47%),hsl(220,50%,47%))`
]

const priceMultipier = 2

const s = 8

function updateBtns(shopi, c) {

    let price = Math.floor(prices[shopi] + (c * priceMultipier))
    if (data.get("clicks") < price) {
        document.getElementById("shopitemcontainer" + (shopi + 1)).classList.add("badprice")
        document.getElementById("shopitemcontainer" + (shopi + 1)).classList.remove("validprice")
    } else {
        document.getElementById("shopitemcontainer" + (shopi + 1)).classList.add("validprice")
        document.getElementById("shopitemcontainer" + (shopi + 1)).classList.remove("badprice")
    }

    
}

function updateBg() {
    console.log(data.get("currentbarva"))
        document.head.innerHTML+=`<style>body{background:${data.get("currentbarva") || barvy[0]}}</style>`
    
}

export function reloadEvents() {
    document.getElementById("kachnaclick").addEventListener("click", () => {
        reloadCount()
    })
    document.getElementById("button_shop").addEventListener("click", () => {
        eval(dScript.create(shop))
        document.querySelector(".gamediv").classList.add("shopdiv")
        const setD = (n,d) => {
            d = d.toString().split("").reverse().join("").replace(/(.{3})/g,"$1$").split("$").join(",").split("").reverse().join("")
            if(d.startsWith(",") ) {
                d =d.split("")
                d.shift()
                d = d.join("")
            } 
            frawem.set("shopitem" + n,(d))
            
        }
        for (let shopi = 0; shopi < s; shopi++) {
            let c = parseFloat(data.get("shopitemcount" + (shopi + 1)) || 0)
            setD((shopi + 1), Math.floor(prices[shopi] + (c * priceMultipier)))
            reloadCount(0)
            updateBtns(shopi, c)
        }
        for (let shopi = 0; shopi < s; shopi++) {
            let el = document.querySelector(".shopitem" + (shopi + 1))
            el.addEventListener("click", () => {
                let c = parseFloat(data.get("shopitemcount" + (shopi + 1)) || 0)
                let price = Math.floor(prices[shopi] + (c * priceMultipier))
                if (data.get("clicks") < price) {

                    return
                }
                data.save("shopitemcount" + (shopi + 1), c + 1)
                data.save("clicks", data.get("clicks") - price)

                c = parseFloat(data.get("shopitemcount" + (shopi + 1)) || 0)

                setD((shopi + 1), Math.floor(prices[shopi] + (c * priceMultipier)))
                reloadCount(0)

                if(shopi > 1) {
                    data.save("currentbarva", barvy[shopi+1])
                    console.log()   
                    updateBg()
                }
                for(let i=0;i<s;i++) {

                    updateBtns(i, c)
                }
            })
        }


    })


    document.getElementById("button_game").addEventListener("click", () => {
        eval(dScript.create(text))
        document.querySelector(".gamediv").classList.remove("shopdiv")


        reloadEvents()
        reloadCount(0)
    })



}

export function main() {
    reloadCount(0)
    reloadEvents()
    updateBg()

    setInterval(() => {
        data.save("clicks", parseFloat(data.get("clicks") || 0) + (parseFloat(data.get ("shopitemcount2")) || 0) )
        frawem.set("count", data.get("clicks"))
        
        for(let shopi=0;shopi<s;shopi++) {
            try {
                let c = parseFloat(data.get("shopitemcount" + (shopi + 1)) || 0)
                updateBtns(shopi, c)
            } catch {}
        }
    }, 500)
}

export function reloadCount(b = 1) {
    data.save("clicks", (parseFloat(data.get("clicks") || 0)) + (((parseFloat(data.get("shopitemcount1")) || 0) + 1) * b))
    frawem.set("count", data.get("clicks"))
}