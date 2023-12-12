import { check, validationResult } from 'express-validator';
import { StatusCodes } from "http-status-codes"

const auth = {
  register: [
    check('name').isString().not().isEmpty().withMessage('Name should be a string').escape(),
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('password is required').escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, errors: errors.array() });
      next();
    },
  ],
  login: [
    check('email').not().isEmpty().isEmail().withMessage('Email is required').normalizeEmail(),
    check('password').not().isEmpty().withMessage('password is required').escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ success: false, errors: errors.array() });
      next();
    },
  ],
};


export default { auth };
