import {
  PDFDocumentProxy,
  TextItem,
  TextMarkedContent,
} from "pdfjs-dist/types/src/display/api";

const convertFileToDocument = (file: string) => {
  const BASE64_MARKER = ";base64,";
  const base64File = file.substring(
    file.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  );

  const raw = window.atob(base64File);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

// Loaded via <script> tag, create shortcut to access PDF.js exports.
// @ts-ignore
var pdfjsLib = window["pdfjs-dist/build/pdf"];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

const isTextItem = (item: TextItem | TextMarkedContent): item is TextItem =>
  Boolean(item && (item as TextItem).str);
const isDefined = <T>(value: T | undefined): value is T => Boolean(value);

const getPageContent = async (
  pdf: PDFDocumentProxy,
  pageNumber: number
): Promise<Array<string>> => {
  console.log(pageNumber);
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  return textContent.items
    .map((item) => (isTextItem(item) ? item.str : undefined))
    .filter(isDefined);
};

type ResolveFn = (value: Array<string>) => void;
type RejectFn = (reason?: unknown) => void;
const parsePdf =
  (resolve: ResolveFn, reject: RejectFn) =>
  async (event: ProgressEvent<FileReader>) => {
    if (event.target?.result) {
      if (typeof event.target.result === "string") {
        const pdf = (await pdfjsLib.getDocument(
          convertFileToDocument(event.target.result)
        ).promise) as PDFDocumentProxy;

        const textContent = await Promise.all(
          [...Array(pdf.numPages).keys()].map((v, i) =>
            getPageContent(pdf, i + 1)
          )
        );

        resolve(textContent.flat());
      } else {
        reject("Array buffer is not supported");
      }
    } else {
      reject("Event has no result");
    }
  };

export const readPdf = async (file: File): Promise<Array<string>> => {
  return new Promise<Array<string>>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = parsePdf(resolve, reject);
  });
};
