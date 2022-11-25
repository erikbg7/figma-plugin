///////////////////////////////////////////////
/////////////// HOW IT WORKS //////////////////
///////////////////////////////////////////////
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the "/ui" folder which has a
// full browser environment (see documentation).

/////////////////////////////////////////////
///////////////// TYPES /////////////////////
/////////////////////////////////////////////
interface IContent extends Record<string, string> {}

interface IMessage {
  data: { contents: IContent[] };
}

///////////////////////////////////////////////
///////////////// CONSTANTS ///////////////////
///////////////////////////////////////////////
const UI_SIZE = { height: 400, width: 300 };

///////////////////////////////////////////////
/////////////// UI INTERACTION ////////////////
///////////////////////////////////////////////
const handleSelectionUpdate = () => {
  const length = figma.currentPage.selection.length;
  figma.ui.postMessage({ type: 'selection-change', length });
};

const handleContentSync = (message: IMessage) => {
  const nodes = figma.currentPage.selection;
  nodes?.forEach((n) => appendData(n as FrameNode, message.data.contents));
};

///////////////////////////////////////////////
////////////// FIGMA INTERACTION //////////////
///////////////////////////////////////////////
figma.showUI(__html__, UI_SIZE);
figma.on('run', handleSelectionUpdate);
figma.on('selectionchange', handleSelectionUpdate);
figma.ui.onmessage = handleContentSync;

const appendData = (node: FrameNode, contents: IContent[]) => {
  // @ts-ignore
  if (node?.name.startsWith('#')) {
    const param = node.name.slice(1);
    const randomIndex = Math.floor(Math.random() * contents.length);
    isTextNode(node) && appendTextToNode(node, contents[randomIndex][param]);
  }
  node.children?.forEach((n) => appendData(n as FrameNode, contents));
};

const appendTextToNode = (node: TextNode, text: string | undefined) => {
  if (node.characters && text) {
    const font = node.fontName as FontName;
    figma.loadFontAsync(font).then(() => (node.characters = text));
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

// const node = nodes[0];

// // Update a selected text node with the text clicked in the UI.
// // If the selected node is a text node, copy the payload text to it.
// if (msg.type === 'update-text-node') {
//   if (isTextNode(node) && msg.text) {
//     const font = isValidFontName(node.fontName)
//       ? { family: node.fontName.family, style: node.fontName.style }
//       : { family: 'Inter', style: 'Medium' };

//     figma.loadFontAsync(font).then(() => (node.characters = msg.text));
//   }
// }

// // Update a selected image node with the text clicked in the UI.
// // Look for fills on node types that have fills.
// // Create a new array of fills, because we can't directly modify the old one
// if (msg.type === 'update-image-node') {
//   if (isValidImageNode(node) && msg.bytes) {
//     const newFills = [];
//     const imageNode = node as GeometryMixin;
//     const imageBytes = msg.bytes as Uint8Array;

//     for (const paint of imageNode.fills as Paint[]) {
//       newFills.push({
//         type: 'IMAGE',
//         scaleMode: 'FILL',
//         scalingFactor: 0.5,
//         imageHash: figma.createImage(imageBytes).hash,
//       } as Paint);
//     }
//     imageNode.fills = newFills;
//   }
// }
