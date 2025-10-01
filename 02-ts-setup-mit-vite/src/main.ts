// Type Inference: TS erkennt automatisch 'number' als Typ
let myNumber = 42;

// myNumber = 'hallo'; // Fehler: Type 'string' kann nicht zu 'number' zugewiesen werden

console.log(myNumber);

// Type Inference: TS erkennt automatisch 'string' als Typ
let myString = 'Hallo, Welt';

// Type Inference: TS erkennt automatisch 'boolean' als Typ
let myBool = false;

// Explizite Typ-Annotation: Variable muss eine Zahl sein
let myVariable: number;

// myVariable = 'Die Welt ist eine Bühne...'; // Fehler: Type 'string' nicht zu 'number' zuweisbar

// Parameter-Typ-Annotation: name muss ein string sein
function greet(name: string) {
  return `Hallo, ${name}!`;
}

console.log(greet('Hamdo'));
// console.log(greet(827436)); // Fehler: Argument vom Typ 'number' nicht zu 'string' zuweisbar

// Return-Typ 'void' bedeutet: Funktion gibt nichts zurück
// const myPrint = (content: string): void => console.dir(content);

// Hier wird der Return-Typ inferiert (ebenfalls 'void')
const myPrint = (content: string) => console.dir(content);

myPrint('test');

// Optionaler Parameter mit '?': userId kann undefined sein
function logMessage(message: string, userId?: number) {
  console.log(`${message} ${userId ? `From ${userId}` : ''}`);
}

logMessage('Dies ist eine Nachricht', 43);
logMessage('Dies ist eine Nachricht'); // userId ist optional, also kein Fehler
