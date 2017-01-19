const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>{% TITLE %}</title>
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Raleway:300,400,700" rel="stylesheet">
    <link href="../../main.css" rel="stylesheet">
  </head>
  <body>
    {% POST %}
  </body>
</html>
`;
module.exports = html;
