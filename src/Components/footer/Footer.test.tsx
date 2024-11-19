import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test("displays the current year", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Contact Manager`)
    ).toBeInTheDocument();
  });

  test("contains links with correct text and URLs", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const aboutLink = screen.getByRole("link", { name: /about/i });
    const privacyLink = screen.getByRole("link", { name: /privacy/i });
    const termsLink = screen.getByRole("link", { name: /terms/i });

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(privacyLink).toHaveAttribute("href", "/privacy");
    expect(termsLink).toHaveAttribute("href", "/terms");
  });
});
