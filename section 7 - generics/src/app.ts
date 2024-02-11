// const names: Array<string> = []; // string[]
// names[0].split(' ');

// ! jadi gereric type apa type yang mempounyai parameter yang nanti kita bisa asign secara flexibel
const promise: Promise<number> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  // data.split(' ');
  console.log(data);
});

// ! jika parameter yang ditrima harus berupa object kita bisa menggunakan extends Object
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log("test", mergedObj);

interface Lengthy {
  length: number;
}
// ! ts tidak tahu nanti di dalam function kita menggunakan method dari setiap type apa ynag kita dapat
// ! seperti contohnya kita memberi tipe data array dan nanti di dalam fucntion itu kita memanggil method length yang mana method length itu mengembalikan number
// ! oleh karena itu kita bisa membuat interface lengthy untuk mendefinisikan tipe data tersebut dan extends
// ! karena parameter elemen di definisikan string array sebelumnya oleh ts, dan di method length mengembalikan number
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

// ! di ts jika kira membuat fucntion yang memiliki 2 parameter yaitu parameter pertama adalah object ynag berisi data dan paramter kedua yaitu key dari paramter pertama untuk mengambil data value yang kita inginkan, maka kita harus mendefinisikan di generic typesnya dengan U extends keyof T yang mennandakan U adalah keyof T agar tidak terjadi error
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // -1
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // ! Fungsi createCourseGoal yang Anda tunjukkan menggunakan Partial<CourseGoal> untuk membuat objek yang sementara belum lengkap (partial). Tipe Partial<T> di TypeScript digunakan untuk membuat tipe yang memiliki semua properti dari tipe T, tetapi semua properti tersebut menjadi opsional (boleh kosong).
  // ! jadi intinya menggunakan partial untuk object yang belum lengkap seperti coo=ntih di function ini, kita mengisi data object saat parameter function setelah di isi
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// ! kita bisa menggunakan readOnly untuk membuat object/array tidak bisa di hapus atau ditambhakan lagi
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push('Manu');
// names.pop();
