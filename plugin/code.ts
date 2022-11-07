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
      if (isTextNode(node) && msg.text) {
        figma.loadFontAsync({ family: 'Inter', style: 'Medium' }).then(() => {
          node.characters = msg.text;
        });
      } else {
        node.x = node.x + 200;
      }
    });
  }
};

function isTextNode(node: SceneNode): node is TextNode {
  return (node as TextNode).characters !== undefined;
}
