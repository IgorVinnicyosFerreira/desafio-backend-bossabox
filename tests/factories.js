const faker = require('faker');
const { factory } = require('factory-girl');
const { User, Tool } = require('../src/app/models');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

factory.define('Tool', Tool, {
  title: faker.commerce.productName(),
  link: faker.internet.url(),
  description: faker.lorem.lines(2),
  tags: faker.random.words(5).split(' '),
  userId: async () => await factory.create('User').id
});

module.exports = factory;
