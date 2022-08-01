import React, { ChangeEvent, FC } from "react";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { readPdf } from "./utils/pdf-reader";

const App: FC = () => {
  const handleFileOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("file selected");
    const file = event.target.files?.item(0);
    if (file) {
      const content = await readPdf(file);
      console.log(content);
    }
  };

  return (
    <main>
      <h1>Hello World</h1>
      <input type="file" onChange={handleFileOnChange} />
    </main>
  );
};

export default App;
