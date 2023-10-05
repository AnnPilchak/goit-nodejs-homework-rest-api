import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const updateContacts = contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  contacts.splice(contactIndex, 1);
  await updateContacts(contacts);

  return 'Contact deleted';
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = {
    id: contactId,
    name,
    email,
    phone,
  };

  await updateContacts(contacts);
  return contacts[contactIndex];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
