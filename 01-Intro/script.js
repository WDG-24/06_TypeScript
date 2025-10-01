var myNumber = 42;
// myNumber = 'hallo';
console.log(myNumber);
var myString = 'Hallo, Welt';
var myBool = false;
var myVariable;
// myVariable = 'Die Welt ist eine Bühne...';
function greet(name) {
    return "Hallo, ".concat(name, "!");
}
console.log(greet('Hamdo'));
// console.log(greet(827436));
// const myPrint = (content: string): void => console.dir(content);
var myPrint = function (content) { return console.dir(content); };
myPrint('test');
function logMessage(message, userId) {
    console.log("".concat(message, " ").concat(userId ? "From ".concat(userId) : ''));
}
logMessage('Dies ist eine Nachricht', 43);
logMessage('Dies ist eine Nachricht');
