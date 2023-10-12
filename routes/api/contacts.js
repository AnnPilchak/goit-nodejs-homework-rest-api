import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { contactAddSchema } from "../../schemas/contacts-scema.js";

const contactsAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactsAddValidate,
  contactsController.addContact
);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsAddValidate,
  contactsController.updateContactById
);

export default contactsRouter;
