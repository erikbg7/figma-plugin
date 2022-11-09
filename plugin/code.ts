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
  const nodes = figma.currentPage.selection;
  const node = nodes[0];

  // Update a selected text node with the text clicked in the UI.
  // If the selected node is a text node, copy the payload text to it.
  if (msg.type === 'update-text-node') {
    if (isTextNode(node) && msg.text) {
      const font = isValidFontName(node.fontName)
        ? { family: node.fontName.family, style: node.fontName.style }
        : { family: 'Inter', style: 'Medium' };

      figma.loadFontAsync(font).then(() => (node.characters = msg.text));
    }
  }

  // Update a selected image node with the text clicked in the UI.
  // Look for fills on node types that have fills.
  // Create a new array of fills, because we can't directly modify the old one
  if (msg.type === 'update-image-node') {
    if (isValidImageNode(node) && msg.bytes) {
      const newFills = [];
      const imageNode = node as GeometryMixin;
      const imageBytes = msg.bytes as Uint8Array;

      for (const paint of imageNode.fills as Paint[]) {
        newFills.push({
          type: 'IMAGE',
          scaleMode: 'FILL',
          scalingFactor: 0.5,
          imageHash: figma.createImage(imageBytes).hash,
        } as Paint);
      }
      imageNode.fills = newFills;
    }
  }
};

///////////////////////////////////////////////
//////////////////// UTILS ////////////////////
///////////////////////////////////////////////

function isTextNode(node: SceneNode): node is TextNode {
  return (node as TextNode).characters !== undefined;
}

function isValidImageNode(node: SceneNode): boolean {
  const validTypes = ['RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'VECTOR', 'TEXT'];
  return !!validTypes.find((t) => t === node.type);
}

function isValidFontName(fontName: TextNode['fontName']): fontName is FontName {
  return (fontName as FontName).family !== undefined && (fontName as FontName).style !== undefined;
}
