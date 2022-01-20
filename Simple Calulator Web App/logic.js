function evaluate(expression){
    let tokens = expression.split('')
    let values = []
    let operands = []
  
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == ' ') {
            continue
        }
  
        if (tokens[i] >= '0' && tokens[i] <= '9') {
            let literal = ''
                  
            while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9') {
                literal = literal + tokens[i++]
            }
            
            values.push(parseFloat(literal, 10))
            i--
        } else if (tokens[i] == '(') {
            operands.push(tokens[i])
        } else if (tokens[i] == ')') {
            while (operands[operands.length - 1] != '(') {
                values.push(applyOperation(operands.pop(), values.pop(), values.pop()))
            }
            
            operands.pop()
        } else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/') {
            while (operands.length > 0 && precedence(tokens[i], operands[operands.length - 1])) {
                values.push(applyOperation(operands.pop(), values.pop(), values.pop()))
            }
  
            operands.push(tokens[i])
        }
    }
  
    while (operands.length > 0) {
        values.push(applyOperation(operands.pop(), values.pop(), values.pop()))
    }
  
    return values.pop()
}
  
function precedence(x, y) {
    if (y == '(' || y == ')')  {
        return false
    } else if ((x == '*' || x == '/') && (y == '+' || y == '-')) {
        return false
    } else {
        return true
    }
}
  
function applyOperation(operand, b, a) {
    switch (operand) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            if (b == 0) {
                return 'Error'
            }
            
            return parseFloat(a / b, 10)
    }
        
    return 0
}