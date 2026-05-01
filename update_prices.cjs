const fs = require('fs');
let content = fs.readFileSync('src/data/cars.js', 'utf8');

const updates = {
  "Mercedes-Benz": 15000,
  "BMW": 12000,
  "Audi": 10000,
  "Range Rover": 25000,
  "Volkswagen": 6000,
  "Toyota": 5000,
  "Porsche": 30000,
  "Dacia": 4000,
  "Peugeot": 8000,
  "Renault": 3500,
  "Hyundai": 9000,
  "Kia": 8000
};

for (const [brand, price] of Object.entries(updates)) {
  const regex = new RegExp(`brand: "${brand}",[\\s\\S]*?price: \\d+,`, 'g');
  content = content.replace(regex, match => match.replace(/price: \d+/, `price: ${price}`));
}

fs.writeFileSync('src/data/cars.js', content);
console.log('Prices updated in src/data/cars.js');
