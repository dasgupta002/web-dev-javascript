const output = document.getElementById('result');
const clipboard = document.getElementById('copy');
const strength = document.getElementById('length');
const isUpper = document.getElementById('uppercase');
const isLower = document.getElementById('lowercase');
const isNum = document.getElementById('number');
const isToken = document.getElementById('symbol');
const render = document.getElementById('create');

const functions = {
    lower: randomLowerCaseLiteral,
    upper: randomUpperCaseLiteral,
    num: randomIntegerValue,
    token: randomSymbolCode
};

function randomLowerCaseLiteral() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUpperCaseLiteral() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomIntegerValue() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbolCode() {
    const symbols = '!@#$%^&*()_+-={}|"[]:;\<>?,./';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateHash(upper, lower, num, token, length) {
    let hash = '';

    const typeCount = upper + lower + num + token;
    const types = [ { upper }, { lower }, { num }, { token }].filter((item) => Object.values(item)[0]);

    if(typeCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typeCount) {
        types.forEach((type) => {
            const functionName = Object.keys(type)[0];
            hash += functions[functionName]();
        })
    }

    return hash.slice(0, length);
}

render.addEventListener('click', function() {
    const length = +strength.value;
    output.innerText = generateHash(isUpper.checked, isLower.checked, isNum.checked, isToken.checked, length);
});

clipboard.addEventListener('click', function() {
    const textarea = document.createElement('textarea');
    const password = output.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
});