import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};

export const patchContact = async (contactId, payload, options = {}) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      ...options,
    },
  );
  return contact;
};

export const deleteContact = (contactId) =>
  ContactsCollection.findByIdAndDelete(contactId);
