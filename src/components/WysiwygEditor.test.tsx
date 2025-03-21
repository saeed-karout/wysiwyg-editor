
import { render, fireEvent, screen } from "@testing-library/react";
import WysiwygEditor from "./WYSIWYGEditor";
import { EditorState } from "draft-js";

describe("WysiwygEditor", () => {
  it("renders without crashing", () => {
    render(<WysiwygEditor />);
    expect(screen.getByPlaceholderText("Start typing here...")).toBeInTheDocument();
  });

  it("works in controlled mode", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <WysiwygEditor value={EditorState.createEmpty()} onChange={onChange} />
    );

    const editor = getByPlaceholderText("Start typing here...");
    fireEvent.change(editor, { target: { textContent: "Hello, World!" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("works in uncontrolled mode", () => {
    const { getByPlaceholderText } = render(<WysiwygEditor />);

    const editor = getByPlaceholderText("Start typing here...");
    fireEvent.change(editor, { target: { textContent: "Hello, World!" } });

    expect(editor.textContent).toBe("Hello, World!");
  });

  it("toggles bold style when bold button is clicked", () => {
    render(<WysiwygEditor />);

    const boldButton = screen.getByText("Bold");
    fireEvent.click(boldButton);

    const editor = screen.getByPlaceholderText("Start typing here...");
    expect(editor).toHaveStyle("font-weight: bold");
  });

  it("toggles italic style when italic button is clicked", () => {
    render(<WysiwygEditor />);

    const italicButton = screen.getByText("Italic");
    fireEvent.click(italicButton);

    const editor = screen.getByPlaceholderText("Start typing here...");
    expect(editor).toHaveStyle("font-style: italic");
  });

  it("toggles underline style when underline button is clicked", () => {
    render(<WysiwygEditor />);

    const underlineButton = screen.getByText("Underline");
    fireEvent.click(underlineButton);

    const editor = screen.getByPlaceholderText("Start typing here...");
    expect(editor).toHaveStyle("text-decoration: underline");
  });

  it("renders custom toolbar when provided", () => {
    const CustomToolbar = () => <div>Custom Toolbar</div>;
    render(<WysiwygEditor renderToolbar={CustomToolbar} />);

    expect(screen.getByText("Custom Toolbar")).toBeInTheDocument();
  });

  it("applies custom className and style", () => {
    const { container } = render(
      <WysiwygEditor className="custom-class" style={{ backgroundColor: "red" }} />
    );

    const editorContainer = container.firstChild;
    expect(editorContainer).toHaveClass("custom-class");
    expect(editorContainer).toHaveStyle("background-color: red");
  });
});