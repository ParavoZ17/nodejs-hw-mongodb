import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';



export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  userId, 
}) => {
  const skip = (page - 1) * perPage;

 
  const query = ContactsCollection.find({ userId });

  const data = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollection.countDocuments({ userId }); 
  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    data,
    ...paginationData,
  };
};


export const getContactById = async (contactId, userId) => {
  const data = await ContactsCollection.findOne({ _id: contactId, userId });
  return data; 
};


export const addContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};


export const patchContact = async (contactId, payload, userId, options = {}) => {
  const data = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, ...options }
  );
  return data; 
};


export const deleteContact = async (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};

