import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders ContactForm with empty fields", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ContactForm />
      </Provider>
    </BrowserRouter>
  );

  expect(screen.getByText("Create Contact Screen")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("First Name")).toHaveValue("");
  expect(screen.getByPlaceholderText("Last Name")).toHaveValue("");
  expect(screen.getByText("Active")).toBeInTheDocument();
  expect(screen.getByText("Inactive")).toBeInTheDocument();
});

test("displays error messages when submitting with empty fields", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ContactForm />
      </Provider>
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText("Save Contact"));

  expect(screen.getByText("First name is required")).toBeInTheDocument();
  expect(screen.getByText("Last name is required")).toBeInTheDocument();
});

test("clears the form fields after successful submission", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ContactForm />
      </Provider>
    </BrowserRouter>
  );

  const firstNameInput = screen.getByPlaceholderText("First Name");
  const lastNameInput = screen.getByPlaceholderText("Last Name");
  const saveButton = screen.getByText("Save Contact");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.click(saveButton);

  expect(firstNameInput).toHaveValue("");
  expect(lastNameInput).toHaveValue("");
});

test('clicking save button should navigate to "/"', () => {
  const history = createMemoryHistory();

  render(
    <BrowserRouter>
      <Provider store={store}>
        <ContactForm />
      </Provider>
    </BrowserRouter>
  );

  const saveButton = screen.getByText("Save Contact");
  fireEvent.click(saveButton);

  expect(history.location.pathname).toBe("/");
});
