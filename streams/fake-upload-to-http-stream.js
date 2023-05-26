import { Readable } from 'node:stream'
 
class OneToHundredStream extends Readable {
  index = 1; 
  // Metodo obrigatório
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 100);
  }
}
fetch('http://localhost:3334',{
  method:'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})