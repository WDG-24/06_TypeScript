const myString = 'Hallo';

console.log(myString); // bei const ist Typ String-Literal -> "Hallo"

// Array mit expliziter Typisierung: nur Strings erlaubt
// (Erinnerung: meist ist keine explizite Typisierung nötig -> Type-Inferenz)
let myArray: string[] = ['hi', 'hallo', 'what'];
// Array das nur Zahlen enthält
let myNumberArray: number[] = [2, 5, 17];

myArray.push('Wort'); // ✓ Funktioniert
myArray.push(42); // ✗ Fehler: number ist kein string

// Alternative Syntax für Array-Typen (beide Schreibweisen sind gleichwertig)
// let uninitializedArray: string[]
// let uninitializedArray: Array<string>;

// Tuple: Array mit fester Länge und festen Typen an bestimmten Positionen
const coordinates: [number, number] = [52, 13];

// Beispiel aus React: useState gibt ein Tuple zurück [Wert, Funktion]
// const [data, func] = useState(1)

// Union Type: Array kann Strings ODER Numbers enthalten
let mixedArray: (string | number)[] = [23, 'String'];

// any[] sollte vermieden werden - erlaubt jeden Typ (kein Typensicherheit)
// let whatEverArr : any[]

// Array Destructuring Beispiel
// const [firstFruit, secondFruit, thirdFruit] = ["Erdbeere", "Mango", "Blaubeere"]
const [, , thirdFruit] = ['Erdbeere', 'Mango', 'Blaubeere']; // nimmt nur das 3. Element

// Type Alias: Eigener Name für einen Typ (hier einfaches Beispiel)
type myString = string;

// Objekt-Typ: definiert die Struktur eines Person-Objekts
type Person = {
  id: number;
  readonly name: string; // readonly: kann nach Initialisierung nicht geändert werden
  age: number;
  location?: string; // optional: Property muss nicht vorhanden sein
};

// Objekt mit allen erforderlichen Properties
const person: Person = {
  id: 4,
  name: 'Guybrush',
  age: 35,
  location: 'Melee Island',
};

// location ist optional und kann weggelassen werden
const person2: Person = {
  id: 234,
  name: 'Whorf',
  age: 40,
};

person2.name = 'Commander Whorf'; // ✗ Fehler: name ist readonly
person2.favouriteHolodeckGame = 'Sherlock'; // ✗ Fehler: Property existiert nicht im Type
person2.location = 'Enterprise'; // ✓ Funktioniert: location ist optional aber erlaubt

// Array von Person-Objekten
const personArr: Person[] = [];

personArr.push('wort'); // ✗ Fehler: string ist kein Person-Objekt
personArr.push(person); // ✓ Funktioniert

// Interface: Alternative zu type für Objekte
// Interfaces können erweitert werden (Declaration Merging)
// interface PersonInterface {
//   id: number;
//   readonly name: string;
//   age: number;
//   location?: string;
// }

// Interface mit gleichem Namen wird automatisch zusammengeführt
// interface PersonInterface {
//   favIceCream: string
// }

// person3 müsste jetzt alle Properties aus beiden Interfaces haben
// const person3: PersonInterface = {
//   id: 34,
//   favIceCream: "Vanille"
//   usw...
// }

// Verschachtelte Objekt-Typen
type UserSettings = {
  theme: string;
  language: 'de' | 'en' | 'es'; // Literal Types: nur diese 3 Werte erlaubt
};

// Basis-Typ für Datenbank-Einträge
type DBEntry = {
  _id: string;
  createdAt: string;
};

// Intersection Type (&): kombiniert DBEntry mit zusätzlichen Properties
type DBUser = DBEntry & {
  username: string;
  email: string;
  settings: UserSettings;
};

// Leerer Intersection Type (nur zur Demonstration)
type DBBlogPost = DBEntry & {};

const guybrush: DBUser = {
  _id: 'w984zw9r',
  username: 'test',
  settings: {
    language: 'en',
    // usw.
  },
};

// Interface-Version: extends statt & für Vererbung
interface DBEntryInterface {
  _id: string;
  createdAt: string;
}

interface DBUserInterface extends DBEntryInterface {
  username: string;
  email: string;
  settings: UserSettings;
}

// Literal Union Type: nur exakt diese 3 Zahlen sind erlaubt
type Quantity = 50 | 100 | 150;

const num: Quantity = 150;

// Function mit eingeschränktem Parameter-Typ
function handleQuantity(quant: Quantity) {
  // TypeScript prüft, ob alle Cases abgedeckt sind (exhaustiveness checking)
  switch (quant) {
    case 50:
      console.log('low');
      return 'low';
    case 100:
      console.log('middle', quant);
      break;
    case 150:
      console.log('high', quant);
      break;
    default:
      // Wird nie erreicht, da alle Quantity-Werte abgedeckt sind
      console.log('Error in your code: ', quant);
  }
}

handleQuantity(150); // ✓ Funktioniert
// handleQuantity(200); // ✗ Fehler: 200 ist kein Quantity

// Function Type: definiert Signatur einer Funktion
type Calculation = (num1: number, num2: number) => number;

// Parameter-Namen können unterschiedlich sein, Typen müssen passen
const add: Calculation = (a, b) => {
  return a + b;
};

const multiply: Calculation = (a, b) => {
  return a * b;
};

add(4, 5);

// Bei Funktionsdeklarationen müssen die Typen direkt hinzugefügt werden
function addDeclaration(a: number, b: number) {
  return a + b;
}
