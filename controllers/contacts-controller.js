import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findById( { _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate({ _id: contactId, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  

  const result = await Contact.findByIdAndUpdate({ _id: contactId, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
}

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete({ _id: contactId });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};