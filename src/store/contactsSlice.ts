import { createSelector } from "reselect";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./types";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactsState {
  contacts: Contact[];
}

// Load contacts from local storage
const loadContactsFromLocalStorage = (): Contact[] => {
  const contactsData = localStorage.getItem("contacts");
  if (contactsData) {
    return JSON.parse(contactsData);
  }
  return [];
};

// Save contacts to local storage
const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const initialState: ContactsState = {
  contacts: loadContactsFromLocalStorage(),
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Add a contact
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts);
    },
    // Delete a contact
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      saveContactsToLocalStorage(state.contacts);
    },
    // Edit a contact
    editContact: (state, action: PayloadAction<Contact>) => {
      const { id, firstName, lastName, status } = action.payload;
      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === id
      );
      if (contactIndex !== -1) {
        state.contacts[contactIndex] = { id, firstName, lastName, status };
        saveContactsToLocalStorage(state.contacts);
      }
    },
  },
});

// Action creators
export const { addContact, deleteContact, editContact } = contactsSlice.actions;

// Selectors
const selectContactsState = (state: RootState) => state.contacts;

// Select all contacts
export const selectContacts = createSelector(
  [selectContactsState],
  (contactsState) => contactsState.contacts
);

// Get a contact by ID
export const getContactById = (state: RootState, itemId: number) =>
  state.contacts.contacts.find((c) => c.id === itemId);

export default contactsSlice.reducer;
