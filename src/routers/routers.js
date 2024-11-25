import { Router } from 'express';
import * as Controller from '../controlers/contacts.js'
import ctrlWrapper from '../utils/ctrlWrapper.js';


const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(Controller.getAllContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(Controller.getContactByIdController));
contactsRouter.post('/', ctrlWrapper(Controller.addContactController));
contactsRouter.patch('/:contactId', ctrlWrapper(Controller.patchContactController));
contactsRouter.delete('/:contactId', ctrlWrapper(Controller.deleteContactController));

export default contactsRouter;
