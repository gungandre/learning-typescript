const button: HTMLButtonElement = document.querySelector("button")!;
// tnda ! berarti variable tersebut tidak akan pernah bernilai null

const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  // tanta + untuk mengkonversi string ke number
  console.log(add(+input1.value, +input2.value));
});
