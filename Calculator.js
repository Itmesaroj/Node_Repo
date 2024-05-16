const process = require("process");
const { randomBytes } = require('crypto');
const [,,operation,data1,data2] = process.argv;
console.log(process.argv);

const num1 = parseInt(data1);
const num2 = parseInt(data2);

if (isNaN(num1) || isNaN(num2)) {
    console.log("Invalid numbers provided.");
    process.exit(1);
}

switch(operation) {
    case "add":
        console.log(num1 + num2);
        break;
    case "sub":
        console.log(num1 - num2);
        break;
    case "multi": 
        console.log(num1 * num2);
        break;
    case "divide":
        if (num2 === 0) {
            console.log("Division by zero is not allowed.");
            process.exit(1); 
        } else {
            console.log(num1 / num2);
        }
        break;
    case "sin":
        console.log(Math.sin(num1), Math.sin(num2));
        break;
    case "cos":
        console.log(Math.cos(num1), Math.cos(num2));
        break;
    case "tan":
        console.log(Math.tan(num1), Math.tan(num2));
        break;
    case "random":
        if (!num1) {
            console.log("Provide length for random number generation");
        } else {
            const random = randomBytes(num1); 
            const randomValue = random.toString('hex'); 
            console.log(randomValue);
        }
        break;
    default:
        console.log("Invalid operation");
}
