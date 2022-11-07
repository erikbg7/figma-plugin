

// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// import { Test } from "./utils";

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {height: 400, width: 300});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {



  
  // Update message to a node text
  if(msg.type === 'update-nodes') {
    console.log('update-nodes')
    console.log({figma})
    console.log(msg)
    const nodes = figma.currentPage.selection
    console.log(nodes)
    nodes.forEach(node => {
      console.log({node})
      if (isTextNode(node)) {
        figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(() => {
          console.log('is text node')
          node.characters = 'Hello World only refers to a type, but is being used as a value here.';
        })
      } else {
        node.x = node.x + 200;
      }
    })
  }

  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};

function isTextNode(node: SceneNode): node is TextNode {
  return (node as TextNode).characters !== undefined;
};