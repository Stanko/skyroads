import keyCodes from 'constants/key-codes';

const keyNames = Object.keys(keyCodes);

export default class Simulator {
  constructor(fileInputElement, setKeys) {
    console.log(fileInputElement);
    fileInputElement.addEventListener('change', this.handleFileChange);
    this.fileInputElement = fileInputElement;

    this.currentRow = 0;
    this.setKeys = setKeys;
  }

  setCommands = (input) => {
    this.commands = input.split('\n').map(item => {
      if (!item) {
        return null;
      }

      const commandsList = item.split(' ').filter(command => {
        return keyNames.includes(command);
      });

      return commandsList.length > 0 ? commandsList : null;
    });
  }

  handleFileChange = () => {
    const reader = new FileReader();

    reader.onload = () => {
      this.setCommands(reader.result);
      this.start();
    };

    reader.readAsText(this.fileInputElement.files[0]);
  }

  tick = () => {
    if (this.currentRow >= this.commands.length) {
      clearInterval(this.intervalID);
      this.setKeys({});
    }

    const keys = {};
    const commands = this.commands[this.currentRow];

    if (commands) {
      commands.forEach(command => {
        keys[keyCodes[command]] = true;
      });

      this.setKeys(keys);
    } else {
      this.setKeys({});
    }

    this.currentRow++;
  }

  start() {
    this.intervalID = setInterval(this.tick, 100);
  }
}
