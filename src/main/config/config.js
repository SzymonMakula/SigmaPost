const { writeFileSync, readFileSync } = require('fs');

const defaultSettings = {
  objectLiteral: true,
  rawResponse: false,
  autoHeaders: true,
  renderHtml: false,
  extendedGeneral: true,
};

class Config {
  constructor(app) {
    this.app = app;
    this.config = null;
  }

  createConfigFile = () => {
    writeFileSync(
      `${app.getPath('userData')}/config.json`,
      JSON.stringify(defaultSettings),
      'utf-8'
    );
  };

  updateConfigFile = (data) => {
    writeFileSync(`${app.getPath('userData')}/config.json`, data, 'utf-8');
    this.config = JSON.parse(data);
    return this.config;
  };

  readConfigFile = () => {
    this.config = JSON.parse(
      readFileSync(`${app.getPath('userData')}/config.json`, 'utf-8')
    );
    return this.config;
  };

  set = (key, value) => {
    if (!this.config) readFileSync();
    this.config[key] = value;
    this.updateConfigFile(JSON.stringify(this.config));
  };

  get = (key) => {
    if (!this.config) readFileSync();
    return this.config[key];
  };
}

module.exports = Config;
