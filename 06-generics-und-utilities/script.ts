// Type Alias: Definiert einen wiederverwendbaren Typ für Tagebucheinträge
type diaryEntry = {
  id: string;
  url: string;
  title: string;
};

// Generic Function: <T> macht die Funktion flexibel für verschiedene Datentypen
// Der Rückgabetyp T | null bedeutet: entweder Typ T oder null
function getFromLocalStorage<T>(key: string): T | null {
  const localDataStr = localStorage.getItem(key);
  if (!localDataStr) return null;

  // Type Assertion: "as T" sagt TS, dass wir wissen, dass es Typ T ist
  const localData = JSON.parse(localDataStr) as T;

  return localData;
}

// Generic wird beim Aufruf mit konkretem Typ befüllt

const lsData = getFromLocalStorage<diaryEntry[]>('diary');

// Array-Typ mit Generic-Syntax: Array<T> ist gleichbedeutend mit T[]
// Tuple-Typ: [number, number] definiert Array mit exakt 2 Zahlen
const strArr: Array<{ color: string; location: [number, number] }> = [{ color: '#000', location: [13, 53] }];

// Generic Type mit Default-Wert: Wenn kein Typ angegeben wird, ist T = string
type Bla<T = string> = {
  name: T;
};

// Dank Default-Wert muss kein Typ angegeben werden, name ist automatisch string
const bla: Bla = {
  name: 'Marco',
};

// Generic Constraint: "extends" schränkt T ein auf Typen, die .length haben
// T irgendetwas mit .length sein
// function getLength<T extends { length: number }>(somethingWithLength: T) {
//   const strArr: Array<'up' | 'down'> = ['down'];
//   return somethingWithLength.length;
// }

// Generic Constraint: "extends" schränkt T ein auf Typen, die .length haben
// T kann entweder string oder ein Array sein
function getLength<T extends string | unknown[]>(x: T) {
  return x.length;
}

[1, 23, 4].length;
'Sven'.length;
const obj = {
  name: 'Alexander',
  length: 17265,
};

getLength([1, 23, 4, 'test']); // OK: Array hat .length
getLength('Sven'); // OK: String hat .length
getLength(obj); // Fehler! Objekt ist weder string noch Array

// Utility Types

type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

// Pick Utility Type: Wählt nur bestimmte Properties aus einem Type aus
type UsedTodo = Pick<Todo, 'title' | 'completed'>;

// Readonly Utility Type: Macht alle Properties unveränderbar (read-only)
// Kombination mit Pick: nur title und completed, beide read-only
function renderTodo(todo: Readonly<Pick<Todo, 'title' | 'completed'>>) {
  console.log(todo.completed);
  todo.completed = !todo.completed; // Fehler! Readonly-Property kann nicht geändert werden
}

// Partial Utility Type: Macht alle Properties optional
type OptionalTodo = Partial<Todo>; // Alle Felder sind jetzt optional

// Readonly: Verhindert Änderungen nach der Initialisierung
const myTodo: Readonly<Todo> = {
  title: 'Katzen füttern',
  description: 'Wie immer',
  completed: true,
};

// Alternative mit "as const": Macht das ganze Objekt zu Literal-Typen
// const myTodo = {
//   title: 'Katzen füttern',
//   description: 'Wie immer',
//   completed: true,
// } as const;

myTodo.title; // Lesbar, aber nicht änderbar

// Record Utility Type: Erstellt Objekt-Typ mit definierten Keys und Wert-Typ
// Hier: Objekt mit Keys admin/user/guest und jeweils boolean-Werten
type Role = 'admin' | 'user' | 'guest';
type RoleAccess = Record<Role, boolean>;

// Alle drei Roles müssen vorhanden sein, alle müssen boolean sein
const userAccess: RoleAccess = {
  admin: false,
  guest: false,
  user: true,
};

// Index Signature: Objekt-Keys können auch Zahlen sein
const someObj = {
  myString: 'test',
  3: 'Zahl', // Wird intern zu String '3'
};

console.log(someObj[3]); // Zugriff über numerischen Index
