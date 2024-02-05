import express from "express";
import cors from "cors";

import colors from "colors";
import { faker } from "@faker-js/faker";
import { Specialist } from "specialist-types";
import { CALAMARI } from "./calamari";

const app = express();

const PORT = 3000;

app.use(cors());

colors.enable();

const createRandomUser = (): Specialist => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.firstName(),
  avatar: faker.image.avatar(),
  specialization: faker.person.jobTitle(),
  votes: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 0, max: 7 }),
  userVote: faker.number.int({ min: 0, max: 5 }),
  isFavorite: false,
});

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 4,
});

app.get("/specialists", (req, res) => {
  res.send(USERS);
});

app.listen(PORT, () => {
  console.log(CALAMARI.green);
  console.log(`Listening on port ${PORT}`.green);
});
