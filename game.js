import { dScript } from "./dscript/dscript.js"
import { global } from "./dscript/frawem.dscript.js"
import { data, frawem } from "./frawem/main.js"
import { shop, text } from "./main.js"

const prices = [
    50, 750
]

const priceMultipier = 2

const s = 2

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

export function reloadEvents() {
    document.getElementById("kachnaclick").addEventListener("click", () => {
        reloadCount()
    })
    document.getElementById("button_shop").addEventListener("click", () => {
        eval(dScript.create(shop))
        document.querySelector(".gamediv").classList.add("shopdiv")
        for (let shopi = 0; shopi < s; shopi++) {
            let c = parseFloat(data.get("shopitemcount" + (shopi + 1)) || 0)
            frawem.set("shopitem" + (shopi + 1), Math.floor(prices[shopi] + (c * priceMultipier)))
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
                frawem.set("shopitem" + (shopi + 1), Math.floor(prices[shopi] + (c * priceMultipier)))
                reloadCount(0)
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