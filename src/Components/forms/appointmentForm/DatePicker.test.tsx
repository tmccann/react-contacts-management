import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";

const pageToTest = (
  <MemoryRouter>
    <AppointmentForm />
  </MemoryRouter>
);

describe("test date Picker functions correctly", () => {
  // setup shared vairables

  let datePickerTrigger: HTMLElement;
  let dateAsNumber: number;
  let allOptions: HTMLElement[];
  let filteredDatePickerOptions: HTMLElement[];
  beforeEach(() => {
    render(pageToTest);
    // click date picker input to activate options
    datePickerTrigger = screen.getByPlaceholderText(/Select date/i);
    fireEvent.click(datePickerTrigger);

    dateAsNumber = new Date().getDate();
    // get all option on page
    allOptions = screen.getAllByRole("option");
    // filter option so all unrelated to fate picker are removed
    filteredDatePickerOptions = allOptions.filter((option) =>
      option.className.includes("react-datepicker")
    );
  });

  test("setup intializes vairable correctly ", () => {
    expect(dateAsNumber).toBe(new Date().getDate());

    // Verify all options are fetched
    expect(allOptions).not.toBeNull();
    expect(allOptions.length).toBeGreaterThan(0);

    expect(filteredDatePickerOptions).not.toBeNull();
    expect(filteredDatePickerOptions.length).toBeGreaterThan(0);
  });

  test("date picker first selectedable value to equal today", () => {
    const firstSelectableDate = filteredDatePickerOptions.find(
      (option) => option.getAttribute("aria-disabled") === "false"
    );
    expect(firstSelectableDate?.textContent).toBe(dateAsNumber.toString());
  });

  test("date before today not to be selectable", () => {
    const lastDisabledOption = filteredDatePickerOptions
      .reverse()
      .find((option) => option.getAttribute("aria-disabled") === "true");

    expect(lastDisabledOption?.textContent).toBe((dateAsNumber - 1).toString());
  });

  test("when selected correct date is place in react datePicker input box", async () => {
    const selectableDate = screen.getByText(dateAsNumber.toString());

    fireEvent.click(datePickerTrigger);
    const today = new Date().toLocaleDateString("en-GB");
    fireEvent.click(selectableDate);
    expect(datePickerTrigger).toHaveValue(today);
  });
});
