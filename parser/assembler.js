/*
Reads in a directory worth of markdown files organized by year
 and parses them into a Blog Object with this shape:
 [
  {
    year: '2016',
      months: [
        month: 'January',
        posts: [
          {
            timestamp: ISO date string,
            title: Str,
            tags: Arr of Strs,
            body: Str containing markdown,
            publish: Bool,
          },
          ...
      ],
      ...
    }
    ...
  ]
*/

/*
Uses a react component to render a static html file for each Post Object in a Blog Object,
placing it into the path OUTPUT_DIR/${year}/${month}/blog-post-in-skeletal-case.html

*/
