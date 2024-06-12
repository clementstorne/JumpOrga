import Navbar from "@/components/Navbar";
import { LINKS } from "@/lib/const";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  it("renders the Navbar component", () => {
    render(<Navbar />);
    const logo = screen.getByAltText("JumpOrga");
    expect(logo).toBeInTheDocument();

    const brandName = screen.getByText("JumpOrga");
    expect(brandName).toBeInTheDocument();

    const burgerButton = screen.getByLabelText("Ouvrir le menu");
    expect(burgerButton).toBeInTheDocument();

    const expectedLinks = LINKS;
    expectedLinks.forEach((link) => {
      const renderedLinks = screen.getAllByText(link.label);
      expect(renderedLinks).toHaveLength(2);
    });
  });

  it("toggles the menu when the burger button is clicked", () => {
    render(<Navbar />);
    const burgerButton = screen.getByLabelText("Ouvrir le menu");
    const drawer = screen.getByTestId("drawer");

    // Initially, the menu should be closed
    expect(drawer).toHaveClass("-translate-x-full");

    // Click the burger button to open the menu
    fireEvent.click(burgerButton);
    expect(drawer).toHaveClass("translate-x-0");

    // Click the burger button again to close the menu
    fireEvent.click(burgerButton);
    expect(drawer).toHaveClass("-translate-x-full");
  });

  it("closes the menu when the Escape key is pressed", () => {
    render(<Navbar />);
    const burgerButton = screen.getByLabelText("Ouvrir le menu");
    const drawer = screen.getByTestId("drawer");

    // Open the menu
    fireEvent.click(burgerButton);
    expect(drawer).toHaveClass("translate-x-0");

    // Press the Escape key to close the menu
    fireEvent.keyDown(document, { key: "Escape" });
    expect(drawer).toHaveClass("-translate-x-full");
  });

  it("closes the menu when the route changes", () => {
    const { rerender } = render(<Navbar />);
    const burgerButton = screen.getByLabelText("Ouvrir le menu");
    const drawer = screen.getByTestId("drawer");

    // Open the menu
    fireEvent.click(burgerButton);
    expect(drawer).toHaveClass("translate-x-0");

    // Change the route
    usePathname.mockReturnValue("/new-route");
    rerender(<Navbar />);
    expect(drawer).toHaveClass("-translate-x-full");
  });
});
