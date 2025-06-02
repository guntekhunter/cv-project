import { useEffect, useRef, useState } from "react";

export default function PdfViewer({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait until dynamic content is rendered
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100); // wait briefly to ensure React renders children
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const content = contentRef.current;
    const container = document.getElementById("document");

    if (!content || !container) return;

    container.innerHTML = "";

    const pageHeight = 640;
    const pageWidth = 400;

    const contentClone = content.cloneNode(true) as HTMLElement;
    contentClone.style.position = "absolute";
    contentClone.style.visibility = "hidden";
    contentClone.style.width = `${pageWidth}px`;
    contentClone.style.height = "auto";
    contentClone.style.maxHeight = "none";

    document.body.appendChild(contentClone);

    let currentPage = createPage();
    container.appendChild(currentPage);
    let currentHeight = 0;

    const childrenArray = Array.from(contentClone.children);

    for (const child of childrenArray) {
      const clone = child.cloneNode(true) as HTMLElement;
      currentPage.appendChild(clone);

      const addedHeight = currentPage.offsetHeight;

      if (addedHeight > pageHeight) {
        currentPage.removeChild(clone);
        currentPage = createPage();
        container.appendChild(currentPage);
        currentPage.appendChild(clone);
      }
    }

    contentClone.remove();

    function createPage() {
      const div = document.createElement("div");
      div.className =
        "page bg-white w-[25rem] h-[40rem] overflow-hidden shadow-md mb-[2rem] p-[2rem]";
      return div;
    }
  }, [isReady]);

  return (
    <div className="flex flex-col items-center">
      <div id="document" />
      <div id="content-to-split" ref={contentRef} className="hidden w-[25rem]">
        {children}
      </div>
    </div>
  );
}
