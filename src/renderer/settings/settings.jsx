class Setting {
  constructor(name, description, active) {
    this.name = name;
    this.description = description;
    this.active = active;
  }
}

const defaultSettings = {
  objectLiteral: new Setting(
    'Write Body like Object literal',
    'Instead of writing the body as plain text, use Javascript Object literal syntax. Note that you do not need to use enclosing {} brackets.',
    true
  ),
  rawResponse: new Setting('Default raw response data', '', false),
  // autoHeaders: new Setting('Use automatic headers', '', true),
  // renderHtml: new Setting(
  //   'Render html markup on text/html response',
  //   '',
  //   false
  // ),
  extendedGeneral: new Setting('Extended general data', '', false),
};

export default defaultSettings;
