# Blog Good.

Tacoma consists of three distinct parts.

- Post Editor and Preview: a react-driven client for editing markdown posts with a live preview.  Posts are directed to the Server.
- Server: listens for posts and saves them in the server's filesystem based on their timestamp at the path `YYYY/MMM/post-title-in-skeletal-case.md`
- Parser/Renderer: Reads all markdown files in a directory structure similar to the one created by the Server, renders them to static HTML using the BlogPostViewer react component, and saves that html into a target directory with the path `YYYY/MMM/post-title-in-skeletal-case.html`

# How to Use

  - Clone.
  - `npm install`

  Then you have a couple of options:

  - `npm run hot:combo`

  This will serve the Editor at localhost:8080 via webpack-dev-server, and the Server at localhost:3000 via nodemon.

  __OR__

  - `npm run build`
  - `npm start`

  This will run the Server; the Editor will work just fine if you open dist/index.html direcly from the filesystem.

# Testing

  `npm test` will run some basic tests on the Server and Parser via jest.

## Editor

  A very simple react SPA driven by BlogPostComposer that includes a form for editing blog posts, and renders the BlogPostViewer component below it for real-time Markdown preview.  On pressing `Save` or `Publish`, the post data is sent to the Server via a POST request.

## Server

  Express server listens for POSTs to `localhost:3000/post`, and saves them to a file in the content directory specified in `blig.config.js` at the path `YYYY/MMM/post-title-in-skeletal-case.md`.

  Making a new post will trigger a complete re-parsing of the blog to fix any static links / index pages.

## Parser / Renderer

  After loading every markdown file found in the content directory specified in `blog.config.js`, this module renders them to static HTML using the BlogPostViewer react component, and saves that html into the output directory specified in `blog.config.js` with the path `YYYY/MMM/post-title-in-skeletal-case.html`. It also renders index.html files at every year and month path that contains posts, and an index page for each tag at `tags/:tagName/index.html`.
