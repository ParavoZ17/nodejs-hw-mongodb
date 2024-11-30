import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = "asc" }) => {
  const skip = (page - 1) * perPage;
  const contacts = await ContactsCollection.find().skip(skip).limit(perPage).sort({[sortBy]:sortOrder});
  const totalItems = await ContactsCollection.countDocuments();
  const paginationData = calculatePaginationData({totalItems, page, perPage})
  return {
    contacts,
    ...paginationData,
  };
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
