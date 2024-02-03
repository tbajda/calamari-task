const express = require("express");
const cors = require("cors");
const CALAMARI = require("./calamari");
const colors = require("colors");

const { faker } = require("@faker-js/faker");

const app = express();

const PORT = 3000;

app.use(cors());

colors.enable();

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.firstName(),
    avatar: faker.image.avatar(),
    specialization: faker.person.jobTitle(),
    rates: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 0, max: 7 }),
    isFavorite: false,
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

app.get("/specialists", (req, res) => {
  res.send(USERS);
});

app.listen(PORT, () => {
  console.log(CALAMARI.green);
  console.log(`Listening on port ${PORT}`.green);
});
