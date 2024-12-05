import { Router } from 'express';
import * as Controller from '../controlers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import {
  contactsAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middelewares/isValidId.js';
import { authenticate } from '../middelewares/authenticate.js';
import { upload } from '../middelewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(Controller.getAllContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(Controller.getContactByIdController),
);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsAddSchema),
  ctrlWrapper(Controller.addContactController),
);
contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(Controller.patchContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(Controller.deleteContactController),
);

export default contactsRouter;
