// ! Dalam TypeScript, decorator adalah fitur yang memungkinkan Anda menambahkan metadata atau mengubah perilaku kelas, metode, properti, atau parameter. Decorator memungkinkan Anda menulis kode yang dapat mengubah atau memodifikasi target yang diberikan sebelum atau setelah saat runtime.

// ! Decorator ditandai dengan simbol @ dan biasanya digunakan sebelum deklarasi suatu entitas, seperti kelas, metode, properti, atau parameter.

// ! unntuk menggunakan decorator kita harus setting terlebih dahulu di tscconfig pada bagian experimentalDecorators

// ! deorator berfungsi untuk mendupliaksi suatu class yang nantinya masuk ke paramter function decorator tersebut
// ! jika inign menggunakan decorator di class maka kita harus menginisialisasi fucntion decorator tersebut di atas class nya
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log("Logger", logString);
    console.log("Logger", constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  // ! <T extends { new (...args: any[]): { name: string } }> adalah representasi dari class Person, karna class person di console.log menjadi object, kaarna class itu adalah object di js \
  // ! karna kalau class person = new person() di console maka akan mendapatkan object {name: max}
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')

@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log("log", target, propertyName);
}

// ! PropertyDescriptor adalah type default ts

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  name = "gungandre";
  console.log("Log2", target);
  console.log("Log2", name);
  console.log("Log2", descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log("Log3", target);
  console.log("Log3", name);
  console.log("Log3", descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  console.log("originalMethod", descriptor);
  console.log("_, _2", _, _2);
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      console.log("this", this);
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector("button")!;
//! jika emnggunakan class untuk menangani event listener kita harus menggunakan method bind ke class itu agar berfungsi
// ! tapi kita bisa menggunakan method method decorator
// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  console.log(target, propName);
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  console.log("obj", obj.constructor.name);
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
