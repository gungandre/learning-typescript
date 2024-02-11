type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

// ! type ElevatedEmployee = Admin & Employee; adalah gabungan dari type definition, jadi variable yang akan menggunakan type ini harus mempunyai type dari Admin & Employee;. sama see4perti ini juga interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// ! variable test terjadi error karena string tidak sesuai dengan hasil persilangan antara Combinable dan Numeric
// const test: Universal = "1";

// ! datam ts jika suatu function memiliki 2 return value tipe data yang berbeda, maka ts tidak mengetahuinya seperti contoh function add yg mempunyai return valur tipe data number / string
// ! maka dari itu kita bisa menggunakan function overload yaitu kita memberi tahu ts jika parameter tertentu maka return valurnya tertentu juga seperti contoh di bawah
// ! ini penting karena misal jika return valuenya string dan kita ingin menggunakan method daris string tersebut,contoh split() maka tss tidak akan mengindikasikan error karena ts sudah tau return valuenya
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Max", " Schwarz");
result.split(" ");

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);

const userInput = "";

// ! oeprator ?? caining operator yang digunakan kusus untuk mengecek null atau undefined, kalau string kosong / '' masih lolos, karena string kosong juga false
const storedData = userInput ?? "DEFAULT";

console.log("test", storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  // ! jika menggunakan definisi type UnknownEmployee = Employee | Admin; pada suatu parameter di function, kita harus mengeceknya menggunakan if, jika tidak maka tsc akan mengindikasikan error
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  // ! jika menggunakan definisi type Vehicle = Car | Truck; pada suatu parameter di function, kita harus mengeceknya menggunakan if, jika tidak maka tsc akan mengindikasikan error
  // !  vehicle.drive(); tidak error karena kedua type caar dan venicle mempunyai method drive, jadi hanya loadcargo saja yang perlu di cek karna method tersebut hanya ada di truck saja
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  // ! atau bisa menggunakan if jika tidak menggunakan property type di Bird | Horse;
  if ("flyingSpeed" in animal) {
    speed = animal.flyingSpeed;
  } else if ("runningSpeed" in animal) {
    speed = animal.runningSpeed;
  }

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// kita bisa memanggil <HTMLInputElement> untuk medifinisikan tipe data dom karena kita sudah menseting di msconfig dibagian lib untuk domnya
// <HTMLInputElement> adalah sintaks jsx code yang biasa digunakan direact
const userInputElementt = <HTMLInputElement>(
  document.getElementById("user-input")!
);
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;
userInputElement.value = "hi";

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }
  // ! saat kita fetch data dari api kita tidak tahu jumlah property dan nama property yang kita dapat nanti
  // ! untuk itu kita bisa menggunakan perulangan dengan sintaks yang sangat sederhana ini [prop: string]: string;
  // ! yang memiliki parameter props:string yang artinya keynya brupa string, dan value dari keynya berupa string juga
  // ! dengan cara itu maka di ts akan mengecek 1 per 1 tipe data dari setiap key dan valuenya

  [prop: string | number]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
  1: "test",
};
