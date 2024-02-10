import express from "express";
import cors from "cors";

import colors from "colors";
import { faker } from "@faker-js/faker";
import { ListResponse, Specialist } from "specialist-types";
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
  votes: faker.helpers.arrayElements([1, 2, 3, 4, 5], { min: 0, max: 120 }),
  userVote: 0,
  isFavorite: false,
});

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5000,
});

const PAGE_SIZE = 8;

app.use(express.json());

app.get("/all-favorite", (req, res) => {
  const search = req.query.search as string;
  const page = parseInt(req.query.page as string);

  const filteredUsers = searchByNames(USERS, search);

  const response: ListResponse<Specialist> = {
    page,
    total: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / PAGE_SIZE),
    response: paginate(filteredUsers, PAGE_SIZE, page),
  };

  res.send(response);
});

app.get("/my-specialists", (req, res) => {
  const search = req.query.search as string;
  const page = parseInt(req.query.page as string);
  const favoriteUsers = USERS.filter((user) => user.isFavorite);

  const filteredUsers = searchByNames(favoriteUsers, search);

  const response: ListResponse<Specialist> = {
    page,
    total: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / PAGE_SIZE),
    response: paginate(filteredUsers, 5, page),
  };

  res.send(response);
});

app.put("/favorites/add/:id", (req, res) => {
  const specialist = findSpecialist(req, res);

  if (specialist?.isFavorite) {
    return res
      .status(400)
      .send({ errorMessage: `Specialist is already set as favorite` });
  }

  specialist.isFavorite = true;

  res.send(specialist);
});

app.put("/favorites/remove/:id", (req, res) => {
  const specialist = findSpecialist(req, res);

  if (!specialist.isFavorite) {
    return res
      .status(400)
      .send({ errorMessage: `Specialist is already set as not favorite` });
  }

  specialist.isFavorite = false;

  res.send(specialist);
});

app.patch("/vote/:id", (req, res) => {
  const specialist = findSpecialist(req, res);

  specialist.votes.push(req.body.vote);
  specialist.userVote = req.body.vote;

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

function searchByNames(users: Specialist[], searchKey: string) {
  const key = searchKey.toLowerCase().trim();

  return users.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(key) ||
      lastName.toLowerCase().includes(key)
  );
}

function paginate(users: Specialist[], pageSize = 5, pageNumber: number) {
  return users.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
