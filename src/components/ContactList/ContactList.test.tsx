import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ContactList from "./ContactList";
import store from "../../store";

test("renders ContactList component with nothing", () => {
  render(
    <Provider store={store}>
      <Router>
        <ContactList />
      </Router>
    </Provider>
  );

  // Check if the "Create contact" button is present
  const createContactButton = screen.getByRole("link", {
    name: "Create contact",
  });
  expect(createContactButton).toBeInTheDocument();

  //since there are no contacts on the store, no contacts found text should be in the DOM
  const noContactsFound = screen.getByText("Sorry, no contacts found.");
  expect(noContactsFound).toBeInTheDocument();
});
