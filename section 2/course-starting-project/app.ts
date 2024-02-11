//  tipe unknown sama seperti any bisa di isi dengan tipe data apapun, tapi tipe data ini harus berisi pengecekan sebelumnya
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
  // seperti contoh ini
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // while (true) {}
}

generateError("An error occurred!", 500);
