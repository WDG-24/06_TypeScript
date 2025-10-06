//  Type narrowing (Typeingrenzung)

type MessageObj = { message: string };

// Beispiel: TypeScript erkennt automatisch den Typ innerhalb der if/else-Blöcke
// function alertUser(value: string | MessageObj) {
//   if (typeof value === "string") {
//     value.split(''); // TS weiß hier: value ist string
//   } else {
//     value.message.split(''); // TS weiß hier: value ist MessageObj
//   }
// }

// Optional chaining (?.) und narrowing mit Truthy-Check
function printLength(str?: string) {
  if (str) {
    str.split(''); // Hier ist str garantiert definiert (nicht undefined)
  }

  str?.split(''); // Optional chaining: Wird nur ausgeführt wenn str nicht null/undefined ist
}

// Equality narrowing: Nach dem Vergleich weiß TS, dass beide den gleichen Typ haben müssen
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    x.split(''); // TS weiß: x und y müssen beide string sein
  }
}

// Discriminated Unions: 'kind' als gemeinsames Feld zur Typ-Unterscheidung
type Dog = {
  kind: 'dog'; // Literal type als Diskriminator
  name: string;
  age: number;
  bark: (times: number) => void;
  favouritePlace: string;
};

type Cat = {
  kind: 'cat'; // Literal type als Diskriminator
  name: string;
  age: number;
  meow: () => void;
};

type Pet = Cat | Dog;

// Type Predicate: Funktion gibt an, welcher Typ das Argument hat
function isCat(pet: Pet) {
  // TS inferiert Rückgabe als  pet is Cat
  return pet.kind === 'cat';
}

function makeNoise(pet: Pet) {
  // 'in' operator für property checking
  if ('bark' in pet) {
    pet.bark(3); // TS weiß: pet ist Dog
  }

  // Type predicate in Aktion
  if (isCat(pet)) {
    pet.meow(); // TS weiß: pet ist Cat
  }
}

function doSth() {
  try {
    if (Math.random() > 0.5) {
      throw new Error('Test', { cause: 'ALL_WENT_WRONG' });
    } else {
      throw new TypeError('TypeError');
    }
  } catch (error) {
    // instanceof für Typ-Prüfung
    if (error instanceof TypeError) {
      console.log('TypeFehler: ', error.message); // TS weiß: error ist TypeError
    }

    if (error instanceof Error) {
      console.log(error.message);
      console.log(error.cause);
    }
  }
}

//  Type Assertions (Typ-Zusicherungen)

// never = Funktion kehrt nie zurück (wirft immer Error)
function isMissingElement(): never {
  throw Error('Element not found');
}

// Nullish coalescing mit never-Funktion als Fallback
// const containerEl = document.querySelector('dialog') ?? isMissingElement();
const containerEl = document.querySelector('dialog'); // Element-Tags in querySelector lässt TS auch inferieren

// Non-null assertion operator (!): Sage TS, dass der Wert garantiert nicht null ist
containerEl!.innerHTML = '';

containerEl!.showModal();

type diaryEntry = {
  id: string;
  url: string;
  title: string;
};

function getFromLocalStorage(key: string) {
  const localDataStr = localStorage.getItem(key);
  if (!localDataStr) return;

  // Type assertion: Sage TS, welchen Typ das JSON-Ergebnis hat
  // const localData = JSON.parse(localDataStr) as diaryEntry[];
  const localData: diaryEntry[] = JSON.parse(localDataStr); // Alternativer Syntax
  localData[0].title;
}

// Interfaces für Struktur-Typen
interface IAuskunft {
  getInfo(): string;
}

interface IAuthorThing {
  author: string;
}

// Abstract class: Kann nicht direkt instanziiert werden
abstract class AuthorThing {
  constructor(protected author: string) {} // protected: Zugriff nur in Subklassen
}

class LibraryItem extends AuthorThing {
  // TypeScript-Kurzschreibweise: Parameter werden automatisch zu Properties
  constructor(private title: string, public author: string) {
    super(author);
  }

  get getTitle() {
    return this.title;
  }

  get getAuthor() {
    return this.author;
  }

  getInfo() {
    return `Title: ${this.title}, Author: ${this.author}`;
  }
}

// const li = new LibraryItem('Herr der Ringe', 'J.R.R. Tolkien');

class Book extends LibraryItem {
  #pages; // Private field (ES2022 Syntax, nicht TypeScript-spezifisch)

  constructor(title: string, author: string, pages: string) {
    super(title, author);
    this.#pages = pages;
  }

  // Override der Parent-Methode (override Keyword is TS; für Entwickler zur Markiereung gedacht)
  override getInfo() {
    return `Title: ${this.getTitle}, Author: ${this.author}, Pages: ${this.#pages}`;
  }
}

// Enum: Benannte Konstanten mit automatischer Vervollständigung
enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

function moveTo(dir: Direction) {
  console.log(dir);
}

moveTo(Direction.DOWN);

// Alternative zu Enums: const object mit 'as const' (readonly)
const DirectionObj = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
} as const; // as const macht alle Properties readonly und zu Literal Types

type DirectionObjType = typeof DirectionObj; // Typ aus Wert extrahieren

type Directions = keyof DirectionObjType; // Union Type aus allen Keys: 'up' | 'down' | 'left' | 'right'

// typeof und keyof kombiniert für inline Type
function moveTo2(dir: keyof typeof DirectionObj) {
  console.log(dir);
}

DirectionObj.down;
