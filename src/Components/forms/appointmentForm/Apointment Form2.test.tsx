import { render, screen, act, waitFor } from "@testing-library/react";
import AppointmentForm from "./AppointmentForm"; // Your component
import userEvent from "@testing-library/user-event";

describe("AppointmentForm Tests", () => {
  // Declare shared variables for form elements
  let heading: HTMLElement,
    titleInput: HTMLInputElement,
    contactsDropdown: HTMLSelectElement,
    datePickerInput: HTMLInputElement,
    timeDropdown: HTMLSelectElement,
    submitButton: HTMLButtonElement,
    component: ReturnType<typeof render>;

  beforeEach(() => {
    // 1. Render the AppointmentForm component
    component = render(<AppointmentForm />);
    // 2. Identify and store references to form elements
    // heading
    heading = screen.getByRole("heading", { level: 2 });
    // inputs
    titleInput = screen.getByPlaceholderText("Enter appointment title");
    contactsDropdown = screen.getByLabelText("Options");
    datePickerInput = screen.getByPlaceholderText("Select date");
    timeDropdown = screen.getByLabelText("Select a time");
    // buttons
    submitButton = screen.getByRole("button", { name: /submit/i });
    // error messages
  });
  const getErrorMessages = async () => {
    await userEvent.click(submitButton); // Simulate form submission
    return {
      titleError: screen.queryByTestId("title-error"),
      contactsError: screen.queryByTestId("contacts-error"),
      dateError: screen.queryByTestId("date-error"),
      timeError: screen.queryByTestId("time-error"),
    };
  };
  // ********** Rendering Tests **************
  //   form contianer renders
  test("renders without crashing", () => {
    expect(component.container).toBeTruthy(); // Ensures the rendered output is not null or undefined.
  });
  //   each element renders
  test("renders all form elements", () => {
    expect(heading).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(contactsDropdown).toBeInTheDocument();
    expect(datePickerInput).toBeInTheDocument();
    expect(timeDropdown).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  // ************** Validation Tests ***************

  test("renders form elements with correct content", () => {
    expect(heading).toHaveTextContent("Book appointment");
    expect(titleInput).toHaveAttribute(
      "placeholder",
      "Enter appointment title"
    );
    expect(contactsDropdown).toContainHTML(
      "<option value=''>please select a contact</option>"
    );
    expect(datePickerInput).toHaveAttribute("placeholder", "Select date");
    expect(submitButton).toHaveTextContent("Submit");
  });
  // 1. Simulate submitting the form without filling in any fields.
  //    - Expect error messages to appear for all required fields.
  test(" all inputs error if inputs left balnk", async () => {
    const { titleError, contactsError, dateError, timeError } =
      await getErrorMessages();

    expect(titleError?.textContent).toBe("title is required");

    expect(contactsError?.textContent).toBe("contacts is required");

    expect(dateError?.textContent).toBe("please select available date");

    expect(timeError?.textContent).toBe("time is required");
  });
  // 2. simulate filluing in feilds and values to be correct

  //    - For the "Time" dropdown: Expect error messages to clear when a time is selected.
  test("errors are not present when each field has value ", async () => {
    // simulate form subission so errors are present
    const { titleError, contactsError, dateError, timeError } =
      await getErrorMessages();
    let errorCount = screen.getAllByRole("paragraph");
    //  number of errors  equals number of inputs
    expect(errorCount.length).toEqual(4);
    //    - For the "Title" field: Expect error messages to clear when valid input is entered.
    await userEvent.type(titleInput, "doctor");
    expect(titleInput).toHaveValue("doctor");
    expect(titleError).not.toBeInTheDocument();
    //    - For the "Contacts" dropdown: Expect error messages to clear when a contact is selected.
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Options" }),
      "contact 1"
    );
    expect(contactsDropdown).toHaveValue("contact1");
    expect(contactsError).not.toBeInTheDocument();
    //    - For the "Date" picker: Expect error messages to clear when a date is selected.

    await act(async () => {
      datePickerInput.focus();
      await userEvent.type(datePickerInput, "16/12/2024", { delay: 100 });
    });
    expect(datePickerInput).toHaveValue("16/12/2024");
    expect(dateError).not.toBeInTheDocument();
    //    - For the "Time" dropdown: Expect error messages to clear when a time is selected.
    await act(async () => {
      await userEvent.selectOptions(
        screen.getByRole("combobox", { name: "Select a time" }),
        "8"
      );
    });
    expect(timeError).not.toBeInTheDocument();
    expect(timeDropdown).toHaveValue("8");
  });
});

// ************** Submission Tests **********************
// 1. Mock the `onSubmit` handler.
// 2. Fill in all fields with valid data.
// 3. Simulate a form submission.
//    - Expect the mock handler to be called with the correct form data.
