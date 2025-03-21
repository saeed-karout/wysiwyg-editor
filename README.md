# WYSIWYG Editor with Draft.js

This project is a **WYSIWYG (What You See Is What You Get)** editor built using **React** and **Draft.js**. It supports both **controlled** and **uncontrolled** modes, and includes a customizable toolbar for formatting text (bold, italic, underline). The project also demonstrates how to simulate asynchronous behavior, such as loading content and saving it to a fake API.

---

## Features

- **Controlled Mode**: Manage the editor's state externally using React's `useState`.
- **Uncontrolled Mode**: Let the editor manage its own internal state.
- **Customizable Toolbar**: Easily extend or replace the toolbar using the `renderToolbar` prop.
- **Asynchronous Behavior**:
  - Simulate loading content asynchronously.
  - Simulate saving content to a fake API.
- **Text Preview**: Display the current editor content in a preview section.

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Draft.js**: A framework for building rich text editors.
- **TypeScript**: Adds static typing to JavaScript for better code quality.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vite**: A fast build tool for modern web development.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/wysiwyg-editor.git

   Navigate to the project directory:

2. **cd wysiwyg-editor**
Install dependencies:


3. **npm install**
Run the development server:


4. **npm run dev**

5. Open the app in your browser:
Visit http://localhost:3000 to see the editor in action.

 Usage
**Controlled Mode**
In controlled mode, the editor's state is managed externally using React's useState. This allows you to control the editor's content and respond to changes.  

const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

<WysiwygEditor value={editorState} onChange={setEditorState} />

**Uncontrolled Mode**
In uncontrolled mode, the editor manages its own internal state. This is useful for simpler use cases where you don't need to control the editor's content externally.


**Custom Toolbar**
You can customize the toolbar by passing a renderToolbar prop to the WysiwygEditor component.

const CustomToolbar = ({ editorState, setEditorState }) => (
  <div>
    <button onClick={() => setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))}>Bold</button>
  </div>
);

<WysiwygEditor renderToolbar={CustomToolbar} />



**Asynchronous Behavior**
The project includes two examples of asynchronous behavior:

Loading Content: Simulates loading content into the editor after a delay.

Saving Content: Simulates saving the editor's content to a fake API.


const loadAsyncContent = () => {
  setTimeout(() => {
    const content = ContentState.createFromText("Sample content loaded async!");
    setEditorState(EditorState.createWithContent(content));
  }, 1000);
};

const saveAsyncContent = () => {
  const content = editorState.getCurrentContent().getPlainText();
  setTimeout(() => {
    console.log("Content sent to fake API:", content);
    alert("Content saved successfully!");
  }, 1000);
};


**Project Structure**

wysiwyg-editor/
├── src/
│   ├── components/
│   │   ├── WYSIWYGEditor.tsx       # Main editor component
│   │   ├── TextPreview.tsx         # Component to preview editor content
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Entry point
├── public/                         # Static assets
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.cjs                 # Jest configuration
├── README.md                       # Project documentation


**Running Tests**
To run the unit tests, use the following command:

npm test


Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes.

Push your branch and open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Draft.js for providing a powerful framework for building rich text editors.

React for making it easy to build interactive UIs.

Vite for a fast and modern development experience.



Contact
If you have any questions or feedback, feel free to reach out:

Email: mohamadsaeedkarout@gmail.com
