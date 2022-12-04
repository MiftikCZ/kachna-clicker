import { dScript, func, functionBuilder } from "./dscript/dscript.js";
import { data, frawem, mkit } from "./frawem/main.js"
import { global } from "./dscript/frawem.dscript.js";
import { main } from "./game.js"


export const RAINBOW = (text = ()=>["RAINBOW"]) => {
    let i=0
    text = text().join("")
    return text.split("").map(ch => {
        i+=(360/text.length)
        return `<span style="font-weight:700;color:hsl(${i}, 60%,55%)">${ch}</span>`
    }).join("")
}

const price = (_price,id) => `
view(
    :class("buybtn")
    :width("fit-content")
    :background("#222228")
    :padding(
        String("4px")
        String("20px")
    )
    :margin(
        String("0px")
        String("20px")
        String("0")
        String("0")
    )
    box_style(
        :border_radius("8px")
    )
    text(
        :id("shopitemcontainer${id}")
        
        img(
            :size("24px")
            "./kachna.svg"
        )
        text(
            :fvar("shopitem${id}")
            "${_price}"
        )
    )    
)
`

const shopitem = (Name, _price, id, rainbow=false) => `
view(
    :class("shopitem shopitem${id}")
    tp(
        :h1(
            row(
                ${price(_price,id)}
                
                text(
                    ${rainbow ? `;RAINBOW('RAINBOW')`: ``} 
                    "${Name}"
                )
            )
        )
    )
)

`

// template
export var text = `
html(
    :setnew()
    // header
    view(
        :width("100%")
        :padding("10px")
        center(
            text(
                :fvar("count")
                :size("40px")
                :id("count")
                :value("?")
            )
        )
    )

    // main game
    edit(
        :class("maingame gamediv")
        view(
            :id("kachnaclick")
            svg(
                :size("80px")
                "kachna.svg"
            )
        )
    )

        
            
    // bottom panel
    view(
        :display("flex")
        :class("bottombar")
        view(
            :class(
                String("btmbtn")
            )
            :id("button_game")
            faicon("fa-solid fa-arrow-pointer")
        )
        view(
            :class(
                String("btmbtn")
            )
            :id("button_shop")
            faicon("fa-solid fa-store")
        )
    )
)
`


export var shop = `
html(
    :target(".maingame")
    :setnew()
    view(
        :class("shopdivmain")
        text(
            text_style(
                :color("#E3E3E3")
            )
            center(
                text(
                    text_style(
                        :color("#E9E9E9")
                        :weight("800")
                    )
                    "Shop"
                )
            )
            column(
                :gap("20px")
                ${shopitem("+1 each click", "50",1)}
                ${shopitem("+2 each 1 seconds", "500",2)}
                ${shopitem("BLUE background", "50,000",3)}
                ${shopitem("GREEN background", "75,000",4)}
                ${shopitem("PINK background", "100,000",5)}
                ${shopitem("PURPLE background", "200,000",6)}
                ${shopitem("RED background", "500,000",7)}
                ${shopitem(" background", "500,000",8,true)}
            )
        )
    )
)
`



eval(dScript.create(text))

main() 