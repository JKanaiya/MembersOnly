import { Client } from "pg";
import "dotenv/config.js";
import bcrypt from "bcryptjs";

const dummyUsersPasswords = [
  await bcrypt.hash("syliscute", 10),
  await bcrypt.hash("wayofkings", 10),
  await bcrypt.hash("mywifeshallan", 10),
  await bcrypt.hash("myfourthcrumpet", 10),
  await bcrypt.hash("youwillwitness", 10),
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 email VARCHAR(255),
 fullname VARCHAR(255),
 text VARCHAR(150),
 time TIMESTAMP
);
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 email VARCHAR(255),
 fullname VARCHAR(255),
 password VARCHAR(255),
 role VARCHAR(150)
);

INSERT INTO messages (email, fullname, text, time) 
VALUES
('kaladinstormguy@fakemail.com', 'kaladin storms', 'Honor is dead, but Ill see what I can do', '2014-03-04'),
('followtherules@fakemail.com', 'dalinar kholin', 'You will not take away my pain', '2014-03-04'),
('ichallengeyoutoafashionoff@fakemail.com', 'adolin kholin', 'Three wives in one is a pretty good deal all things considered', '2014-03-04'),
('kruppeislessfatnow@fakemail.com', 'kruppe', 'Survivors do not mourn together. To face death is to stand alone', '2014-03-04'),
('youshallwitness@fakemail.com', 'karsa orlong', 'There is plenty of room for guilt in the heart of hate', '2014-03-04');

INSERT INTO users (email, fullname, password, role) VALUES 
('kaladinstormguy@fakemail.com', 'kaladin storms', '${dummyUsersPasswords[0]}', 'user'),
('followtherules@fakemail.com', 'dalinar kholin', '${dummyUsersPasswords[1]}', 'admin'),
('ichallengeyoutoafashionoff@fakemail.com', 'adolin kholin', '${dummyUsersPasswords[2]}','user'),
('kruppeislessfatnow@fakemail.com', 'kruppe', '${dummyUsersPasswords[3]}', 'admin'),
('youshallwitness@fakemail.com', 'karsa orlong', '${dummyUsersPasswords[4]}', 'user');

`;
async function main() {
  console.log("seeding...");
  console.log(process.env.CONNECTION_STRING);
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
