// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 400, width: 300 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // Update selected nodes content with the text clicked in the UI
  if (msg.type === 'update-nodes') {
    const nodes = figma.currentPage.selection;
    nodes.forEach((node) => {
      console.log({ node });

      // If the selected node is a text node, copy the payload text to it
      if (isTextNode(node) && msg.text) {
        const font = isValidFontName(node.fontName)
          ? { family: node.fontName.family, style: node.fontName.style }
          : { family: 'Inter', style: 'Medium' };

        figma.loadFontAsync(font).then(() => (node.characters = msg.text));
      }
    });
  }
};

function isTextNode(node: SceneNode): node is TextNode {
  return (node as TextNode).characters !== undefined;
}

function isValidFontName(fontName: TextNode['fontName']): fontName is FontName {
  return (fontName as FontName).family !== undefined && (fontName as FontName).style !== undefined;
}

// function isTexNode(node: SceneNode): node is TextNode {
//   return (node as Node).characters !== undefined;
// }
