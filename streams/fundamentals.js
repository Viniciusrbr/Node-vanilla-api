import { Readable, Writable, Transform } from 'node:stream'

// stream de leitura
class OneToHundredStream extends Readable {
  index = 1

  _read() {

    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(`${i}\n`)
      }
    }, 1000);
  }
}

// stream de transformação
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed))) // primeiro argumento é o erro, segundo é o dado transformado
  }
}

// stream de escrita
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())