import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AppointmentForm from "./AppointmentForm"; // Your component

const mockSubmit = vi.fn();
const user = userEvent.setup();

// Centralized error texts
const titleErrorText = "title is required";
const contactErrorText = "contact is required";
const datePickerErrorText = "please select available date";
const timeErrorText = "time is required";

describe("AppointmentForm Tests", async () => {
  // Declare shared variables for form elements
  let //   input elements
    heading: HTMLElement,
    titleInput: HTMLInputElement,
    contactsDropdown: HTMLSelectElement,
    datePickerInput: HTMLInputElement,
    timeDropdown: HTMLSelectElement,
    // submit button
    submitButton: HTMLButtonElement,
    // error element
    titleError: HTMLParagraphElement,
    contactError: HTMLParagraphElement,
    datePickerError: HTMLParagraphElement,
    timeDropDownError: HTMLParagraphElement,
    // reusable data
    today: Date,
    dateAsNumberString: string,
    formattedDate: string,
    // page render
    component: ReturnType<typeof render>;

  beforeEach(() => {
    // 1. Render the AppointmentForm component
    component = render(<AppointmentForm onSubmit={mockSubmit} />);
    // Find form elements
    heading = screen.getByRole("heading", { name: /book appointment/i });
    titleInput = screen.getByLabelText(/title/i);
    contactsDropdown = screen.getByLabelText(/contact/i);
    datePickerInput = screen.getByLabelText(/Select an available date/i);
    timeDropdown = screen.getByLabelText(/time/i);
    submitButton = screen.getByRole("button", { name: /submit/i });
    today = new Date();
    dateAsNumberString = today.getDate().toLocaleString();
    formattedDate = today.toLocaleDateString("en-GB");

    // error elements
  });

  const fillDatepickerInput = async () => {
    await user.click(datePickerInput);
    const allDates = screen.getAllByText(dateAsNumberString, {
      selector: "[aria-disabled='false']",
    });
    const selectedDate = allDates[0];
    await user.click(selectedDate);
  };

  const fillInputs = async () => {
    await user.type(titleInput, "test appointment");
    await user.selectOptions(contactsDropdown, "contact1");
    await user.click(datePickerInput);
    await fillDatepickerInput();
    await user.selectOptions(timeDropdown, "9:30");
  };

  //   elements render correctly
  describe("elements render correctly", () => {
    test("heading renders correctly", () => {
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toMatch(/Book Appointment/i); // Case-insensitive match
    });

    test("title input renders correctly", () => {
      expect(titleInput).toBeInTheDocument();
      expect(titleInput.getAttribute("type")).toBe("text"); // Verify input type
    });

    test("contacts dropdown renders correctly", () => {
      expect(contactsDropdown).toBeInTheDocument();
      expect(contactsDropdown.tagName).toBe("SELECT"); // Verify element type
    });

    test("date picker input renders correctly", () => {
      expect(datePickerInput).toBeInTheDocument();
      expect(datePickerInput.getAttribute("type")).toBe("text"); // Verify input type
    });

    test("time dropdown renders correctly", () => {
      expect(timeDropdown).toBeInTheDocument();
      expect(timeDropdown.tagName).toBe("SELECT"); // Verify element type
    });

    test("submit button renders correctly", () => {
      expect(submitButton).toBeInTheDocument();
      expect(submitButton.tagName).toBe("BUTTON"); // Verify element type
    });
  });
  // no error when page  renders
  describe("no input error when form first renders", () => {
    test("renders without errors", () => {
      // Check that no error messages are present when the form first renders
      const titleError = screen.queryByTestId("title-error");
      const contactError = screen.queryByTestId("contact-error");
      const dateError = screen.queryByTestId("date-error");
      const timeError = screen.queryByTestId("time-error");

      expect(titleError).not.toBeInTheDocument();
      expect(contactError).not.toBeInTheDocument();
      expect(dateError).not.toBeInTheDocument();
      expect(timeError).not.toBeInTheDocument();
    });
  });
  describe("date picker has correct dates avaialble", () => {
    beforeEach(async () => {
      await user.click(datePickerInput);
    });

    test("dates in past disabled", async () => {
      const yesterday = today.getDate() - 1;
      const allDates = screen.getAllByRole("option");
      const filterDates = allDates.filter(
        (option) => option.getAttribute("aria-disabled") === "true"
      );
      const firstDisabedDate = filterDates[filterDates.length - 1];
      expect(firstDisabedDate?.textContent).toBe(yesterday.toString());
    });
    test("first avaiable date for selection is today", async () => {
      const todayNumber = today.getDate();
      const allDates = screen.getAllByRole("option");
      const firstAvailableDate = allDates.find(
        (option) => option.getAttribute("aria-disabled") === "false"
      );
      expect(firstAvailableDate?.textContent).toBe(todayNumber.toString());
    });
  });
  //   componets error if no value submitted
  describe("inputs error if left blank", () => {
    beforeEach(async () => {
      await user.click(submitButton);
    });
    test("title error", async () => {
      // Use findByTestId to wait for the error element to appear
      titleError = await screen.findByTestId("title-error");
      expect(titleError).toBeInTheDocument();
      expect(titleError.textContent).toBe(titleErrorText);
    });
    test("conatct error", async () => {
      contactError = await screen.findByTestId("contacts-error");
      expect(contactError).toBeInTheDocument();
      expect(contactError.textContent).toBe(contactErrorText);
    });
    test("date Error", async () => {
      datePickerError = await screen.findByTestId("date-error");
      expect(datePickerError).toBeInTheDocument();
      expect(datePickerError.textContent).toBe(datePickerErrorText);
    });
    test("time Error", async () => {
      timeDropDownError = await screen.findByTestId("time-error");
      expect(timeDropDownError).toBeInTheDocument();
      expect(timeDropDownError.textContent).toBe(timeErrorText);
    });
  });
  describe("no error when inputs have value", () => {
    beforeEach(async () => {
      await user.click(submitButton);
    });

    test("Title error clears when has value", async () => {
      titleError = await screen.findByTestId("title-error");
      expect(titleError).toBeInTheDocument();
      await user.type(titleInput, "test appointment");
      expect(titleInput).toHaveDisplayValue("test appointment");
    });
    test("Contact error clears when has value", async () => {
      contactError = await screen.findByTestId("contacts-error");
      expect(contactError).toBeInTheDocument();
      await user.selectOptions(contactsDropdown, "contact1");
      expect(contactsDropdown).toHaveDisplayValue("contact 1");
    });
    test("Date error clears when has value", async () => {
      datePickerError = await screen.findByTestId("date-error");
      expect(datePickerError).toBeInTheDocument();
      await fillDatepickerInput();
      expect(datePickerInput).toHaveDisplayValue(formattedDate);
    });
    test("title error clears when has value", async () => {
      timeDropDownError = await screen.findByTestId("time-error");
      expect(timeDropDownError).toBeInTheDocument();
      await user.selectOptions(timeDropdown, "8:30");
      expect(timeDropdown).toHaveDisplayValue("8:30");
    });
  });
  describe("no error on submit when inputs have valid values", () => {
    test("submited values are correct", async () => {
      const validData = {
        contacts: "contact1",
        date: new Date(today.toDateString()),
        time: "9:30",
        title: "test appointment",
      };
      await fillInputs();
      await user.click(submitButton);
      expect(mockSubmit).toBeCalledTimes(1);
      expect(mockSubmit).toBeCalledWith(validData, expect.any(Object));
    });
  });
});
