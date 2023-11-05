import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import { authenticate, upload, isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody, validateFavorite } from "../../decorators/index.js";

import { contactAddSchema, contactUpdateFavotiteSchema } from "../../models/Contact.js";

const contactsAddValidate = validateBody(contactAddSchema);
const contactsUpdateFavoriteValidate = validateFavorite(contactUpdateFavotiteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", isValidId, contactsController.getContactById);

contactsRouter.post("/", upload.single("avatar"), isEmptyBody, contactsAddValidate, contactsController.addContact);

contactsRouter.delete("/:contactId", isValidId, contactsController.removeContact);

contactsRouter.put("/:contactId", isEmptyBody, isValidId, contactsAddValidate, contactsController.updateContactById);

contactsRouter.patch("/:contactId/favorite", isValidId, contactsUpdateFavoriteValidate, contactsController.updateContactById);

export default contactsRouter;
