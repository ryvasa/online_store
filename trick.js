const stocks = [
  { stock: 80, size: "XXL", color: "red" },
  { stock: 70, size: "XL", color: "red" },
  { stock: 100, size: "L", color: "red" },
  { stock: 90, size: "M", color: "red" },
  { stock: 30, size: "S", color: "red" },
  { stock: 100, size: "XS", color: "red" },
  { stock: 89, size: "XXS", color: "blue" },
  { stock: 78, size: "XXL", color: "blue" },
  { stock: 10, size: "XL", color: "blue" },
  { stock: 80, size: "L", color: "blue" },
  { stock: 40, size: "M", color: "blue" },
  { stock: 44, size: "S", color: "blue" },
  { stock: 67, size: "XS", color: "blue" },
  { stock: 90, size: "XXS", color: "blue" },
  { stock: 9, size: "XXS", color: "green" },
  { stock: 78, size: "XXL", color: "green" },
  { stock: 46, size: "XL", color: "green" },
  { stock: 93, size: "L", color: "green" },
  { stock: 30, size: "M", color: "green" },
  { stock: 40, size: "S", color: "green" },
  { stock: 28, size: "XS", color: "green" },
  { stock: 34, size: "XXS", color: "green" },
];

let totalStocks = 0;

for (let i = 0; i < stocks.length; i++) {
  totalStocks += stocks[i].stock;
}

console.log({ totalStocks });
const colors = Object.values(
  stocks.reduce((acc, { color }) => {
    if (!acc[color]) acc[color] = { color };
    return acc;
  }, {})
);

const sizes = Object.values(
  stocks.reduce((acc, { size }) => {
    if (!acc[size]) acc[size] = { size };
    return acc;
  }, {})
);

console.log(colors); // Output: ["red", "blue", "green"]
console.log(sizes); // Output: ["XXL", "XL", "L", "M", "S", "XS", "XXS"]
