// ------------------------------------------
// Built-in Utility Types Practice
// ------------------------------------------

// 1. Partial
// Use Partial to make all properties in the User type optional.

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// TODO: Create a variable `draftUser` of type Partial<User>
// and assign only one property to it.
type PartialUser = Partial<User>;

const draftUser: PartialUser = { password: '********' };

// 2. Required
// Use Required to make sure all fields are required.

type Settings = {
  darkMode?: boolean;
  fontSize?: number;
  theme: string;
};

// TODO: Create a variable `strictSettings` of type Required<Settings>
// and provide all the properties.

const strictSettings: Required<Settings> = { darkMode: true, fontSize: 16, theme: 'cupcake' };

// 3. Readonly
// Make a Book object that cannot be edited after creation.

// type Book = {
//   title: string;
//   author: string;
// };

// TODO: Use Readonly<Book> to make the book immutable.
// Try changing a property and see the error.

// type ReadonlyBook = Readonly<Book>;

// // const book: Readonly<Book> = { title: '1984', author: 'George Orwell' };
// const book = { title: '1984', author: 'George Orwell' } as const;
// book.title = 'Animal Farm'; // ❌ Should be a compile error

// const myArr = [1, 2, 3, 'test', 4, 5] as const;

// type newArr = (typeof myArr)[number];

const colors = ['red', 'green', 'blue'] as const;

type Color = (typeof colors)[number];

type Book = {
  author: {
    firstName: string;
    lastName: string;
  };
  year: number;
  title: string;
  awards: {
    title: string;
    year: number;
  }[];
};

type BookAuthor = Book['author']['firstName'];

// 4. Record
// You’re building a key-value map of scores per user.
// Keys are usernames (string), values are numbers.

// TODO: Use Record<string, number> to type this object

type Scores = Record<string, number>;

const scores: Scores = {
  alice: 42,
  bob: 36,
};

// 5. Pick
// Pick only the name and email from the User type.

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

// TODO: Create a type ContactInfo using Pick
// Then create a variable `contactInfo` with only those props.

const contactInfo: Pick<Contact, 'name' | 'email'> = { name: 'Grace', email: 'grace@example.com' };

// 6. Omit
// Now do the reverse: remove the phone from Contact.

// TODO: Create a type ContactNoPhone using Omit
// Then try assigning a variable with a `phone` property and see the error.

type ContactNoPhone = Omit<Contact, 'phone'>;

const contactNoPhone: ContactNoPhone = {
  id: 1,
  name: 'Alan',
  email: 'alan@example.com',
  // phone: 'should not be allowed', // ❌
};
