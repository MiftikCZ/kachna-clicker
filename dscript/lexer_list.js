export var lexer = {
    nothing: "__NULL",

    string: [
        '"',
        "'",
        "`",
    ],

    closeFunc: [
        ")",
        "]"
    ],

    openFunc: [
        "(",
        "["
    ],

    nameSpaceIndicator: [
        ";"
    ]
}

export var isCharSame = (char,list) => {
    for(let i in list) {
        if(char==list[i]) {
            return true
        }
    }
    return false
}