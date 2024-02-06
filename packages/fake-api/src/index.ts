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
  votes: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 0, max: 40 }),
  userVote: faker.number.int({ min: 0, max: 5 }),
  isFavorite: false,
});

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 20,
});

app.get("/all-favorite", (req, res) => {
  res.send(USERS);
});

app.get("/my-specialists", (req, res) => {
  res.send(USERS.filter((user) => user.isFavorite));
});

app.put("/specialists/add-to-favorite/:id", (req, res) => {
  const specialist = findSpecialist(req, res);

  if (specialist?.isFavorite) {
    return res
      .status(400)
      .send({ errorMessage: `Specialist is already set as favorite` });
  }

  specialist.isFavorite = true;

  res.send(specialist);
});

app.listen(PORT, () => {
  console.log(CALAMARI.green);
  console.log(`Listening on port ${PORT}`.green);
});

function findSpecialist(req: any, res: any) {
  const specialist = USERS.find((user) => user.id === req.params.id);

  if (!specialist) {
    throw res.status(404).send({ errorMessage: `Server does not exist` });
  }
  return specialist;
}
