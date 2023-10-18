import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const messagesErrors = {
  "string.base": "Field {#label} must be a string.",
  "string.empty": "Field {#label} cannot be empty.",
  "string.email": "Field {#label} must be a valid email address.",
  "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
  "any.required": "missing required {#label} field",
};

const messagesErrorsFavorite = {
  "any.required": "missing field favorite",
};

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},
    { versionKey: false }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp("^\\(\\d{3}\\) \\d{3}-\\d{4}$")),
})
  .unknown(false)
  .messages(messagesErrors);

export const contactUpdateFavotiteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages(messagesErrorsFavorite);

const Contact = model("contact", contactSchema);

export default Contact;