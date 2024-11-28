import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppointmentForm from "./AppointmentForm";

import { MemoryRouter } from "react-router-dom";
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
    // filter option to find first date with aria-disable = false thsi indicates the date is slectable
    const firstSelectableDate = filteredDatePickerOptions.find(
      (option) => option.getAttribute("aria-disabled") === "false"
    );
    // first selectable date should equal todays date
    expect(firstSelectableDate?.textContent).toBe(dateAsNumber.toString());
  });

  test("date before today not to be selectable", () => {
    // filter options in reverse to find first aria-disabled = true this indactes date is not selectable
    const lastDisabledOption = filteredDatePickerOptions
      .reverse()
      .find((option) => option.getAttribute("aria-disabled") === "true");
    // check last date unselectable is yesterday
    expect(lastDisabledOption?.textContent).toBe((dateAsNumber - 1).toString());
  });

  test("when selected, the correct date is placed in the date picker input box", async () => {
    const user = userEvent.setup();

    // Get the selectable date element
    const selectableDate = screen.getByText(dateAsNumber.toString(), {
      selector: "[aria-disabled='false']",
    });

    // Simulate user opening the date picker
    await user.click(datePickerTrigger);

    // Format today's date to match the expected display format
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");

    // Simulate selecting today's date
    await user.click(selectableDate);

    // Assert the input displays the correct date
    expect(datePickerTrigger).toHaveValue(formattedDate);
  });
});
