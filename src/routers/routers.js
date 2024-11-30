import { Router } from 'express';
import * as Controller from '../controlers/contacts.js'
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { contactsAddSchema, contactUpdateSchema} from '../validation/contacts.js';
import { isValidId } from '../middelewares/isValidId.js';



const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(Controller.getAllContactsController));
contactsRouter.get('/:contactId',isValidId, ctrlWrapper(Controller.getContactByIdController));
contactsRouter.post('/',validateBody(contactsAddSchema), ctrlWrapper(Controller.addContactController));
contactsRouter.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(Controller.patchContactController));
contactsRouter.delete('/:contactId',isValidId,  ctrlWrapper(Controller.deleteContactController));

export default contactsRouter;
