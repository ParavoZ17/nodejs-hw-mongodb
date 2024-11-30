import { model, Schema } from 'mongoose';
import { contactType } from '../../constants/constants.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

export const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactType,
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', handleSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['name', 'isFavourite'];
export const ContactsCollection = model('contacts', contactsSchema, 'contacts');
