import React from "react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

interface TextPreviewProps {
  editorState: EditorState; // تغيير النوع ليقبل EditorState
}

const TextPreview: React.FC<TextPreviewProps> = ({ editorState }) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const htmlContent = draftToHtml(rawContentState);

  return (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Preview:</h3>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default TextPreview;