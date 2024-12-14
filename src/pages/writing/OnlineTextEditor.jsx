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
} from "verbum";
import { Helmet } from "react-helmet-async";

function OnlineTextEditor() {
  const [text, setText] = useState("");
  const [savedText, setSavedText] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  return (
    <>
      <Helmet>
        <title>Online Text Editor | OptiSEO</title>
        <meta
          name="description"
          content="Use OptiSEO's Online Text Editor to write and edit content easily. Create, edit, and optimize your text for SEO-friendly results in real-time."
        />
        <link
          rel="canonical"
          href="https://optiseo.vercel.app/online-text-editor"
        />
        <meta
          name="keywords"
          content="online text editor, SEO tools, content writing, text editor, writing tool"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shubhadip Bhowmik" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Online Text Editor | OptiSEO" />
        <meta
          property="og:description"
          content="Create and edit content with ease using OptiSEO's Online Text Editor. Improve your writing and optimize it for SEO in real-time."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://optiseo.vercel.app/online-text-editor"
        />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Online Text Editor | OptiSEO" />
        <meta
          name="twitter:description"
          content="Write and edit content effortlessly with OptiSEO's Online Text Editor. Optimize your content for better SEO ranking."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/shubhadipbhowmik/image/upload/v1734183277/optiseo/metadata/optiseo.png"
        />
        <meta name="twitter:site" content="https://x.com/myselfshubhadip" />

        {/* Favicon */}
        <link rel="icon" href="https://optiseo.vercel.app/favicon.ico" />
      </Helmet>

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
    </>
  );
}

export default OnlineTextEditor;
