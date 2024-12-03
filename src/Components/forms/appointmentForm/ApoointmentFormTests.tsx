import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppointmentForm from "./AppointmentForm";

const pageToTest = (
  <MemoryRouter>
    <AppointmentForm />
  </MemoryRouter>
);

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
    const titleInput = screen.getByLabelText("Title");
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

  test("inputs error if blank", async () => {
    render(pageToTest);
    // find submmit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // Fire the submit event without filling out any fields
    fireEvent.click(submitButton);
    // wait and check for error message
    await waitFor(() => {
      const titleError = screen.getByTestId("title-error");
      expect(titleError.textContent).toBe("title is required");

      const contactsError = screen.getByTestId("contacts-error");
      expect(contactsError.textContent).toBe("contacts is required");

      const dateError = screen.getByTestId("date-error");
      expect(dateError.textContent).toBe("please select available date");

      const timeError = screen.getByTestId("time-error");
      expect(timeError.textContent).toBe("time is required");
    });
  });

  //   test no error when inputs have value

  test("no errors when inputs have value", async () => {
    render(pageToTest);
    const titleInput = screen.getByPlaceholderText("Enter appointment title");
    // title input has value
    fireEvent.change(titleInput, { target: { value: "test" } });
    expect(titleInput).toHaveValue("test");
    //

    const contactSelect = screen.getByLabelText("Options");
    fireEvent.click(contactSelect);
    fireEvent.change(contactSelect, { target: { value: "contact1" } });
    expect(contactSelect).toHaveValue("contact1");

    // Simulate selection
    const timeSelect = screen.getByLabelText("Select a time");
    fireEvent.change(timeSelect, { target: { value: "8:30" } });
    expect(timeSelect).toHaveValue("8:30");
  });
});
