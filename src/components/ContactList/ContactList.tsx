import React from "react";
import { useSelector } from "react-redux";
import { deleteContact, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch } from "../../store";
import { Link } from "react-router-dom";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1 className="text-center text-2xl mb-4">Contact List</h1>
      <div className="flex justify-center">
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 mb-10"
        >
          Create contact
        </Link>
      </div>
      <div className="flex flex-wrap justify-center -mx-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 mb-4 bg-gray-100 rounded-lg mx-4 w-full sm:w-auto sm:flex-shrink-0 sm:flex-grow-0"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h3 className="text-xl mb-2">
                    {contact.firstName.length > 7
                      ? contact.firstName.slice(0, 7) + "..."
                      : contact.firstName}
                  </h3>
                  <p className="mb-2">
                    {contact.lastName.length > 7
                      ? contact.lastName.slice(0, 7) + "..."
                      : contact.lastName}
                  </p>
                  <p className="mb-2">
                    {contact.status === "active" ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-5"></span>
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-5"></span>
                    )}
                    {contact.status}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  to={`/contact/${contact.id}`}
                >
                  Edit
                </Link>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Sorry, no contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
