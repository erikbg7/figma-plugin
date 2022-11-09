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
    const node = nodes[0];
    // nodes.forEach((node) => {})
    console.log({ node });

    // If the selected node is a text node, copy the payload text to it
    if (isTextNode(node) && msg.text) {
      const font = isValidFontName(node.fontName)
        ? { family: node.fontName.family, style: node.fontName.style }
        : { family: 'Inter', style: 'Medium' };

      figma.loadFontAsync(font).then(() => (node.characters = msg.text));
    } else {
      invertIfApplicable(node).then(() => {
        console.log('done!');
        figma.closePlugin();
      });
    }
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

async function invertPaint(paint: Paint) {
  // Only invert the color for images (but you could do it
  // for solid paints and gradients if you wanted)
  if (paint.type === 'IMAGE' && paint.imageHash) {
    // Paints reference images by their hash.
    const image = figma.getImageByHash(paint.imageHash);

    // Get the bytes for this image. However, the "bytes" in this
    // context refers to the bytes of file stored in PNG format. It
    // needs to be decoded into RGBA so that we can easily operate
    // on it.
    const bytes = await image?.getBytesAsync();

    // Decoding to RGBA requires browser APIs that are only available
    // within an iframe. So we create an invisible iframe to act as
    // a "worker" which will do the task of decoding and send us a
    // message when it's done. This worker lives in `decoder.html`
    figma.showUI(__html__, { visible: false });

    // Send the raw bytes of the file to the worker
    figma.ui.postMessage(bytes);

    // Wait for the worker's response
    const newBytes: Uint8Array = await new Promise((resolve, reject) => {
      figma.ui.onmessage = (value) => resolve(value as Uint8Array);
    });

    // Create a new paint for the new image. Uploading the image will give us
    // an image hash.
    const newPaint = JSON.parse(JSON.stringify(paint));
    newPaint.imageHash = figma.createImage(newBytes).hash;
    return newPaint;
  }
  return paint;
}

async function invertIfApplicable(node: SceneNode) {
  // Look for fills on node types that have fills.
  // An alternative would be to do `if ('fills' in node) { ... }
  switch (node.type) {
    case 'RECTANGLE':
    case 'ELLIPSE':
    case 'POLYGON':
    case 'STAR':
    case 'VECTOR':
    case 'TEXT': {
      // Create a new array of fills, because we can't directly modify the old one
      const newFills = [];
      for (const paint of node.fills as Paint[]) {
        newFills.push(await invertPaint(paint));
      }
      node.fills = newFills;
      break;
    }

    default: {
      // not supported, silently do nothing
    }
  }
}
