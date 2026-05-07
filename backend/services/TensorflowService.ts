import * as tf from '@tensorflow/tfjs';

export class TensorflowService {
  private model: tf.LayersModel | null = null;
  private words: string[] = [];
  private classes: string[] = [];
  private isInitializing: boolean = false;
  private initPromise: Promise<void> | null = null;

  private intents: any[] = [
    {
      intent: 'greeting',
      patterns: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'namaste', 'ayubowan'],
      responses: [
        'Hello! 👋 I am your PearlGo Sri Lanka Travel Assistant. How can I help you explore our beautiful island today?',
        'Hi there! 🌴 Looking for tips on visiting Sri Lanka? I can help with destinations, beaches, wildlife, and more.'
      ]
    },
    {
      intent: 'sigiriya',
      patterns: ['sigiriya', 'lion rock', 'pindurangala', 'tell me about sigiriya', 'sigiriya pic', 'sigiriya image', 'sigiriya photo'],
      responses: [
        'Sigiriya (Lion Rock) is an ancient rock fortress and palace built by King Kashyapa. It is a UNESCO World Heritage site known for its frescos and mirror wall.\n![Sigiriya Rock](https://www.travelmapsrilanka.com/destinations/destinationimages/sigiriya-srilanka.webp)'
      ]
    },
    {
      intent: 'ella',
      patterns: ['ella', 'nine arches', 'little adams peak', 'ella rock', 'train to ella', 'ella pic', 'ella photo', 'ella image'],
      responses: [
        'Ella is a charming mountain town famous for the Nine Arches Bridge and Little Adam\'s Peak. The train journey to Ella is considered one of the most beautiful in the world.\n![Nine Arches Bridge](https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg.webp)'
      ]
    },
    {
      intent: 'kandy',
      patterns: ['kandy', 'temple of the tooth', 'peradeniya', 'dalada maligawa', 'kandy pic', 'kandy photo'],
      responses: [
        'Kandy is the cultural capital of Sri Lanka, home to the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa).\n![Kandy Temple](https://t4.ftcdn.net/jpg/00/68/13/47/360_F_68134752_P9N4sgPhOLPtSV1EVzEBkIfequ0e8giO.jpg)'
      ]
    },
    {
      intent: 'yala',
      patterns: ['yala', 'safari', 'leopard', 'national park', 'yala pic', 'yala photo', 'yala image'],
      responses: [
        'Yala National Park has the highest density of leopards in the world. It is a must-visit for wildlife enthusiasts.\n![Yala Leopard](https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/b7/13/ec.jpg)'
      ]
    },
    {
      intent: 'mirissa',
      patterns: ['mirissa', 'whale watching', 'coconut tree hill', 'surfing mirissa', 'mirissa pic', 'mirissa photo'],
      responses: [
        'Mirissa is famous for whale watching and the iconic Coconut Tree Hill. It is also a great spot for relaxation and surfing.\n![Mirissa Beach](https://static1.squarespace.com/static/5a3bb03b4c326d76de73ddaa/5a5f3f79bc3379a23e60b3b5/64d1d6f48ba3d16f2df8978f/1750651622379/The+Common+Wanderer-160+%281%29.jpg?format=1500w)'
      ]
    },
    {
      intent: 'galle',
      patterns: ['galle', 'fort', 'lighthouse', 'dutch fort', 'galle pic', 'galle photo'],
      responses: [
        'Galle Fort is a historic Dutch colonial fortification and a UNESCO World Heritage site filled with charming streets and shops.\n![Galle Lighthouse](https://srilanka800.com/wp-content/uploads/2025/10/Galle-Fort-Lighthouse.jpg)'
      ]
    },
    {
      intent: 'anuradhapura',
      patterns: ['anuradhapura', 'ancient city', 'ruins', 'stupa', 'anuradhapura pic', 'anuradhapura photo'],
      responses: [
        'Anuradhapura was the first capital of Sri Lanka and is one of the oldest continuously inhabited cities in the world, known for its massive stupas.\n![Anuradhapura Stupa](https://www.lanka-excursions-holidays.com/uploads/4/0/2/1/40216937/jetavanarama-record-stupa-in-anuradhapura-in-sri-lanka_orig.jpg)'
      ]
    },
    {
      intent: 'international',
      patterns: [
        'paris', 'london', 'india', 'thailand', 'maldives', 'usa', 'america', 'dubai', 'singapore',
        'australia', 'japan', 'china', 'germany', 'france', 'italy', 'travel to india', 'visit dubai'
      ],
      responses: [
        'Sorry, I am trained only to work inside Sri Lanka! 🇱🇰 I can help you with anything related to Sri Lankan travel, destinations, and culture.'
      ]
    },
    {
      intent: 'images',
      patterns: ['show me a random picture', 'random photo', 'surprise me with a pic'],
      responses: [
        'Here is a beautiful view of Sri Lanka for you!\n![Beautiful Sri Lanka](https://www.srilanka-travel-package.com/uploads/images/2024-05-31-srilanka-travel-package.com-c2832/sri-lanka.jpg)',
        'Check out this amazing spot in Sri Lanka!\n![Sri Lanka Highlight](https://www.holidify.com/images/bgImages/COLOMBO.jpg)'
      ]
    }
  ];

  constructor() {
    this.initPromise = this.init();
  }

  private async init() {
    try {
      if (this.isInitializing) return;
      this.isInitializing = true;
      console.log('[TensorFlow] Starting initialization...');

      // Force CPU backend for compatibility
      try {
        await tf.setBackend('cpu');
        await tf.ready();
        console.log('[TensorFlow] Using backend:', tf.getBackend());
      } catch (beError) {
        console.error('[TensorFlow] Backend setup failed, continuing with default:', beError);
      }

      const allPatterns: { text: string; intent: string }[] = [];
      this.intents.forEach(item => {
        if (!this.classes.includes(item.intent)) {
          this.classes.push(item.intent);
        }
        item.patterns.forEach((p: string) => {
          allPatterns.push({ text: p.toLowerCase(), intent: item.intent });
          const tokens = p.toLowerCase().split(/\s+/);
          tokens.forEach(t => {
            if (!this.words.includes(t)) this.words.push(t);
          });
        });
      });

      this.words.sort();
      this.classes.sort();

      const trainingData: number[][] = [];
      const outputData: number[][] = [];

      allPatterns.forEach(p => {
        const bag = new Array(this.words.length).fill(0);
        const tokens = p.text.split(/\s+/);
        tokens.forEach(t => {
          const idx = this.words.indexOf(t);
          if (idx !== -1) bag[idx] = 1;
        });
        trainingData.push(bag);

        const output = new Array(this.classes.length).fill(0);
        output[this.classes.indexOf(p.intent)] = 1;
        outputData.push(output);
      });

      const xs = tf.tensor2d(trainingData);
      const ys = tf.tensor2d(outputData);

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [this.words.length] }));
      model.add(tf.layers.dropout({ rate: 0.5 }));
      model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
      model.add(tf.layers.dropout({ rate: 0.5 }));
      model.add(tf.layers.dense({ units: this.classes.length, activation: 'softmax' }));

      model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });

      console.log('[TensorFlow] Training model (10 epochs)...');
      await model.fit(xs, ys, {
        epochs: 10,
        verbose: 1
      });

      this.model = model;
      console.log('[TensorFlow] Local model trained and ready.');
    } catch (error) {
      console.error('[TensorFlow] CRITICAL initialization error:', error);
    } finally {
      this.isInitializing = false;
    }
  }

  public async predict(text: string): Promise<string> {
    const lowerText = text.toLowerCase();

    // HARD CHECK: International places outside Sri Lanka
    const internationalKeywords = [
      'london', 'paris', 'dubai', 'india', 'thailand', 'maldives', 'usa', 'america',
      'singapore', 'australia', 'japan', 'china', 'germany', 'france', 'italy',
      'uk', 'new york', 'canada', 'malaysia', 'bali', 'vietnam'
    ];

    if (internationalKeywords.some(keyword => lowerText.includes(keyword))) {
      return "Sorry, I am trained only to work inside Sri Lanka! 🇱🇰 I can help you with anything related to Sri Lankan travel, destinations, and culture.";
    }

    console.log(`[TensorFlow] Predicting for: "${text}"`);

    // STEP 1: Direct Keyword Match (Hybrid Approach for 100% Accuracy on Places)
    for (const item of this.intents) {
      if (item.patterns.some(p => lowerText.includes(p))) {
        console.log(`[TensorFlow] Direct keyword match found for intent: ${item.intent}`);
        const responses = item.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // STEP 2: AI Inference (Fallback for complex natural language)
    // Don't block indefinitely. If it's still initializing, return a message.
    if (!this.model) {
      return "I'm currently warming up my local AI. Please try again in just a few seconds!";
    }

    try {
      const bag = new Array(this.words.length).fill(0);
      const tokens = lowerText.split(/\s+/);
      tokens.forEach(t => {
        const idx = this.words.indexOf(t);
        if (idx !== -1) bag[idx] = 1;
      });

      const input = tf.tensor2d([bag]);
      const prediction = this.model.predict(input) as tf.Tensor;
      const data = await prediction.data();
      const maxIdx = data.indexOf(Math.max(...data));
      const confidence = data[maxIdx];

      console.log(`[TensorFlow] AI Prediction: ${this.classes[maxIdx]} (Confidence: ${(confidence * 100).toFixed(2)}%)`);

      if (confidence < 0.2) {
        return "I'm not quite sure I understand. I am a Sri Lankan travel assistant and can help with information about our beaches, wildlife, history, and hill country. Could you try asking about a place in Sri Lanka?";
      }

      const detectedIntent = this.classes[maxIdx];
      const intentObj = this.intents.find(i => i.intent === detectedIntent);
      const responses = intentObj.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    } catch (error) {
      console.error('[TensorFlow] Prediction error:', error);
      return "Something went wrong with my local AI engine.";
    }
  }
}
