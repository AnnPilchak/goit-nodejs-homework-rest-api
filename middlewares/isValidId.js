import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next)=> {
    const {contactId} = req.params;
    if(!isValidObjectId(id)) {
        return next(HttpError(404, `${contactId} not valid id`))
    }
    next();
}

export default isValidId;