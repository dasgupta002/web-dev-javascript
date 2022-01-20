let output = document.getElementsByTagName('input')

function display(symbol) {
    output[0].value += symbol
}

function calculate() {
    let result = evaluate(output[0].value)

    if (isNaN(result)) {
        output[0].value = 'Error'
    } else {
        output[0].value = result
    }
}

function erase() {
    output[0].value = ''
}

function remove() {
    output[0].value = output[0].value.slice(0, -1)
}