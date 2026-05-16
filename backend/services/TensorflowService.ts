import * as tf from '@tensorflow/tfjs';

interface Intent {
  intent: string;
  patterns: string[];
  responses: string[];
}

export class TensorflowService {
  private model: tf.LayersModel | null = null;
  private words: string[] = [];
  private classes: string[] = [];
  private isInitializing: boolean = false;
  private initPromise: Promise<void> | null = null;

  private intents: Intent[] = [
    {
      intent: 'greeting',
      patterns: ['hi', 'hello', 'hey'],
      responses: ['Hello 👋'],
    },
  ];

  constructor() {
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    try {
      if (this.isInitializing) return;

      this.isInitializing = true;

      await tf.setBackend('cpu');
      await tf.ready();

      const allPatterns: { text: string; intent: string }[] = [];

      this.intents.forEach((item: Intent) => {
        if (!this.classes.includes(item.intent)) {
          this.classes.push(item.intent);
        }

        item.patterns.forEach((p: string) => {
          allPatterns.push({
            text: p.toLowerCase(),
            intent: item.intent,
          });

          const tokens = p.toLowerCase().split(/\s+/);

          tokens.forEach((t: string) => {
            if (!this.words.includes(t)) {
              this.words.push(t);
            }
          });
        });
      });

      this.words.sort();
      this.classes.sort();

      const trainingData: number[][] = [];
      const outputData: number[][] = [];

      allPatterns.forEach((p: { text: string; intent: string }) => {
        const bag = new Array(this.words.length).fill(0);

        const tokens = p.text.split(/\s+/);

        tokens.forEach((t: string) => {
          const idx = this.words.indexOf(t);

          if (idx !== -1) {
            bag[idx] = 1;
          }
        });

        trainingData.push(bag);

        const output = new Array(this.classes.length).fill(0);

        output[this.classes.indexOf(p.intent)] = 1;

        outputData.push(output);
      });

      const xs = tf.tensor2d(trainingData);
      const ys = tf.tensor2d(outputData);

      const model = tf.sequential();

      model.add(
        tf.layers.dense({
          units: 128,
          activation: 'relu',
          inputShape: [this.words.length],
        })
      );

      model.add(tf.layers.dropout({ rate: 0.5 }));

      model.add(
        tf.layers.dense({
          units: 64,
          activation: 'relu',
        })
      );

      model.add(tf.layers.dropout({ rate: 0.5 }));

      model.add(
        tf.layers.dense({
          units: this.classes.length,
          activation: 'softmax',
        })
      );

      model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
      });

      await model.fit(xs, ys, {
        epochs: 10,
        verbose: 1,
      });

      this.model = model;
    } catch (error: unknown) {
      console.error('[TensorFlow] Error:', error);
    } finally {
      this.isInitializing = false;
    }
  }

  public async predict(text: string): Promise<string> {
    const lowerText = text.toLowerCase();

    for (const item of this.intents) {
      if (item.patterns.some((p: string) => lowerText.includes(p))) {
        const responses = item.responses;

        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    if (!this.model) {
      return 'Model is loading...';
    }

    try {
      const bag = new Array(this.words.length).fill(0);

      const tokens = lowerText.split(/\s+/);

      tokens.forEach((t: string) => {
        const idx = this.words.indexOf(t);

        if (idx !== -1) {
          bag[idx] = 1;
        }
      });

      const input = tf.tensor2d([bag]);

      const prediction = this.model.predict(input) as tf.Tensor;

      const data = await prediction.data();

      const maxIdx = data.indexOf(Math.max(...data));

      const detectedIntent = this.classes[maxIdx];

      const intentObj = this.intents.find((i: Intent) => i.intent === detectedIntent);

      if (!intentObj) {
        return 'No intent found.';
      }

      const responses = intentObj.responses;

      return responses[Math.floor(Math.random() * responses.length)];
    } catch (error: unknown) {
      console.error('[TensorFlow] Prediction error:', error);

      return 'Something went wrong.';
    }
  }
}
