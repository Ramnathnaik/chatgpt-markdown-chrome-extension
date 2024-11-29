import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "../components/ui/button";
import { ArrowBigDownDash } from "lucide-react";
import TurndownService from "turndown";

const ContentPage: React.FC = () => {
  const turndownService = new TurndownService();

  // function replaceCopyCodeBlocks(content: string) {
  //   return content.replace(
  //     /(\b\w+\b)\s+Copy code\s+`([\s\S]*?)`/g,
  //     (_, language, codeBlock) => {
  //       // Clean up and format the code block
  //       const formattedCodeBlock = codeBlock
  //         .trim() // Remove leading/trailing spaces
  //         .replace(/;\s*/g, ";\n") // Add newlines after semicolons
  //         .replace(/{\s*/g, "{\n") // Add a newline after opening braces
  //         .replace(/}\s*/g, "\n}"); // Add a newline after closing braces
  //       // .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
  //       // .replace(/\n\s+/g, "\n"); // Trim extra spaces after newlines

  //       return `\`\`\`${language}\n${formattedCodeBlock}\n\`\`\``;
  //     }
  //   );
  // }

  const downloadMarkdown = () => {
    const articles = document.querySelectorAll("article");

    const markdownContent = Array.from(articles)
      .map((article) => {
        const youSaid =
          article.querySelector(".whitespace-pre-wrap")?.textContent || "";
        if (youSaid) {
          return `${youSaid}\n\n`;
        }
        const children = (article?.querySelector(".markdown") as HTMLElement)
          .children;

        if (!children) return "";

        const mardownArray = [];

        for (const child of children) {
          if (child.tagName === "PRE") {
            const language = child?.firstChild?.firstChild?.textContent;
            const code = child?.querySelector("code")?.textContent;
            if (code) {
              mardownArray.push(`\`\`\`${language}\n${code}\n\`\`\`\n`);
            }
          } else {
            console.log(child);
            let markdown = "\n\n";

            if (child.tagName === "H3") {
              markdown = turndownService.turndown(child as HTMLElement);
              markdown = `### ${markdown}`;
            } else if (child.tagName === "UL" || child.tagName === "OL") {
              const items = child.querySelectorAll("li");
              for (const item of items) {
                const itemChildren = item.children;
                for (const itemChild of itemChildren) {
                  if (itemChild.tagName === "PRE") {
                    const language =
                      itemChild?.firstChild?.firstChild?.textContent;
                    const code = itemChild?.querySelector("code")?.textContent;
                    if (code) {
                      markdown += `\`\`\`${language}\n${code}\n\`\`\`\n`;
                    }
                  } else {
                    markdown += turndownService.turndown(
                      itemChild as HTMLElement
                    );
                  }
                }
              }
            } else {
              markdown = turndownService.turndown(child as HTMLElement);
            }
            // const formattedMarkdown = replaceCopyCodeBlocks(markdown);
            if (markdown) {
              mardownArray.push(`${markdown}\n\n`);
            }
          }
        }

        if (mardownArray.length > 0) {
          return mardownArray.join("");
        }

        // const markdown = turndownService.turndown(chatgptSaid);
        // const formattedMarkdown = replaceCopyCodeBlocks(markdown);
        // if (formattedMarkdown) {
        //   return `${formattedMarkdown}\n`;
        // }
        return ""; // Return an empty string instead of undefined
      })
      .filter(Boolean); // Filter out empty strings

    const blob = new Blob([markdownContent.join("")], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "markdown-content.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  //write a function to get all the dom element with the tag name "article"
  //and then map through them and get the innerHTML

  useEffect(() => {
    // Function to inject the JSX structure
    const injectContent = () => {
      // Check if the container is already injected
      if (document.querySelector("#custom-container")) return;

      // Create a wrapper element to mount React content
      const container = document.createElement("div");
      container.id = "custom-container";
      container.style.position = "fixed";
      container.style.bottom = "30px";
      container.style.right = "30px";
      container.style.zIndex = "9999";

      // Append the container to the body
      document.body.appendChild(container);

      // Mount the React component in the container
      ReactDOM.render(
        <div className="dark z-50">
          <div className="flex justify-end">
            <Button size={"icon"} onClick={() => downloadMarkdown()}>
              <ArrowBigDownDash />
            </Button>
          </div>
        </div>,
        container
      );
    };

    // Inject the content initially
    injectContent();

    // Observe DOM changes and re-inject the content if removed
    const observer = new MutationObserver(() => {
      injectContent();
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true, // Monitor direct children
      subtree: true, // Monitor all descendants
    });

    // Cleanup observer and remove the injected container when the component is unmounted
    return () => {
      observer.disconnect();
      const container = document.querySelector("#custom-container");
      if (container) {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
      }
    };
  }, []);

  return null; // This component does not render anything directly
};

export default ContentPage;
