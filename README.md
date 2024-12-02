# ChatGPT Markdown Downloader Extension

This Chrome extension enhances your ChatGPT experience by enabling you to easily download conversation content as markdown files. It works seamlessly within ChatGPT's interface and provides an intuitive download button for exporting your data.

## Features

- Detects and integrates with the ChatGPT interface dynamically.
- Automatically formats the content to markdown, including code blocks.
- Provides a simple, fixed-position button for quick access to the download functionality.

---

## Installation

You can use this extension in two ways:

### 1. Install from the Prebuilt `dist` Folder

1. Download the latest version of the `dist` folder.
2. Open **Chrome** and go to `chrome://extensions/`.
3. Enable the **Developer Mode** toggle in the top-right corner.
4. Click **Load unpacked** and select the downloaded `dist` folder.
5. The extension will now appear in your list of installed extensions and be ready to use.

---

### 2. Fork and Build from Source Code

1. Clone or fork the GitHub repository:

   ```bash
   git clone https://github.com/Ramnathnaik/chatgpt-markdown-chrome-extension.git
   cd chatgpt-markdown-chrome-extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. The `dist` folder will be generated in the project directory.

5. Open **Chrome** and go to `chrome://extensions/`.
6. Enable the **Developer Mode** toggle in the top-right corner.
7. Click **Load unpacked** and select the generated `dist` folder.
8. The extension will now appear in your list of installed extensions and be ready to use.

---

## How to Use

1. Visit [ChatGPT](https://chat.openai.com).
2. Navigate to any chat conversation. (Go to the chat and refresh the page if you don't see the button.)
3. The **Markdown Download Button** will appear in the bottom-right corner of the screen.
4. Click the button to download the conversation as a `.md` file.

---

## Contributing

If you'd like to contribute to this extension, feel free to open issues or submit pull requests on GitHub. Contributions are always welcome!

---

## Troubleshooting

If you encounter any issues:

1. Ensure you're running the latest version of Chrome.
2. Verify the extension is correctly loaded under `chrome://extensions/`.
3. Open the console (F12) and check for any error messages. If the issue persists, feel free to open an issue in the repository.

---

## Bug Report

There are few bugs associated with this extension. Please report any issues and also feel free to open an issue in the repository. Also would love your contributions on this project!

1. Should see the download button only in chat page.
2. Formatting messes up with nested level code blocks.

---
