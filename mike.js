class Mike {
  constructor() {
    this.synth = window.speechSynthesis;
    this.microsoftVoice = null;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.distortionAmount = 50;
    this.echoAmount = 0.3;
    
    // Create audio processing nodes
    this.distortion = this.audioCtx.createWaveShaper();
    this.delay = this.audioCtx.createDelay(1);
    this.feedback = this.audioCtx.createGain();
    this.gain = this.audioCtx.createGain();
    
    // Set up audio processing chain  
    this.setupAudioChain();
    
    // Initialize Microsoft voice
    this.initMicrosoftVoice();
  }

  async initMicrosoftVoice() {
    // Try to find Microsoft online voice
    this.microsoftVoice = this.synth.getVoices().find(voice => 
      voice.name.includes('Microsoft') && voice.voiceURI.includes('online')
    );
    
    // If not found initially, wait for voices to load
    if (!this.microsoftVoice) {
      await new Promise(resolve => {
        this.synth.onvoiceschanged = () => {
          this.microsoftVoice = this.synth.getVoices().find(voice => 
            voice.name.includes('Microsoft') && voice.voiceURI.includes('online')
          );
          resolve();
        };
      });
    }
  }

  setupAudioChain() {
    // Connect nodes: source -> distortion -> delay -> feedback -> gain -> destination
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.feedback.gain.value = this.echoAmount;
    
    this.distortion.curve = this.makeDistortionCurve(this.distortionAmount);
    this.gain.gain.value = 0.5;
  }

  setEffect(effect, value) {
    switch(effect) {
      case 'distortion':
        this.distortionAmount = value;
        this.distortion.curve = this.makeDistortionCurve(value);
        break;
      case 'echo':
        this.echoAmount = value;
        this.feedback.gain.value = value;
        break;
    }
  }

  makeDistortionCurve(amount) {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; ++i) {
      const x = i * 2 / samples - 1;
      curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

  setVoice(voice) {
    this.microsoftVoice = voice;
  }

  getVoices() {
    return this.synth.getVoices();
  }

  async speak(text, options = {}) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Always use Microsoft voice if available
      if (this.microsoftVoice) {
        utterance.voice = this.microsoftVoice;
      }
      
      // Apply voice modifications
      utterance.pitch = options.pitch || 1;
      utterance.rate = options.rate || 1;
      utterance.volume = options.volume || 1;

      let updateInterval;
      if (options.onUpdate && options.updateInterval) {
        updateInterval = setInterval(() => {
          options.onUpdate(utterance);
        }, options.updateInterval);
      }

      if (options.onStart) {
        utterance.onstart = () => {
          options.onStart();
        };
      }

      utterance.onend = () => {
        if (updateInterval) {
          clearInterval(updateInterval);
        }
        resolve();
      };
      
      utterance.onerror = (event) => {
        if (updateInterval) {
          clearInterval(updateInterval);
        }
        console.error('Speech synthesis error:', event);
        resolve();
      };

      this.synth.speak(utterance);

      if (window.AudioContext && utterance.audioStream) {
        const source = this.audioCtx.createMediaStreamSource(utterance.audioStream);
        source
          .connect(this.distortion)
          .connect(this.delay)
          .connect(this.gain)
          .connect(this.audioCtx.destination);
      }
    });
  }
}

export default Mike;