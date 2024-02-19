import { render, screen } from "@testing-library/react";
import Register from './register';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from "@testing-library/user-event"

describe("Register component", async () => {

    it("should render Register component correctly", () => {
        render(<Router>
            <Register />
        </Router>,);
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });
});
it("should show error message when all the fields are not entered", async () => {
    render(<Router>
        <Register />
    </Router>,);
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
});
it("should show success message when the registration is successful.", async () => {
    render(<Router>
        <Register />
    </Router>,);
    const buttonElement = screen.getByRole("button");
    await userEvent.click(buttonElement);
    const alertElement = screen.getByRole("img");
    expect(alertElement).toBeInTheDocument();
});