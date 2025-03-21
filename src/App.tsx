import React, { useState } from "react";
import WysiwygEditor, { ToolbarProps } from "./components/WYSIWYGEditor"; // تصحيح الاستيراد إلى ToolbarProps
import TextPreview from "./components/TextPreview";
import { EditorState, ContentState, RichUtils } from "draft-js";

const App: React.FC = () => {
  const [controlledState, setControlledState] = useState(() =>
    EditorState.createEmpty()
  );

  // تعريف CustomToolbar مع النوع الصحيح
  const CustomToolbar = ({ editorState, setEditorState }: ToolbarProps) => {
    const toggleStyle = (style: string) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };
    const currentStyle = editorState.getCurrentInlineStyle();
  
    const focusEditor = () => {
      const editor = document.querySelector(".DraftEditor-root") as HTMLElement;
      if (editor) editor.focus();
    };
  
    return (
      <div className="flex gap-3 p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-lg">
        <button
          onClick={() => {
            focusEditor();
            toggleStyle("BOLD");
          }}
          className={`px-4 py-2 text-white rounded-full ${
            currentStyle.has("BOLD") ? "bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          B
        </button>
        <button
          onClick={() => {
            focusEditor();
            toggleStyle("ITALIC");
          }}
          className={`px-4 py-2 text-white rounded-full ${
            currentStyle.has("ITALIC") ? "bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          I
        </button>
        <button
          onClick={() => {
            focusEditor();
            toggleStyle("UNDERLINE");
          }}
          className={`px-4 py-2 text-white rounded-full ${
            currentStyle.has("UNDERLINE") ? "bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          U
        </button>
      </div>
    );
  };

  // محاكاة تحميل محتوى غير متزامن
  const loadAsyncContent = () => {
    setTimeout(() => {
      const content = ContentState.createFromText("Sample content loaded async!");
      setControlledState(EditorState.createWithContent(content));
      console.log("Content loaded asynchronously:", "Sample content loaded async!");
    }, 1000);
  };

  // محاكاة إرسال المحتوى إلى API وهمية
  const saveAsyncContent = () => {
    const content = controlledState.getCurrentContent().getPlainText();
    setTimeout(() => {
      console.log("Content sent to fake API:", content);
      alert("Content saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">WYSIWYG Editor Demo</h1>

      {/* الوضع المُتحكم */}
      <h2 className="text-xl font-semibold mb-2">Controlled Mode</h2>
      <WysiwygEditor value={controlledState} onChange={setControlledState} />
      <div className="mt-4 flex gap-4">
        <button
          onClick={loadAsyncContent}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Load Async Content
        </button>
        <button
          onClick={saveAsyncContent}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Async
        </button>
      </div>

      {/* عرض النص في واجهة المستخدم */}
      <TextPreview editorState={controlledState} />

      {/* الوضع الغير مُتحكم */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Uncontrolled Mode</h2>
      <WysiwygEditor />

      {/* الوضع مع شريط أدوات مخصص */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Custom Toolbar</h2>
      <WysiwygEditor renderToolbar={CustomToolbar} />
    </div>
  );
};

export default App;