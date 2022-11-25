# Sync Content Figma Plugin
This repo contains an example of a custom Figma plugin that can be used by designers to sync content to one or multiple figma nodes.
Currently it is able to sync any kind of text or images.

## Usage in Figma
- Download the content.
- Open Figma.
- Select ```Plugins / Development / Import plugin from manifest...```
- Select ```manifest.json``` from the project folder.
- Open the plugin.

## Usage in Development
First, run the development server:
```
npm run dev
# or
yarn dev
```

You can use your browser or Figma for development, although the might be some UI changes between them.

Hot reload will work fine if you are using the browser, but you will have to reopen the plugin everytime if you are using Figma.

## How it Works
Figma expects a single JS file and a single HTML file with the styles. 

For that reason it makes sense to split the project beetween UI and Plugin Logic, as you can see from the folder structure.

```/plugin``` will generate a single file to interact with Figma, and everything inside ```/ui``` will be compiled to a single file as well. Just as Figma expects.

If you are curious about the final result, just make a build and check the ```/dist``` folder.

