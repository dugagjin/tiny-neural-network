# tiny neural network

Only 123 lines !

### installation

```bash
npm install --save tiny-neural-network
```

### examples

#### xor

```ts
// import the Neural Network
import Network from 'tiny-neural-network';

// how much to train
// create a network with 2 input, 1 output and 3 layers of 6, 2 and 1 neuron
// xor dataset to learn
const maxIterations = 1e5;
const neuralNetwork = new Network([2, 6, 2, 1]);
const xor = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
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
const predictions = xor.map(({ input }) => neuralNetwork.predict(input));
const expectations = xor.map(({ output }) => output);
const table = predictions.map((prediction, i) => ({
    prediction,
    expectation: expectations[i]
}));
console.table(table);
```

### develop

Project was made with Node.JS v10.10.0 and TypeScript v3.0.3. Ulterior versions may work but are not guaranteed.

```bash
git clone https://github.com/dugagjin/tiny-neural-network.git
cd tiny-neural-network
```

#### `npm run build`

Compile the project in build folder.

#### `npm start`

Run the existing index file in the build folder.

#### `npm run execute`

Compile and then run the project.

### author

Dugagjin Lashi

### license

MIT
