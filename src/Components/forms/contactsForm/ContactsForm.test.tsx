import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ContactsForm from "./ContactsForm";
const mockSubmit = vi.fn();
const user = userEvent.setup();

// Centralized error texts

const NameInputError = "Name is required";
const emailInputError = "Email is required";
const phoneInputError = "Phone number is required";
const genderSelectError = "gender is required";

describe("Contact form tests", () => {
  // Declare shared variables for form elements
  let // Heading element
    heading: HTMLHeadingElement,
    //   inout ellements
    nameInput: HTMLInputElement,
    phoneNumberInput: HTMLInputElement,
    genderSelect: HTMLImageElement,
    // submit button
    submitButton: HTMLButtonElement,
    // error element
    titleError: HTMLParagraphElement,
    contactError: HTMLParagraphElement,
    datePickerError: HTMLParagraphElement,
    timeDropDownError: HTMLParagraphElement,
    component: ReturnType<typeof render>;

  beforeEach(() => {
    // 1. Render the AppointmentForm component
    component = render(<ContactsForm onSubmit={mockSubmit} />);
  });
});
