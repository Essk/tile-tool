const electron = require('electron');
const path = require('path');
const fs = require('fs');

type Opts = {
  configName: string;
  defaults: object;
};

type Dict = { [key: string]: any };

export class FileDataStore {
    public data: Dict;
    private path: string;
    constructor(opts: Opts) {
        const userDataPath = (electron.app || electron.remote.app).getPath(
        'userData',
        );
        this.path = path.join(userDataPath, opts.configName + '.json');
        this.data = parseDataFile(this.path, opts.defaults);
        // do a save in case this is first run
        // can probably handle that circumstance
        // more elegantly
        Object.keys(this.data).forEach( (key) => {
          this.set(key, this.data[key]);
        });
    }


  // This will just return the property on the `data` object
  public get(key: string): string {
    return this.data[key];
  }

  // ...and this will set it
  public set(key: string, val: string): void {
    this.data[key] = val;
    // Note that in a real app, we would try/catch this.
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    } catch (error) {
      console.log('could not save to disk');
      console.error(error);
    }
  }
}

function parseDataFile(filePath: string, defaults: object) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}
