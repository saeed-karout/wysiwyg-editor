import React, { useState, useRef, useCallback, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export interface WysiwygEditorProps {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  className?: string;
  style?: React.CSSProperties;
  renderToolbar?: (props: ToolbarProps) => React.ReactNode;
}

export interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = React.memo(({
  value,
  onChange,
  className = "",
  style,
  renderToolbar,
}) => {
  const [internalState, setInternalState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef<Editor>(null);

  const isControlled = value !== undefined && onChange !== undefined;
  const editorState = isControlled ? value : internalState;
  const setEditorState = isControlled ? onChange : setInternalState;

  const handleEditorChange = useCallback((newState: EditorState) => {
    setEditorState(newState);
  }, [setEditorState]);

  const toggleInlineStyle = useCallback((style: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    handleEditorChange(newState);
  }, [editorState, handleEditorChange]);

  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  useEffect(() => {
    focusEditor();
  }, [focusEditor]);

  const DefaultToolbar: React.FC<ToolbarProps> = React.memo(({ editorState }) => {
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div className="flex gap-2 p-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
        <button
          type="button"
          onClick={() => {
            focusEditor();
            toggleInlineStyle("BOLD");
          }}
          className={`px-3 py-1 rounded ${
            currentStyle.has("BOLD")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => {
            focusEditor();
            toggleInlineStyle("ITALIC");
          }}
          className={`px-3 py-1 rounded ${
            currentStyle.has("ITALIC")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => {
            focusEditor();
            toggleInlineStyle("UNDERLINE");
          }}
          className={`px-3 py-1 rounded ${
            currentStyle.has("UNDERLINE")
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          Underline
        </button>
      </div>
    );
  });

  return (
    <div
      className={`border border-gray-300 rounded-lg shadow-sm ${className}`}
      style={style}
    >
      {renderToolbar ? (
        renderToolbar({ editorState, setEditorState: handleEditorChange })
      ) : (
        <DefaultToolbar editorState={editorState} setEditorState={handleEditorChange} />
      )}
      <div className="p-4 min-h-[200px] focus:outline-none">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );
});

export default WysiwygEditor;