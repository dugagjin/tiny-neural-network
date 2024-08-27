# tiny neural network

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/dugagjin/tiny-neural-network.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/dugagjin/tiny-neural-network/context:javascript)

Only 123 lines and ~1 kB gzipped !

## installation

```bash
npm install --save tiny-neural-network
```

## examples

The neural network works with values between 0 and 1.

### xor

```ts
// import the Neural Network
import Network from 'tiny-neural-network';

// how much to train
// create a network with 2 input, 1 output and 2 layers of 3 and 1 neuron
// The network class has 'learningRate' as second argument with default value of 0.1.
// xor dataset to learn
const maxIterations = 1e5;
const neuralNetwork = new Network([2, 3, 1]);
const xor = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

// training loop
// randomly select an input
// capture result of what the network predicted
// make the network learn from the error
for (let i = 0; i < maxIterations; i++) {
  const select = Math.floor(Math.random() * xor.length);
  const result = neuralNetwork.predict(xor[select].input);
  neuralNetwork.learn(result, xor[select].output);
}

// after training create a table of all predictions and expectations
// print the table on console
const table = xor.map(({ input, output }) => ({
  prediction: neuralNetwork.predict(input),
  expectation: output,
}));
console.table(table);
```

In this case, the more the network learns, the better the XOR prediction. This is because there is no unknown data to predict. In case you want to predict unknown data then more learning is not always better. Here is a an example that I have generated to demonstrate it:

![](http://image.noelshack.com/fichiers/2018/39/3/1537963119-webp-net-gifmaker.gif)

The goal was to learn the sine wave using 20 evenly spaced points. The GIF starts with 20 iterations and goes up to 20e6 with a increase of factor 10.
The best prediction is at 20e4 iterations and the two last ones (20e5 and 20e6) are garbage.

### mnist

![mnist](images/mnist.png)

Mnist is a data set of handwriting. The objective is to learn recognize digits and then predict digits that the network hasn't seen before. First install the mnist data set:

```bash
npm install --save small-mnist
```

Then code the magic:

```typescript
// import this lib and the small version of mnist
import Network from 'tiny-neural-network';
import { test, train } from 'small-mnist';

// define the number of epochs which is number of times
// that the network see all the data one time
// 400 inputs because of 400 pixels,
// 200 neurons for first layers and 10 neurons for output layer
const epochs = 10;
const nn = new Network([400, 200, 10]);

// since we are working with epochs we need
// a generic shuffle function so that the network does not learn the sequence
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// train
for (let i = 0; i < epochs; i++) {
  shuffle(train);
  train.forEach(({ input, output }) => nn.learn(nn.predict(input), output));
  console.log(`epoch: ${i}`);
}

// benchmark en format results to show in a table
// will print a table of only failed
// the test set has 100 elements so if 10 are printed the performance is 90%
console.table(
  test
    .map(({ input, label }) => ({
      prediction: nn
        .predict(input)
        .reduce((a, v, i, arr) => (v > arr[a] ? i : a), 0),
      expectation: label,
    }))
    .filter(({ expectation, prediction }) => expectation !== prediction),
);
```

This should take 1-2 min to train in order to have an accuracy above ~85%.

We can also do the inverse, make the network learn to write numbers (Node.JS only due pixel draw on terminal):

```typescript
// import this lib and the a small version of mnist
import Network from 'tiny-neural-network';
import { train } from 'small-mnist';
import { stdout } from 'process';

// define the number of epochs which is number of times that the network see all the data once
// 10 inputs because of 10 different input possibilities,
// 200 neurons for first layers and 400 neurons for output
const epochs = 10;
const nn = new Network([10, 200, 400]);

// generic shuffle function so that the network does not learn the sequence
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// train
for (let i = 0; i < epochs; i++) {
  shuffle(train);
  train.forEach(({ input, output }) => nn.learn(nn.predict(output), input));
  console.log(`epoch: ${i}`);
}

// quick and dirty way to test the drawing skills of the network
// create 10 inputs with their expected value as number to test the network
// draw black for each pixel having value < 0.5 otherwise draw white.
// canvas is 20x20 thus new line at each 20 pixels.
Array.from(Array(10).keys())
  .map((key) => ({
    input: Array.from(Array(10)).map((_, i) => (i === key ? 1 : 0)),
    expected: key,
  }))
  .map(({ input, expected }) => {
    const predicted = nn.predict(input);
    const white = '\x1b[47m\x1b[37m__';
    const black = '\x1b[40m\x1b[30m__';
    const clear = '\x1b[0m';
    predicted.forEach((e, i) => {
      const pixel = e > 0.5 ? white : black;
      const newLines = i % 20 === 0 ? '\n' : '';
      stdout.write(`${newLines}${pixel}${clear}`);
    });
    console.log(expected);
  });
```

## develop

Project was made with Node.JS v10.10.0 and TypeScript v3.0.3. Ulterior versions may work but are not guaranteed.

```bash
git clone https://github.com/dugagjin/tiny-neural-network.git
cd tiny-neural-network
```

### `npm run build`

Compile the project in build folder.

### `npm start`

Run the existing index file in the build folder.

### `npm run execute`

Compile and then run the project.

## author

Dugagjin Lashi

## license

MIT
