import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

describe("NavBar component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  test("contains links with correct text and URLs", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const contactsLink = screen.getByRole("link", { name: /contacts/i });
    const appointmentsLink = screen.getByRole("link", {
      name: /appointments/i,
    });

    expect(contactsLink).toHaveAttribute("href", "/contacts");
    expect(appointmentsLink).toHaveAttribute("href", "/appointments");
  });
});
