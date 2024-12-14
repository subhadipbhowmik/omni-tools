import React, { useState } from "react";
import { Save, Edit } from "lucide-react";
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from "verbum"; // Named imports

function OnlineTextEditor() {
  const [text, setText] = useState("");
  const [savedText, setSavedText] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gradient">
            Online Text Editor
          </h1>
        </header>

        {/* Verbum Text Editor */}
        {isEditing ? (
          <EditorComposer>
            <Editor hashtagsEnabled={true}>
              <ToolbarPlugin className="bg-gray-800" defaultFontSize="20px">
                <FontFamilyDropdown />
                <FontSizeDropdown />
                <Divider />
                <BoldButton />
                <ItalicButton />
                <UnderlineButton />
                <CodeFormatButton />
                <InsertLinkButton />
                <TextFormatDropdown />
                <Divider />
                <InsertDropdown enablePoll={true} enableYoutube={true} />
                <Divider />
                <AlignDropdown />
              </ToolbarPlugin>
            </Editor>
          </EditorComposer>
        ) : (
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-gray-300">{savedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineTextEditor;
