/* handle the following:
registration
  validate username
    trim it
    it must not already exist in the db
  validate email
    it must be an email
    it must not already exist in the db
  salt and hash password
  add the user to the db
  assign a session id
log in
  assign a session id
log out

if an operation failed for a random reason, lean in to http 500 and return it

*/

import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getDbConnection } from '../database/getDbConnection.js';

/*
 *  register a new user
 */
export async function registerUser(req, res) {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({error: 'All fields are required'});
  }

  username = username.trim().toLowerCase();

  // validate email
  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({error: 'Email is not valid'});
  }

  try {
    const db = await getDbConnection();

    // check is username or email already exist
    const exists = await db.get(`
      SELECT *
      FROM users
      WHERE username = ?
        OR email = ?
    `, [username, email]);

    if (exists) {
      return res.status(400).json({error: 'Username or email already exists'});
    } else {
      const userUuid = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      // add user to the DB
      await db.run(`
        INSERT INTO users (user_uuid, username, email, password)
        VALUES (?, ?, ?, ?)
      `, [userUuid, username, email, hashedPassword]);
      
      req.session.id = userUuid;
      
      res.status(201).json({message: 'User registered'});
    }
  } catch (err) {
    res.status(500).json({error: 'Registration error occurred'});
  }
}

