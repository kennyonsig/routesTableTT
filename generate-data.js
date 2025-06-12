const { fakerRU: faker } = require('@faker-js/faker');
const fs = require('fs');

const networks = Array.from({ length: 100 }, () => ({
  uuid: faker.string.uuid(),
  address: faker.internet.ipv4(),
  mask: String(faker.number.int({ min: 0, max: 32 })),
  gateway: faker.internet.ipv4(),
  interface: faker.helpers.arrayElement([
    'Домашняя сеть',
    'Подключение Ethernet',
    'Гостевая сеть'
  ])
}));

fs.writeFileSync('routesData.json', JSON.stringify({ networks }, null, 2));
