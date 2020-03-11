const TABLE_ON = './images/table_on.png';
const TABLE_OFF = './images/table_off.png';

const pricePerHour = 50;

let tables = [];

function onLoad() {
  for (let i = 0; i < 6; i++) {
    const img = document.getElementById(`tableImg${i}`);
    if(img == null) continue;
    
    tables[i] = new PoolTable(
      document.getElementById(`tableImg${i}`),
      document.getElementById(`startTimeText${i}`),
      document.getElementById(`endTimeText${i}`),
      document.getElementById(`totalText${i}`),
    );
  }
  setInterval(() => {
    tables.forEach(table => table.draw());
  }, 1);
}

class PoolTable {
  constructor(img, startTimeText, endTimeText, totalText){
    this.img = img;
    this.img.onclick = () => this.toggle();
    this.startTimeText = startTimeText;
    this.endTimeText = endTimeText;
    this.totalText = totalText;
    this.inUse = false;
  }

  toggle() {
    if(this.inUse)
      this.turnOff();
    else
      this.turnOn();
  }

  turnOff() {
    this.inUse = false;
    this.img.src = TABLE_OFF;
    this.endTime = new Date();

  }
  turnOn() {
    this.inUse = true;
    this.img.src = TABLE_ON;
    this.startTime = new Date();
    this.endTime = null;
  }

  draw = function() {
    if(this.inUse) {
      this.startTimeText.innerText = formatDate(this.startTime);
      this.endTimeText.innerText = '';

      let millis = new Date() - this.startTime;
      let total = millis * pricePerHour / 3600000;
      total = Math.ceil(total*100)/100;
      this.totalText.innerText = `$${total}`;
    }
    if(this.endTime != null) {
      this.endTimeText.innerText = formatDate(this.endTime);
    }
  };
}

let formatDate = date => date.toString().substr(16, 8);