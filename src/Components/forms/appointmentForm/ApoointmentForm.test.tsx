import { fireEvent, render, screen } from "@testing-library/react";
import AppointmentForm from "./AppointmentForm";
import { MemoryRouter } from "react-router-dom";

const pageToTest = (
  <MemoryRouter>
    <AppointmentForm />
  </MemoryRouter>
);
const getSuffix = (dayNumber: number): string | undefined => {
  if (dayNumber >= 11 && dayNumber < 13) return "th";
  switch (dayNumber % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
  }
};

describe("Appointment Form Component", () => {
  test("renders without crashing", () => {
    render(pageToTest);
  });
  // test it has correct header
  test("it has correct header", () => {
    render(pageToTest);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("Book appointment");
  });

  //   test placeholders on all inputs
  test("all inputs have placeholder", () => {
    render(pageToTest);
    // test title input place holder
    const titleInput = screen.getByLabelText("title");
    expect(titleInput).toHaveAttribute(
      "placeholder",
      "Enter appointment title"
    );

    // test date picker input placeHolder
    const DatePickerDefault = screen.getByLabelText("Select an available date");
    expect(DatePickerDefault).toHaveAttribute("placeholder", "Select date");

    // contacts options placeholder
    expect(screen.getByRole("option", { name: "please select a contact" }));
    // time options placeholder
    expect(screen.getByRole("option", { name: "available times" }));
  });

  test("date picker does not allow selecting yesterday's date", () => {
    render(pageToTest);

    // Open the date picker
    const dateInput = screen.getByPlaceholderText(/Select date/);
    fireEvent.click(dateInput);

    // Calculate yesterday's date dynamically
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dayNumber = yesterday.getDate();
    const suffix = getSuffix(dayNumber);
    const month = yesterday.toLocaleDateString("en-GB", { month: "long" });
    const day = yesterday.toLocaleDateString("en-GB", { weekday: "long" });
    const year = yesterday.getFullYear();
    const formattedYesterday = `Not available ${day}, ${month} ${dayNumber}${suffix}, ${year}`;
    // Verify that yesterday's date is disabled
    const yesterdayOption = screen.getByLabelText(formattedYesterday);
    expect(yesterdayOption).toHaveAttribute("aria-disabled", "true");
  });

  //   test no error if inputs have value
});
