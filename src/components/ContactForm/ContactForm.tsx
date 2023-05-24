import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import {
  addContact,
  selectContacts,
  getContactById,
  editContact,
} from "../../store/contactsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const { id } = useParams();

  const contact = useSelector((state: RootState) =>
    getContactById(state, Number(id))
  );
  const contacts = useSelector(selectContacts);

  const [firstName, setFirstName] = useState(contact?.firstName ?? "");
  const [lastName, setLastName] = useState(contact?.lastName ?? "");
  const [status, setStatus] = useState(contact?.status ?? "inactive");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const activeRadio = [false, false];

  if (status === "inactive") {
    activeRadio[1] = true;
  } else {
    activeRadio[0] = true;
  }

  const handleSubmit = (e: React.FormEvent, key: string, id?: number) => {
    e.preventDefault();

    // Clear previous error messages
    setFirstNameError("");
    setLastNameError("");

    let hasError = false;

    if (firstName === "") {
      setFirstNameError("First name is required");
      hasError = true;
    }

    if (lastName === "") {
      setLastNameError("Last name is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Dispatch the addContact and editContact action accordingly
    switch (key) {
      case editButtonText:
        if (id) {
          dispatch(editContact({ id: id, firstName, lastName, status }));
        }
        break;
      case addButtonText:
        dispatch(
          addContact({ id: contacts.length + 1, firstName, lastName, status })
        );
        break;
      default:
        break;
    }

    // Clear the form fields
    setFirstName("");
    setLastName("");
    setStatus("inactive");
    !hasError && navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    switch (key) {
      case "inactive":
        setStatus("inactive");
        break;
      case "active":
        setStatus("active");
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      default:
        break;
    }
  };

  const editButtonText = "Save Edited Contact";
  const addButtonText = "Save Contact";

  return (
    <div>
      <h1 className="text-center text-2xl mb-4">
        {contact ? "Edit Contact Screen" : "Create Contact Screen"}
      </h1>
      <form className="flex flex-col items-center">
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e, "firstName")}
        />
        {firstNameError && (
          <p className="text-red-500 text-sm">{firstNameError}</p>
        )}
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e, "lastName")}
        />
        {lastNameError && (
          <p className="text-red-500 text-sm">{lastNameError}</p>
        )}
        <label className="inline-flex items-center mb-2">
          <input
            className="mr-2"
            type="radio"
            checked={activeRadio[0]}
            onChange={(e) => handleChange(e, "active")}
          />
          <span className="ml-1">Active</span>
        </label>
        <label className="inline-flex items-center mb-2">
          <input
            className="mr-2"
            type="radio"
            checked={activeRadio[1]}
            onChange={(e) => handleChange(e, "inactive")}
          />
          <span className="ml-1">Inactive</span>
        </label>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={(e) =>
            handleSubmit(
              e,
              contact ? editButtonText : addButtonText,
              contact && contact.id
            )
          }
          type="submit"
        >
          {contact ? editButtonText : addButtonText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
