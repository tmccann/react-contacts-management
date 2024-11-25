import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  test("date before to day not to be selectable", () => {
    const lastDisabledOption = filteredDatePickerOptions
      .reverse()
      .find((option) => option.getAttribute("aria-disabled") === "true");

    expect(lastDisabledOption?.textContent).toBe((dateAsNumber - 1).toString());
  });

  test("when selected correct date is place in react datePicker input box", async () => {
    const selectableDate = screen.getByText(dateAsNumber.toString());
    const datepickerInputValue = screen.getByPlaceholderText("Select date");
  });
});

// ********************** original stupid test *********************
// test("past dates are disabled ", () => {
//   const getSuffix = (dayNumber: number): string | undefined => {
//     if (dayNumber >= 11 && dayNumber < 13) return "th";
//     switch (dayNumber % 10) {
//       case 1:
//         return "st";
//       case 2:
//         return "nd";
//       case 3:
//         return "rd";
//       default:
//         return "th";
//     }
//   };
//   // Open the date picker
//   const dateInput = screen.getByPlaceholderText(/Select date/);
//   fireEvent.click(dateInput);

//   // Calculate yesterday's date dynamically
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   const dayNumber = yesterday.getDate();
//   const suffix = getSuffix(dayNumber);
//   const month = yesterday.toLocaleDateString("en-GB", { month: "long" });
//   const day = yesterday.toLocaleDateString("en-GB", { weekday: "long" });
//   const year = yesterday.getFullYear();
//   const formattedYesterday = `Not available ${day}, ${month} ${dayNumber}${suffix}, ${year}`;
//   console.log(formattedYesterday);
//   // Verify that yesterday's date is disabled
//   const yesterdayOption = screen.queryByLabelText(formattedYesterday);

//   expect(yesterdayOption).toHaveAttribute("aria-disabled", "true");
// });
// ******************************************************************************
//   // verify todays date is enabled
//   test("check the first avaible date selection is equal to todays date", () => {
//     render(pageToTest);

//     // Open the datepicker
//     const dateInput = screen.getByPlaceholderText(/Select date/);
//     fireEvent.click(dateInput);

//     console.log(datepickerOptions);
//     const lastDisabledOption = [...allOptions]
//       .reverse()
//       .find((option) => option.getAttribute("aria-disabled") === "true");

//     // Find the first enabled option
//     const firstEnabledOption = allOptions.find(
//       (option) => option.getAttribute("aria-disabled") === "false"
//     );
//     expect(lastDisabledOption?.textContent).toBe(
//       (Number(dayNumber) - 1).toString()
//     );
//     // Assert the first enabled option matches today's date
//     expect(firstEnabledOption?.textContent).toBe(dayNumber);
//   });
// });

// ********************** original stupid test *********************
// test("past dates are disabled ", () => {
//   const getSuffix = (dayNumber: number): string | undefined => {
//     if (dayNumber >= 11 && dayNumber < 13) return "th";
//     switch (dayNumber % 10) {
//       case 1:
//         return "st";
//       case 2:
//         return "nd";
//       case 3:
//         return "rd";
//       default:
//         return "th";
//     }
//   };
//   // Open the date picker
//   const dateInput = screen.getByPlaceholderText(/Select date/);
//   fireEvent.click(dateInput);

//   // Calculate yesterday's date dynamically
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   const dayNumber = yesterday.getDate();
//   const suffix = getSuffix(dayNumber);
//   const month = yesterday.toLocaleDateString("en-GB", { month: "long" });
//   const day = yesterday.toLocaleDateString("en-GB", { weekday: "long" });
//   const year = yesterday.getFullYear();
//   const formattedYesterday = `Not available ${day}, ${month} ${dayNumber}${suffix}, ${year}`;
//   console.log(formattedYesterday);
//   // Verify that yesterday's date is disabled
//   const yesterdayOption = screen.queryByLabelText(formattedYesterday);

//   expect(yesterdayOption).toHaveAttribute("aria-disabled", "true");
// });
// ******************************************************************************
//   // verify todays date is enabled
//   test("check the first avaible date selection is equal to todays date", () => {
//     render(pageToTest);

//     // Open the datepicker
//     const dateInput = screen.getByPlaceholderText(/Select date/);
//     fireEvent.click(dateInput);

//     console.log(datepickerOptions);
//     const lastDisabledOption = [...allOptions]
//       .reverse()
//       .find((option) => option.getAttribute("aria-disabled") === "true");

//     // Find the first enabled option
//     const firstEnabledOption = allOptions.find(
//       (option) => option.getAttribute("aria-disabled") === "false"
//     );
//     expect(lastDisabledOption?.textContent).toBe(
//       (Number(dayNumber) - 1).toString()
//     );
//     // Assert the first enabled option matches today's date
//     expect(firstEnabledOption?.textContent).toBe(dayNumber);
//   });
// });
