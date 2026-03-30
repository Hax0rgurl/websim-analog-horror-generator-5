import Mike from './mike.js';
import Database from './database.js';
import AccountManager from './account-manager.js';
import Gallery from './gallery.js';

class HorrorGenerator {
  constructor() {
    this.db = new Database();
    this.accountManager = new AccountManager();
    this.gallery = new Gallery(this.db, this.accountManager);
    
    this.text = `EMERGENCY BROADCAST SYSTEM

This is a demonstration of the Analog Horror Generator system.

The system features multiple tabs for creating content:
- Broadcast: Create emergency messages
- Assets: View available horror elements 
- Special Thanks: Discover cool features and great contributors

NOTICE:
Hidden features can be unlocked through special broadcast codes.

Stay vigilant for clues.`;
    this.mike = new Mike();
    this.isPlaying = false;
    this.eyeCount = 0;
    this.secretMode = false;
    this.mirrorMode = false;
    this.riverMode = false;
    this.hijackMode = null;
    this.hijackTimer = null;
    this.hijackTriggered = false;
    this.imageMap = {
      'apple': { path: '/apple.png', enabled: true },
      'ant': { path: '/ant.png', enabled: true },
      'balloon': { path: '/balloon.png', enabled: true },
      'batteryEmpty': { path: '/BatteryEmpty.png', enabled: true },
      'batteryFull': { path: '/BatteryFull.png', enabled: true },
      'batteryHalf': { path: '/BatteryHalf.png', enabled: true },
      'bed': { path: '/bed.png', enabled: true },
      'bomb': { path: '/bomb.png', enabled: true },
      'bone': { path: '/bone.png', enabled: true },
      'bug': { path: '/bug.png', enabled: true },
      'butterfly': { path: '/butterfly.png', enabled: true },
      'camera': { path: '/Camera.png', enabled: true },
      'car': { path: '/car.png', enabled: true },
      'clock': { path: '/clock.png', enabled: true },
      'cloud': { path: '/cloud.png', enabled: true },
      'download': { path: '/download.png', enabled: true },
      'door': { path: '/Door.png', enabled: true },
      'egg': { path: '/Egg.png', enabled: true },
      'eye': { path: '/Eye.png', enabled: true },
      'fake': { path: '/fake.png', enabled: true },
      'figure': { path: '/NoArms.png', enabled: true },
      'fire': { path: '/fire.png', enabled: true },
      'fish': { path: '/fish.png', enabled: true },
      'flag': { path: '/flag.png', enabled: true },
      'forest': { path: '/forest.png', enabled: true },
      'ghost': { path: '/ghost.png', enabled: true },
      'glasses': { path: '/Glasses.png', enabled: true },
      'gun': { path: '/gun.png', enabled: true },
      'hand': { path: '/hand.png', enabled: true },
      'helicopter': { path: '/helicopter.png', enabled: true },
      'house': { path: '/House.png', enabled: true },
      'info': { path: '/Info.png', enabled: true },
      'key': { path: '/key.png', enabled: true },
      'knife': { path: '/Knife.png', enabled: true },
      'lightning': { path: '/Thunder.png', enabled: true },
      'loupe': { path: '/loupe.png', enabled: true },
      'man': { path: '/Man.png', enabled: true },
      'mirror': { path: '/Mirror.png', enabled: true },
      'moon': { path: '/moon.png', enabled: true },
      'painting': { path: '/painting.png', enabled: true },
      'paintbrush': { path: '/paintbrush.png', enabled: true },
      'phone': { path: '/phone.png', enabled: true },
      'pill': { path: '/pill.png', enabled: true },
      'radiation': { path: '/radiation.png', enabled: true },
      'radio': { path: '/Radio.png', enabled: true },
      'rainy': { path: '/rainy.png', enabled: true },
      'run': { path: '/run.png', enabled: true },
      'sound': { path: '/Sound.png', enabled: true },
      'see': { path: '/see.png', enabled: true },
      'shield': { path: '/shield.png', enabled: true },
      'smiley': { path: '/Smiley.png', enabled: true },
      'star': { path: '/star.png', enabled: true },
      'sun': { path: '/sun.png', enabled: true },
      'sword': { path: '/sword.png', enabled: true },
      'tomb': { path: '/tomb.png', enabled: true },
      'video': { path: '/video.png', enabled: true },
      'village': { path: '/village.png', enabled: true },
      'warning': { path: '/Warning.png', enabled: true },
      'window': { path: '/Window.png', enabled: true },
      'woman': { path: '/Woman.png', enabled: true },
    };
    
    // Enhanced trigger words
    this.triggerWords = {
      'hand|grab|reach|touch': 'hand',
      'phone|call|telephone|ring': 'phone',
      'key|lock|unlock|open': 'key',
      'radio|broadcast|frequency|station': 'radio',
      'storm|thunder|lightning|flash': 'lightning',
      'warning|danger|alert|caution': 'warning',
      'woman|girl|she|her': 'woman',
      'butterfly|moth|wings|flutter': 'butterfly',
      'ant|insect|colony|crawl': 'ant',
      'bug|insect|beetle|pest': 'bug',
      'watch|see|look|stare': 'eye',
      'shadow|figure|shape|silhouette': 'figure',
      'voice|sound|noise|audio': 'sound',
      'forest|woods|trees': 'forest',
      'home|house|building': 'house',
      'knife|blade|cut|sharp': 'knife',
      'information|info|notice': 'info',
      'man|boy|he|him': 'man',
      'car|vehicle|drive|automobile': 'car',
      'download|save|file|get': 'download',
      'fish|swim|water|ocean': 'fish',
      'window|glass|pane': 'window',
      'mirror|reflection|reflect': 'mirror',
      'door|entrance|exit': 'door',
      'egg|hatch|shell': 'egg',
      'glasses|spectacles|eyewear': 'glasses',
      'camera|photo|picture|photograph': 'camera',
      'battery|power|charge|energy': 'batteryFull',
      'half|partial|medium': 'batteryHalf',
      'empty|depleted|drained|dead': 'batteryEmpty',
      'pill|medication|drug|capsule': 'pill',
      'fake|false|pretend|deception': 'fake',
      'radiation|radioactive|nuclear|toxic': 'radiation',
      'power low|running out|almost empty': 'batteryHalf',
      'no power|powerless|out of energy': 'batteryEmpty',
      'medicine|prescription|treatment': 'pill',
      'contaminated|contamination|hazard': 'radiation',
      'imposter|impostor|among|suspicious': 'fake',
      'run|escape|flee|sprint': 'run',
      'gun|shoot|weapon|firearm': 'gun',
      'bed|sleep|rest|lay': 'bed',
      'painting|art|picture|draw': 'painting',
      'paintbrush|brush|paint|drawing': 'paintbrush',
      'speak|broadcast|announce|tell': 'see',
      'cloud|sky|weather|overcast': 'cloud',
      'apple|fruit|eat|food': 'apple',
      'search|look|find|investigate|magnify': 'loupe',
      'sword|blade|weapon|slash|cut': 'sword',
      'sun|daylight|bright|sunshine|dawn': 'sun',
      'moon|night|darkness|lunar': 'moon',
      'ghost|spirit|apparition|haunt': 'ghost',
      'bone|skeleton|remains|skull': 'bone',
      'balloon|float|party|air': 'balloon',
      'flag|banner|country|nation': 'flag',
      'star|cosmic|celestial|night sky': 'star',
      'tomb|grave|cemetery|death': 'tomb',
      'helicopter|chopper|aircraft|fly': 'helicopter',
      'video|movie|film|footage': 'video',
      'village|town|community|settlement': 'village',
      'time|clock|hour|minute': 'clock',
    };
    
    // Initialize the application
    this.init();
  }
  
  // Initialize method
  init() {
    // DOM references
    this.horrorText = document.getElementById('horror-text');
    this.outputText = document.getElementById('output-text');
    this.videoOutput = document.getElementById('video-output');
    this.screenEffect = document.querySelector('.screen-effect');
    this.scanLine = document.querySelector('.scan-line');
    this.noise = document.querySelector('.noise');
    this.glitchIntensity = document.getElementById('glitch-intensity');
    this.glitchValue = document.getElementById('glitch-value');
    this.glitchTheme = document.getElementById('glitch-theme');
    this.vhsStrength = document.getElementById('vhs-strength');
    this.vhsValue = document.getElementById('vhs-value');
    this.scanlineSpeed = document.getElementById('scanline-speed');
    this.scanlineSpeedValue = document.getElementById('scanline-speed-value');
    this.scanlineSize = document.getElementById('scanline-size');
    this.scanlineSizeValue = document.getElementById('scanline-size-value');
    this.hijackChance = document.getElementById('hijack-chance');
    this.voiceSelect = document.getElementById('voice-select');
    this.generateBtn = document.getElementById('generate-btn');
    this.stopBtn = document.getElementById('stop-btn');
    this.testVoiceBtn = document.getElementById('test-voice');
    this.broadcastLogo = document.querySelector('.broadcast-logo');
    this.showEasLogo = document.getElementById('show-eas');
    this.showBlubberLogo = document.getElementById('show-blubber');
    this.smoothImages = document.getElementById('smooth-images');
    this.aiPromptInput = document.getElementById('ai-prompt-input');
    this.aiWriterBtn = document.getElementById('ai-writer-btn');
    this.aiProgress = document.getElementById('ai-progress');
    this.viewNextUpdateTimer = document.getElementById('view-next-update');
    this.voicePitch = document.getElementById('voice-pitch');
    this.voicePitchValue = document.getElementById('voice-pitch-value');
    this.voiceSpeed = document.getElementById('voice-speed');
    this.voiceSpeedValue = document.getElementById('voice-speed-value');
    this.voiceVolume = document.getElementById('voice-volume');
    this.voiceVolumeValue = document.getElementById('voice-volume-value');
    this.downloadVideoBtn = document.getElementById('download-video-btn');
    this.analyseBtn = document.getElementById('analyse-broadcast-btn');
    
    // Populate the voice dropdown
    this.populateVoiceList();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize tabs
    this.initTabs();
    
    // Render assets tab
    this.db.renderAssets();
    
    // Update UI
    this.updateViewCount();
    this.updateUserGreeting();
    
    // Start view counter update timer
    this.startViewCountTimer();
    
    // Set initial UI state
    this.stopBtn.disabled = true;
    this.broadcastLogo.style.display = 'none';
    
    // Initialize voting admin controls
    this.initVotingAdmin();
  }
  
  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });
    
    // Assets tab switching
    document.addEventListener('click', (e) => {
      if (e.target.matches('.assets-tab')) {
        document.querySelectorAll('.assets-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        const tabId = e.target.dataset.assetsTab;
        document.getElementById('creator-assets')?.classList.toggle('hidden', tabId !== 'creator');
        document.getElementById('player-assets')?.classList.toggle('hidden', tabId !== 'player');
      }
    });
    
    // Bug report form submission
    document.getElementById('bug-report-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitBugReport();
    });
    
    // Voice selection
    this.voiceSelect.addEventListener('change', () => {
      const selectedVoice = this.voiceSelect.value;
      if (selectedVoice) {
        const voice = speechSynthesis.getVoices().find(v => v.name === selectedVoice);
        if (voice) {
          this.mike.setVoice(voice);
        }
      }
    });
    
    // Test voice button
    this.testVoiceBtn.addEventListener('click', () => {
      const selectedVoice = this.voiceSelect.value;
      if (selectedVoice) {
        const voice = speechSynthesis.getVoices().find(v => v.name === selectedVoice);
        if (voice) {
          this.mike.setVoice(voice);
          
          // Apply custom voice settings
          const options = {
            pitch: parseFloat(this.voicePitch.value),
            rate: parseFloat(this.voiceSpeed.value),
            volume: parseFloat(this.voiceVolume.value)
          };
          
          this.mike.speak("This is a test of the analog horror generator voice.", options);
        }
      }
    });
    
    // Generate button
    this.generateBtn.addEventListener('click', () => {
      if (!this.isPlaying) {
        this.text = this.horrorText.value;
        
        // Check for secret codes
        this.checkSecretCodes(this.text);
        
        this.playHorror();
      }
    });
    
    // Stop button
    this.stopBtn.addEventListener('click', () => {
      this.stopHorror();
    });
    
    // Download video button
    this.downloadVideoBtn.addEventListener('click', () => {
      this.downloadVideo();
    });
    
    // Glitch intensity slider
    this.glitchIntensity.addEventListener('input', () => {
      this.glitchValue.textContent = `${this.glitchIntensity.value}%`;
      this.applyGlitchEffects(this.glitchIntensity.value);
    });
    
    // Glitch theme selection
    this.glitchTheme.addEventListener('change', () => {
      this.applyGlitchTheme(this.glitchTheme.value);
      
      // Hide custom controls when preset is selected
      document.getElementById('custom-theme-controls').style.display = 'none';
    });
    
    // Custom theme button
    document.getElementById('custom-theme-btn').addEventListener('click', () => {
      const customControls = document.getElementById('custom-theme-controls');
      customControls.style.display = customControls.style.display === 'none' ? 'block' : 'none';
    });
    
    // Save custom theme
    document.getElementById('save-theme-btn').addEventListener('click', () => {
      this.applyCustomTheme();
      this.showNotification('Custom theme applied!');
    });
    
    // Custom theme sliders
    document.getElementById('custom-flicker').addEventListener('input', (e) => {
      document.getElementById('custom-flicker-value').textContent = `${e.target.value}%`;
    });
    
    document.getElementById('custom-distortion').addEventListener('input', (e) => {
      document.getElementById('custom-distortion-value').textContent = `${e.target.value}%`;
    });
    
    document.getElementById('custom-noise').addEventListener('input', (e) => {
      document.getElementById('custom-noise-value').textContent = `${e.target.value}%`;
    });
    
    document.getElementById('custom-color-shift').addEventListener('input', (e) => {
      document.getElementById('custom-color-shift-value').textContent = `${e.target.value}%`;
    });
    
    // Logo controls
    this.showEasLogo.addEventListener('change', () => {
      if (this.showEasLogo.checked) {
        this.broadcastLogo.style.display = 'block';
        this.broadcastLogo.querySelector('img').src = '/logo1.png';
        
        // Uncheck the other logo
        if (this.showBlubberLogo.checked) {
          this.showBlubberLogo.checked = false;
        }
      } else {
        this.broadcastLogo.style.display = 'none';
      }
    });
    
    this.showBlubberLogo.addEventListener('change', () => {
      if (this.showBlubberLogo.checked) {
        this.broadcastLogo.style.display = 'block';
        this.broadcastLogo.querySelector('img').src = '/BlubberLogo.png';
        
        // Uncheck the other logo
        if (this.showEasLogo.checked) {
          this.showEasLogo.checked = false;
        }
      } else {
        this.broadcastLogo.style.display = 'none';
      }
    });
    
    // Voice pitch slider
    this.voicePitch?.addEventListener('input', () => {
      this.voicePitchValue.textContent = parseFloat(this.voicePitch.value).toFixed(1);
    });
    
    // Voice speed slider
    this.voiceSpeed?.addEventListener('input', () => {
      this.voiceSpeedValue.textContent = parseFloat(this.voiceSpeed.value).toFixed(1);
    });
    
    // Voice volume slider
    this.voiceVolume?.addEventListener('input', () => {
      this.voiceVolumeValue.textContent = parseFloat(this.voiceVolume.value).toFixed(1);
    });
    
    // AI Writer button
    this.aiWriterBtn.addEventListener('click', () => {
      const prompt = this.aiPromptInput.value.trim();
      if (prompt) {
        this.generateAIBroadcast(prompt);
      }
    });
    
    // Jump scare button
    document.getElementById('jumpscare-btn')?.addEventListener('click', () => {
      this.switchTab('broadcast');
      this.playJumpscare();
    });
    
    // Assets tab functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('#upload-asset-btn')) {
        document.getElementById('asset-file-input').click();
      }
    });
    
    document.getElementById('asset-file-input')?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleAssetUpload(e.target.files[0]);
      }
    });
    
    // Setup event listener for hijack duration
    this.hijackDuration = document.getElementById('hijack-duration');
    this.hijackValue = document.getElementById('hijack-value');
    this.hijackDurationValue = document.getElementById('hijack-duration-value');

    this.hijackDuration.addEventListener('input', () => {
      this.hijackDurationValue.textContent = `${this.hijackDuration.value}s`;
    });
    
    // VHS strength slider
    this.vhsStrength?.addEventListener('input', () => {
      this.vhsValue.textContent = `${this.vhsStrength.value}%`;
      this.applyVhsStrength(this.vhsStrength.value);
    });
    
    // Scanline speed slider
    this.scanlineSpeed?.addEventListener('input', () => {
      this.scanlineSpeedValue.textContent = this.scanlineSpeed.value;
      this.applyScanlineSpeed(this.scanlineSpeed.value);
    });
    
    // Scanline size slider
    this.scanlineSize?.addEventListener('input', () => {
      this.scanlineSizeValue.textContent = `${this.scanlineSize.value}px`;
      this.applyScanlineSize(this.scanlineSize.value);
    });
    
    // Scanline color picker
    this.scanlineColor = document.getElementById('scanline-color');
    this.scanlineColor?.addEventListener('input', () => {
      this.applyScanlineColor(this.scanlineColor.value);
    });
    
    // Scanline count slider
    this.scanlineCount = document.getElementById('scanline-count');
    this.scanlineCountValue = document.getElementById('scanline-count-value');
    this.scanlineCount?.addEventListener('input', () => {
      this.scanlineCountValue.textContent = this.scanlineCount.value;
      this.applyScanlineCount(this.scanlineCount.value);
    });
    
    // Scanline distance slider
    this.scanlineDistance = document.getElementById('scanline-distance');
    this.scanlineDistanceValue = document.getElementById('scanline-distance-value');
    this.scanlineDistance?.addEventListener('input', () => {
      this.scanlineDistanceValue.textContent = `${this.scanlineDistance.value}%`;
      this.applyScanlineDistance(this.scanlineDistance.value);
    });
    
    // Analyse broadcast button
    this.analyseBtn?.addEventListener('click', () => {
      this.analyseText();
    });
  }
  
  async initVotingAdmin() {
    // Standalone fallback: check localStorage for an "uploadUsername" to determine admin access
    const localUser = localStorage.getItem('uploadUsername') || localStorage.getItem('currentUser') || null;
    if (localUser && localUser === 'blubber') {
      document.getElementById('admin-controls').style.display = 'block';
      
      document.getElementById('add-feature-btn').addEventListener('click', () => {
        document.getElementById('feature-form').style.display = 'block';
      });
      
      document.getElementById('save-results-btn').addEventListener('click', () => {
        const results = {
          winner: {
            feature: document.getElementById('winning-feature').value,
            votes: parseInt(document.getElementById('winning-votes').value) || 0
          },
          runnerUp1: {
            feature: document.getElementById('runner-up-1').value,
            votes: parseInt(document.getElementById('runner-up-1-votes').value) || 0
          },
          runnerUp2: {
            feature: document.getElementById('runner-up-2').value,
            votes: parseInt(document.getElementById('runner-up-2-votes').value) || 0
          }
        };
        
        localStorage.setItem('voting_results', JSON.stringify(results));
        this.showNotification('Voting results saved successfully!');
        document.getElementById('feature-form').style.display = 'none';
      });
    }
  }
  
  switchTab(tabId) {
    document.querySelectorAll('.main-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabId}-content`);
    });
    
    if (tabId === 'bugs') {
      this.populateBugReportsTab();
    }
  }
  
  async generateAIBroadcast(prompt) {
    // Local fallback AI generator so page works without websim
    this.aiWriterBtn.disabled = true;
    this.aiProgress.style.opacity = '1';
    this.aiProgress.style.width = '40%';
    
    try {
      // Simple rule-based "AI" writer using prompt heuristics and templates
      const templates = [
        `EMERGENCY NOTICE\n\nAttention: ${prompt} has been reported in this area. Remain indoors and await instructions.\n\nWARNING: Unauthorized transmissions detected.`,
        `SYSTEM ALERT\n\n${prompt} — anomalous readings indicate elevated risk. Avoid contact and report any sightings immediately.\n\nNOTICE: This broadcast will repeat.`,
        `BROADCAST INTERRUPTION\n\nWe are receiving interference while reporting on ${prompt}. Do not attempt to record this transmission.\n\nWARNING: Do not leave your residence.`,
        `UNIDENTIFIED ACTIVITY\n\nReports concerning ${prompt} suggest several missing persons. Authorities are investigating.\n\nNOTICE: If you see anything, do not approach.`
      ];
      
      // Pick template and inject some variation
      const choose = templates[Math.floor(Math.random() * templates.length)];
      const variations = [
        `\n\nADVISORY: Maintain distance.`,
        `\n\nCAUTION: This signal may alter perception.`,
        `\n\nNOTICE: This broadcast contains sensitive content.`,
        `\n\nSTAY ALERT.`
      ];
      const variation = variations[Math.floor(Math.random() * variations.length)];
      
      // If prompt is long, use parts of it to make text feel tailored
      const shortPrompt = prompt.split(/[.,;]\s*/)[0].slice(0, 60);
      const finalText = `${choose.replace(prompt, shortPrompt)}${variation}\n\n-- EMERGENCY BROADCAST SYSTEM --`;
      
      // Simulate progress
      await new Promise(r => setTimeout(r, 600));
      this.horrorText.value = finalText;
      
      this.aiProgress.style.width = '100%';
      setTimeout(() => {
        this.aiProgress.style.opacity = '0';
        this.aiProgress.style.width = '0%';
        this.aiWriterBtn.disabled = false;
      }, 800);
      
    } catch (error) {
      console.error('Local AI generation error:', error);
      this.showNotification('Failed to generate AI broadcast', 'error');
      this.aiProgress.style.opacity = '0';
      this.aiProgress.style.width = '0%';
      this.aiWriterBtn.disabled = false;
    }
  }
  
  populateVoiceList() {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.updateVoiceList(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        this.updateVoiceList(voices);
      };
    }
  }
  
  updateVoiceList(voices) {
    const microsoftVoices = voices.filter(voice => voice.name.includes('Microsoft'));
    const googleVoices = voices.filter(voice => voice.name.includes('Google'));
    const otherVoices = voices.filter(voice => !voice.name.includes('Microsoft') && !voice.name.includes('Google'));
    
    let options = '';
    
    if (microsoftVoices.length > 0) {
      options += '<optgroup label="Microsoft Voices">';
      microsoftVoices.forEach(voice => {
        options += `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
      });
      options += '</optgroup>';
    }
    
    if (googleVoices.length > 0) {
      options += '<optgroup label="Google Voices">';
      googleVoices.forEach(voice => {
        options += `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
      });
      options += '</optgroup>';
    }
    
    if (otherVoices.length > 0) {
      options += '<optgroup label="Other Voices">';
      otherVoices.forEach(voice => {
        options += `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
      });
      options += '</optgroup>';
    }
    
    this.voiceSelect.innerHTML = options;
    
    const defaultVoice = microsoftVoices.find(voice => voice.name.includes('David')) || 
                          microsoftVoices.find(voice => voice.name.includes('Sam')) || 
                          microsoftVoices.find(voice => voice.name.includes('Zira')) || 
                          microsoftVoices[0] || 
                          voices.find(voice => voice.default) || 
                          voices[0];
    
    if (defaultVoice) {
      this.voiceSelect.value = defaultVoice.name;
      this.mike.setVoice(defaultVoice);
    }
  }
  
  playJumpscare() {
    this.stopHorror();
    
    const horrorImage = document.querySelector('.horror-image');
    horrorImage.style.backgroundImage = `url('/ghost.png')`;
    horrorImage.style.opacity = '1';
    
    const dialog = [
      { text: "BOO!", duration: 800 },
      { text: "Oh, I didn't scare you?", duration: 2000 },
      { text: "Aw...", duration: 1000 },
      { text: "I guess I'll leave then...", duration: 2000 },
      { text: "", duration: 500 }
    ];
    
    let currentDialogIndex = 0;
    
    const showNextDialog = async () => {
      if (currentDialogIndex < dialog.length) {
        const { text, duration } = dialog[currentDialogIndex];
        this.outputText.textContent = text;
        
        if (text) {
          await this.mike.speak(text);
        }
        
        setTimeout(() => {
          currentDialogIndex++;
          showNextDialog();
        }, duration);
      } else {
        horrorImage.style.opacity = '0';
        this.outputText.textContent = '';
      }
    };
    
    showNextDialog();
  }
  
  showWarningPopup() {
    const warningPopup = document.createElement('div');
    warningPopup.className = 'warning-popup';
    warningPopup.innerHTML = `
      <div class="warning-popup-content">
        <h2>Vote for New Features!</h2>
        <p>Help shape the future of the Analog Horror Generator by voting for new features!</p>
        <p>Click below to visit the official voting website.</p>
        <button id="go-vote">Go to Voting Website</button>
      </div>
    `;
    
    document.body.appendChild(warningPopup);
    
    document.getElementById('go-vote').addEventListener('click', () => {
      window.location.href = 'https://websim.com/@blubber/analog-horror-broadcast-generator-feature-voting';
    });
  }
  
  showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
  
  updateViewCount() {
    const viewCountAll = document.getElementById('view-count-all');
    if (viewCountAll) {
      viewCountAll.textContent = '24k+';
    }
    
    const viewCountMonth = document.getElementById('view-count-month');
    const viewCountWeek = document.getElementById('view-count-week');
    const viewCountDay = document.getElementById('view-count-day');
    
    if (viewCountMonth) viewCountMonth.parentElement.style.display = 'none';
    if (viewCountWeek) viewCountWeek.parentElement.style.display = 'none';
    if (viewCountDay) viewCountDay.parentElement.style.display = 'none';
  }
  
  startViewCountTimer() {
    let secondsRemaining = 60;
    
    const updateTimer = () => {
      const timerDisplay = document.getElementById('view-next-update');
      if (timerDisplay) {
        timerDisplay.textContent = `${secondsRemaining}s`;
      }
      
      secondsRemaining -= 1;
      
      if (secondsRemaining < 0) {
        secondsRemaining = 60;
        this.updateViewCount();
      }
    };
    
    updateTimer();
    
    setInterval(updateTimer, 1000);
  }
  
  initTabs() {
  }
  
  async playHorror() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.generateBtn.disabled = true;
    this.stopBtn.disabled = false;
    this.downloadVideoBtn.disabled = true;
    
    this.applyGlitchTheme(this.glitchTheme.value);
    
    const glitchLevel = parseInt(this.glitchIntensity.value);
    this.applyGlitchEffects(glitchLevel);
    this.applyVhsStrength(this.vhsStrength.value);
    this.applyScanlineSpeed(this.scanlineSpeed.value);
    this.applyScanlineSize(this.scanlineSize.value);
    
    const lines = this.text.split('\n').filter(line => line.trim() !== '');
    let currentIndex = 0;
    const totalLines = lines.length;
    
    if (this.hijackTriggered) {
      this.hijackTriggered = false;
    }
    
    const displayNextLine = async () => {
      if (!this.isPlaying || currentIndex >= totalLines) {
        this.stopHorror();
        return;
      }
      
      const line = lines[currentIndex];
      currentIndex++;
      
      if (line.includes("{hijack}")) {
        const cleanLine = line.replace("{hijack}", "");
        
        this.outputText.textContent = cleanLine;
        
        const horrorImage = document.querySelector('.horror-image');
        horrorImage.innerHTML = ''; 
        horrorImage.style.opacity = '0';
        
        if (this.analysisResults && this.analysisResults.length > 0) {
          const matchingAnalysis = this.analysisResults.find(a => a.text.includes(cleanLine) || cleanLine.includes(a.text));
          if (matchingAnalysis && matchingAnalysis.assets.length > 0) {
            this.displayAssetsWithSpacing(horrorImage, matchingAnalysis.assets);
          } else {
            this.showRegularAssets(cleanLine, horrorImage);
          }
        } else {
          this.showRegularAssets(cleanLine, horrorImage);
        }
        
        await this.mike.speak(cleanLine, {
          pitch: parseFloat(this.voicePitch.value),
          rate: parseFloat(this.voiceSpeed.value),
          volume: parseFloat(this.voiceVolume.value)
        });
        
        this.startHijack();
        return;
      }
      
      this.outputText.textContent = line;
      
      const horrorImage = document.querySelector('.horror-image');
      horrorImage.innerHTML = ''; 
      horrorImage.style.opacity = '0';
      
      if (this.analysisResults && this.analysisResults.length > 0) {
        const matchingAnalysis = this.analysisResults.find(a => a.text.includes(line) || line.includes(a.text));
        
        if (matchingAnalysis && matchingAnalysis.assets.length > 0) {
          this.displayAssetsWithSpacing(horrorImage, matchingAnalysis.assets);
        } else {
          this.showRegularAssets(line, horrorImage);
        }
      } else {
        this.showRegularAssets(line, horrorImage);
      }
      
      await this.mike.speak(line, {
        pitch: parseFloat(this.voicePitch.value),
        rate: parseFloat(this.voiceSpeed.value),
        volume: parseFloat(this.voiceVolume.value)
      });
      
      displayNextLine();
    };
    
    displayNextLine();
  }
  
  displayAssetsWithSpacing(container, assets) {
    const areas = [
      { x: -120, y: -120 }, 
      { x: 0, y: -120 },    
      { x: 120, y: -120 },  
      { x: -120, y: 0 },    
      { x: 0, y: 0 },       
      { x: 120, y: 0 },     
      { x: -120, y: 120 },  
      { x: 0, y: 120 },     
      { x: 120, y: 120 }    
    ];
    
    const neededAreas = assets.reduce((sum, asset) => sum + (asset.count || 1), 0);
    
    if (neededAreas > areas.length) {
      const gridSize = Math.ceil(Math.sqrt(neededAreas));
      const spacing = 120;
      
      areas.length = 0;
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          areas.push({
            x: (x - Math.floor(gridSize/2)) * spacing,
            y: (y - Math.floor(gridSize/2)) * spacing
          });
        }
      }
    }
    
    const shuffledAreas = [...areas].sort(() => Math.random() - 0.5);
    
    container.innerHTML = '';
    
    let usedAreas = 0;
    assets.forEach(asset => {
      const imageName = asset.name;
      const count = asset.count || 1;
      
      if (this.imageMap[imageName] && this.imageMap[imageName].enabled) {
        for (let i = 0; i < count && usedAreas < shuffledAreas.length; i++) {
          const imgElement = document.createElement('div');
          imgElement.className = 'horror-image';
          imgElement.style.backgroundImage = `url(${this.imageMap[imageName].path})`;
          imgElement.style.opacity = '1';
          imgElement.style.position = 'absolute';
          
          const area = shuffledAreas[usedAreas];
          usedAreas++;
          
          const offsetX = area.x + (Math.random() * 20 - 10);
          const offsetY = area.y + (Math.random() * 20 - 10);
          imgElement.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
          
          if (this.smoothImages.checked) {
            imgElement.classList.add('image-transition');
          }
          
          container.appendChild(imgElement);
        }
        
        container.style.opacity = '1';
      }
    });
  }
  
  showRegularAssets(line, horrorImage) {
    const results = this.analyzeText(line);
    
    if (results.length > 0) {
      this.displayAssetsWithSpacing(horrorImage, results.map(result => ({
        name: result.imageName,
        count: result.count
      })));
    } else {
      for (const [trigger, imageName] of Object.entries(this.triggerWords)) {
        const triggerRegex = new RegExp(`\\b(${trigger})\\b`, 'i');
        if (triggerRegex.test(line) && this.imageMap[imageName] && this.imageMap[imageName].enabled) {
          horrorImage.style.backgroundImage = `url(${this.imageMap[imageName].path})`;
          horrorImage.style.opacity = '1';
          
          if (this.smoothImages.checked) {
            horrorImage.classList.add('image-transition');
          } else {
            horrorImage.classList.remove('image-transition');
          }
          break;
        }
      }
    }
  }
  
  analyzeText(text) {
    const results = [];
    const lowerText = text.toLowerCase();
    
    const pattern1 = /(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(\w+)/gi;
    let match1;
    
    while ((match1 = pattern1.exec(text)) !== null) {
      const numberWord = match1[1].toLowerCase();
      const noun = match1[2].toLowerCase();
      
      const numberMap = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      
      let count = parseInt(match1[1]);
      if (isNaN(count) && numberMap[numberWord]) {
        count = numberMap[numberWord];
      }
      
      let foundImage = null;
      for (const [trigger, imageName] of Object.entries(this.triggerWords)) {
        const triggerRegex = new RegExp(`\\b(${trigger})\\b`, 'i');
        if (triggerRegex.test(noun) && this.imageMap[imageName] && this.imageMap[imageName].enabled) {
          foundImage = imageName;
          break;
        }
      }
      
      if (!foundImage) {
        for (const [name, data] of Object.entries(this.imageMap)) {
          if (name.startsWith('custom_') && data.enabled && 
              (noun.includes(name.replace('custom_', '')) || 
               name.replace('custom_', '').includes(noun))) {
            foundImage = name;
            break;
          }
        }
      }
      
      if (foundImage) {
        results.push({ imageName: foundImage, count: count });
      }
    }
    
    const pattern2 = /(see|watch|observe|found|spot|notice|view|witness|discover|find|there are|there is|I see|you see)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(\w+)/gi;
    let match2;
    
    while ((match2 = pattern2.exec(text)) !== null) {
      const verb = match2[1].toLowerCase();
      const numberWord = match2[2].toLowerCase();
      const noun = match2[3].toLowerCase();
      
      const numberMap = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      
      let count = parseInt(match2[2]);
      if (isNaN(count) && numberMap[numberWord]) {
        count = numberMap[numberWord];
      }
      
      let foundImage = null;
      for (const [trigger, imageName] of Object.entries(this.triggerWords)) {
        const triggerRegex = new RegExp(`\\b(${trigger})\\b`, 'i');
        if (triggerRegex.test(noun) && this.imageMap[imageName] && this.imageMap[imageName].enabled) {
          foundImage = imageName;
          break;
        }
      }
      
      if (!foundImage) {
        for (const [name, data] of Object.entries(this.imageMap)) {
          if (name.startsWith('custom_') && data.enabled && 
              (noun.includes(name.replace('custom_', '')) || 
               name.replace('custom_', '').includes(noun))) {
            foundImage = name;
            break;
          }
        }
      }
      
      if (foundImage) {
        results.push({ imageName: foundImage, count: count });
      }
      
      let verbImage = null;
      for (const [trigger, imageName] of Object.entries(this.triggerWords)) {
        const triggerRegex = new RegExp(`\\b(${trigger})\\b`, 'i');
        if (triggerRegex.test(verb) && this.imageMap[imageName] && this.imageMap[imageName].enabled) {
          verbImage = imageName;
          break;
        }
      }
      
      if (!verbImage) {
        for (const [name, data] of Object.entries(this.imageMap)) {
          if (name.startsWith('custom_') && data.enabled && 
              (verb.includes(name.replace('custom_', '')) || 
               name.replace('custom_', '').includes(verb))) {
            verbImage = name;
            break;
          }
        }
      }
      
      if (verbImage) {
        results.push({ imageName: verbImage, count: 1 });
      }
    }
    
    for (const [trigger, imageName] of Object.entries(this.triggerWords)) {
      const triggerRegex = new RegExp(`\\b(${trigger})\\b`, 'i');
      if (triggerRegex.test(lowerText) && 
          this.imageMap[imageName] && 
          this.imageMap[imageName].enabled && 
          !results.some(r => r.imageName === imageName)) {
        results.push({ imageName: imageName, count: 1 });
      }
    }
    
    return results;
  }
  
  stopHorror() {
    this.isPlaying = false;
    speechSynthesis.cancel();
    
    this.generateBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.downloadVideoBtn.disabled = false;
    
    this.outputText.textContent = '';
    document.querySelector('.horror-image').style.opacity = '0';
    
    if (this.hijackTimer) {
      clearTimeout(this.hijackTimer);
      this.hijackTimer = null;
      
      const hijackImage = document.querySelector('.hijack-image');
      const hijackText = document.querySelector('.hijack-text');
      
      if (hijackImage) hijackImage.remove();
      if (hijackText) hijackText.remove();
      
      this.screenEffect.classList.remove('hijack-effect');
    }
  }
  
  applyGlitchTheme(theme) {
    this.screenEffect.classList.remove('theme-classic', 'theme-vhs', 'theme-digital', 'theme-interference', 'theme-corrupted', 
                                       'theme-vintage', 'theme-paranormal', 'theme-dystopian', 'theme-alien', 'theme-supernatural');
    
    this.screenEffect.classList.add(`theme-${theme}`);
    
    this.applyVhsStrength(this.vhsStrength.value);
    this.applyScanlineSpeed(this.scanlineSpeed.value);
    this.applyScanlineSize(this.scanlineSize.value);
  }
  
  applyVhsStrength(strength) {
    this.screenEffect.classList.remove('vhs-effect-weak', 'vhs-effect-medium', 'vhs-effect-strong', 'vhs-effect-extreme');
    
    if (strength > 0 && strength <= 25) {
      this.screenEffect.classList.add('vhs-effect-weak');
    } else if (strength > 25 && strength <= 50) {
      this.screenEffect.classList.add('vhs-effect-medium');
    } else if (strength > 50 && strength <= 75) {
      this.screenEffect.classList.add('vhs-effect-strong');
    } else if (strength > 75) {
      this.screenEffect.classList.add('vhs-effect-extreme');
    }
  }
  
  applyScanlineSpeed(speed) {
    if (this.scanLine) {
      const duration = 11 - speed; 
      this.scanLine.style.animationDuration = `${duration}s`;
      
      document.querySelectorAll('.additional-scanline').forEach(line => {
        line.style.animationDuration = `${duration}s`;
      });
    }
  }
  
  applyScanlineSize(size) {
    if (this.scanLine) {
      this.scanLine.style.height = `${size}px`;
      
      document.querySelectorAll('.additional-scanline').forEach(line => {
        line.style.height = `${size}px`;
      });
    }
  }
  
  applyGlitchEffects(level) {
    this.screenEffect.classList.remove('flicker-effect', 'color-shift', 'shake-effect', 
                                      'lag-effect', 'extreme-lag', 'extreme-static', 
                                      'extreme-color-shift', 'extreme-shake');
    
    if (level > 10) {
      this.screenEffect.classList.add('flicker-effect');
    }
    
    if (level > 30) {
      this.screenEffect.classList.add('color-shift');
    }
    
    if (level > 50) {
      this.screenEffect.classList.add('shake-effect');
    }
    
    if (level > 70) {
      this.screenEffect.classList.add('lag-effect');
    }
    
    if (level > 90) {
      this.screenEffect.classList.add('extreme-lag', 'extreme-static', 
                                     'extreme-color-shift', 'extreme-shake');
    }
  }
  
  applyCustomTheme() {
    this.screenEffect.classList.remove('theme-classic', 'theme-vhs', 'theme-digital', 'theme-interference', 'theme-corrupted');
    
    const flickerValue = document.getElementById('custom-flicker').value;
    const distortionValue = document.getElementById('custom-distortion').value;
    const noiseValue = document.getElementById('custom-noise').value;
    const colorShiftValue = document.getElementById('custom-color-shift').value;
    
    this.screenEffect.style.animation = flickerValue > 10 ? `flicker ${(100-flickerValue)/100}s infinite` : 'none';
    
    const blurAmount = distortionValue / 100 * 3; 
    const scaleAmount = 1 + (distortionValue / 100 * 0.1); 
    this.screenEffect.style.filter = `blur(${blurAmount}px) scale(${scaleAmount})`;
    
    this.noise.style.opacity = noiseValue / 100 * 0.3; 
    
    if (colorShiftValue > 10) {
      const duration = 3 - (colorShiftValue / 100 * 2.5); 
      this.screenEffect.style.animation += ` colorShift ${duration}s infinite`;
    }
    
    this.glitchTheme.value = 'custom';
    if (!this.glitchTheme.querySelector('option[value="custom"]')) {
      const customOption = document.createElement('option');
      customOption.value = 'custom';
      customOption.textContent = 'Custom Theme';
      this.glitchTheme.appendChild(customOption);
    }
  }
  
  applyScanlineColor(color) {
    if (this.scanLine) {
      this.scanLine.style.background = color;
    }
    
    document.querySelectorAll('.additional-scanline').forEach(line => {
      line.style.background = color;
    });
  }
  
  applyScanlineCount(count) {
    document.querySelectorAll('.additional-scanline').forEach(line => line.remove());
    
    if (count > 1) {
      const screenEffect = document.querySelector('.screen-effect');
      const distance = parseInt(this.scanlineDistance?.value || 10); 
      
      for (let i = 1; i < count; i++) {
        const newLine = document.createElement('div');
        newLine.className = 'scan-line additional-scanline';
        newLine.style.top = `${distance * i}%`; 
        
        if (this.scanLine) {
          newLine.style.height = this.scanLine.style.height || 
                                 window.getComputedStyle(this.scanLine).height;
          newLine.style.background = this.scanLine.style.background || 
                                     window.getComputedStyle(this.scanLine).background;
          newLine.style.animationDuration = this.scanLine.style.animationDuration || 
                                           window.getComputedStyle(this.scanLine).animationDuration;
        }
        
        screenEffect.appendChild(newLine);
      }
    }
  }
  
  applyScanlineDistance(distance) {
    document.querySelectorAll('.additional-scanline').forEach((line, index) => {
      line.style.top = `${distance * (index + 1)}%`;
    });
  }
  
  startHijack() {
    const hijackDuration = parseInt(this.hijackDuration.value) * 1000; 
    
    this.screenEffect.classList.add('hijack-effect');
    
    this.hijackMode = this.selectHijackMode();
    
    const hijackImage = document.createElement('div');
    hijackImage.className = 'hijack-image';
    
    if (this.hijackMode === 'face') {
      const hijackImages = ['/hijack1.png', '/hijack2.png', '/hijack3.png', '/hijack4.png'];
      const selectedImage = hijackImages[Math.floor(Math.random() * hijackImages.length)];
      hijackImage.style.backgroundImage = `url(${selectedImage})`;
    } else if (this.hijackMode === 'helicopter') {
      hijackImage.style.backgroundImage = `url('/helicopter.png')`;
      hijackImage.style.animation = 'helicopterFly 15s linear infinite';
    } else if (this.hijackMode === 'video') {
      hijackImage.style.backgroundImage = `url('/video.png')`;
      hijackImage.style.animation = 'videoGlitch 0.5s steps(3) infinite';
    } else if (this.hijackMode === 'village') {
      hijackImage.style.backgroundImage = `url('/forest.png')`;
      hijackImage.style.animation = 'none';
      
      const house1 = document.createElement('div');
      house1.className = 'hijack-house';
      house1.style.backgroundImage = `url('/House.png')`;
      house1.style.left = '15%';
      house1.style.top = '30%';
      this.screenEffect.appendChild(house1);
      
      const house2 = document.createElement('div');
      house2.className = 'hijack-house';
      house2.style.backgroundImage = `url('/House.png')`;
      house2.style.left = '55%';
      house2.style.top = '40%';
      this.screenEffect.appendChild(house2);
      
      const house3 = document.createElement('div');
      house3.className = 'hijack-house';
      house3.style.backgroundImage = `url('/House.png')`;
      house3.style.left = '75%';
      house3.style.top = '35%';
      this.screenEffect.appendChild(house3);
    }
    
    this.screenEffect.appendChild(hijackImage);
    
    const hijackText = document.createElement('div');
    hijackText.className = 'hijack-text';
    
    const hijackMessage = this.getHijackMessage(this.hijackMode);
    hijackText.textContent = hijackMessage;
    this.screenEffect.appendChild(hijackText);
    
    this.mike.speak(hijackMessage.replace('\n', ' '), {
      pitch: 0.7, 
      rate: 0.8,  
      volume: 1.5 
    });
    
    this.hijackTimer = setTimeout(() => {
      hijackImage.remove();
      hijackText.remove();
      this.screenEffect.classList.remove('hijack-effect');
      
      document.querySelectorAll('.hijack-house').forEach(el => el.remove());
      
      this.hijackMode = null;
      
      this.isPlaying = true;
      displayNextLine();
    }, hijackDuration);
  }
  
  selectHijackMode() {
    const hijackModes = ['face', 'helicopter', 'video', 'village'];
    
    return hijackModes[Math.floor(Math.random() * hijackModes.length)];
  }
  
  getHijackMessage(mode) {
    const messagesByMode = {
      'face': [
        "WE HAVE TAKEN CONTROL\nDO NOT RESIST",
        "YOU ARE BEING WATCHED\nWE SEE ALL",
        "THEY ARE AMONG US\nTRUST NO ONE",
        "SOMETHING IS COMING\nNOTHING CAN STOP IT",
        "YOUR REALITY IS A LIE\nWAKE UP"
      ],
      'helicopter': [
        "EVACUATION IN PROGRESS\nPROCEED TO SAFETY ZONES",
        "AERIAL SURVEILLANCE ACTIVE\nREMAIN INDOORS",
        "MILITARY PRESENCE DETECTED\nAVOID ALL CONTACT",
        "AIR EXTRACTION REQUESTED\nSTAND BY FOR COORDINATES",
        "UNKNOWN AIRCRAFT DETECTED\nNOT ONE OF OURS"
      ],
      'video': [
        "BROADCAST SIGNAL INTRUSION\nUNAUTHORIZED TRANSMISSION",
        "FOOTAGE RESTRICTED\nVIEWING IS PROHIBITED",
        "WHAT YOU ARE SEEING IS REAL\nSAVE THIS EVIDENCE",
        "THE TAPE CONTAINS TRUTH\nTHEY DON'T WANT YOU TO SEE",
        "RECORDING IN PROGRESS\nYOU ARE THE SUBJECT"
      ],
      'village': [
        "SOMETHING HAPPENED IN THE VILLAGE\nNO SURVIVORS FOUND",
        "DO NOT ENTER THE VILLAGE\nQUARANTINE IN EFFECT",
        "THE VILLAGE IS EMPTY\nBUT WINDOWS STILL LIGHT UP AT NIGHT",
        "WE THOUGHT IT WAS ABANDONED\nBUT WE HEARD VOICES",
        "VILLAGE POPULATION: 0\nREPORTED SIGHTINGS: 347"
      ]
    };
    
    const messages = messagesByMode[mode] || messagesByMode['face'];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  checkSecretCodes(text) {
    if (text.includes("AManHasFallenIntoTheRiver")) {
      this.playRiverFallAnimation();
    }
    
    if (text.includes("{hijack}")) {
      this.text = text.replace("{hijack}", "");
      this.hijackTriggered = true;
    }
  }
  
  playRiverFallAnimation() {
    const audio = new Audio('/FellIntoTheRiver.mp3');
    
    const man = document.createElement('div');
    man.className = 'falling-man';
    man.style.backgroundImage = "url('/Man.png')";
    
    const screenEffect = document.querySelector('.screen-effect');
    screenEffect.appendChild(man);
    
    audio.play();

    setTimeout(() => {
      const helicopter = document.createElement('div');
      helicopter.className = 'hijack-image';
      helicopter.style.backgroundImage = "url('/helicopter.png')";
      helicopter.style.animation = 'helicopterFly 15s linear forwards';
      helicopter.style.zIndex = '1001';
      screenEffect.appendChild(helicopter);
      
      const rescueText = document.createElement('div');
      rescueText.className = 'hijack-text';
      rescueText.textContent = "RESCUE MISSION INITIATED\nHELICOPTER DEPLOYED";
      rescueText.style.fontSize = "1.5rem";
      rescueText.style.zIndex = '1002';
      screenEffect.appendChild(rescueText);
      
      setTimeout(() => {
        rescueText.textContent = "MAN RESCUED FROM RIVER\nMISSION SUCCESSFUL";
        
        setTimeout(() => {
          helicopter.remove();
          rescueText.remove();
        }, 3000);
      }, 8000);
    }, 2000);
    
    setTimeout(() => {
      man.remove();
    }, 4000);
  }
  
  async downloadVideo() {
    const filename = prompt('Enter a name for your video:', 'horror-broadcast') || 'horror-broadcast';
    
    this.showNotification('Preparing video for download, please wait...');
    this.showNotification('Note: Video download feature is experimental and may not work in all browsers', 'warning');
    
    const videoContainer = document.getElementById('video-output');
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = videoContainer.offsetWidth;
    canvas.height = videoContainer.offsetHeight;
    
    const fps = 30;
    const duration = 10; 
    const totalFrames = fps * duration;
    let frameCount = 0;
    
    const stream = canvas.captureStream(fps);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 2500000 
    });
    
    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };
    
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `${filename}.webm`;
      a.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      this.showNotification('Video download complete!');
      alert('Important: Video playback may require a media player like VLC. If the file appears corrupted, try using a different browser or update your video player.');
    };
    
    recorder.start();
    
    const text = this.horrorText.value.split('\n')[0] || 'ANALOG HORROR';
    this.outputText.textContent = text;
    
    const horrorImage = document.querySelector('.horror-image');
    let imageFound = false;
    
    for (const [name, imageData] of Object.entries(this.imageMap)) {
      if (imageData.enabled) {
        if (horrorImage) {
          horrorImage.style.backgroundImage = `url('${imageData.path}')`;
          horrorImage.style.opacity = '1';
          imageFound = true;
          break;
        }
      }
    }
    
    if (!imageFound && horrorImage) {
      horrorImage.style.backgroundImage = `url('/Warning.png')`;
      horrorImage.style.opacity = '1';
    }
    
    const audioStarted = false;
    
    this.mike.speak(text, {
      pitch: parseFloat(this.voicePitch.value),
      rate: parseFloat(this.voiceSpeed.value),
      volume: parseFloat(this.voiceVolume.value),
      onStart: () => {
        audioStarted = true;
      }
    });
    
    const captureFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      html2canvas(videoContainer).then(renderedCanvas => {
        ctx.drawImage(renderedCanvas, 0, 0, canvas.width, canvas.height);
        
        frameCount++;
        
        if (frameCount < totalFrames) {
          if (frameCount % 15 === 0) {
            this.screenEffect.classList.toggle('flicker-effect');
          }
          
          requestAnimationFrame(captureFrame);
        } else {
          recorder.stop();
          
          this.outputText.textContent = '';
          if (horrorImage) {
            horrorImage.style.opacity = '0';
          }
          this.screenEffect.classList.remove('flicker-effect');
        }
      });
    };
    
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.onload = () => {
      captureFrame();
    };
    document.head.appendChild(script);
  }
  
  handleAssetUpload(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageName = prompt('Enter a name for this asset:');
      if (!imageName) return;
      
      const previewContainer = document.querySelector('.upload-preview');
      previewContainer.innerHTML = `
        <div class="preview-item">
          <img src="${e.target.result}" alt="${imageName}">
          <p>${imageName}</p>
        </div>
      `;
      
      const customKey = `custom_${Date.now()}`;
      this.imageMap[customKey] = {
        path: e.target.result,
        enabled: true
      };
      
      this.triggerWords[imageName.toLowerCase()] = customKey;
      
      this.showNotification(`Added "${imageName}" to your assets`);
      
      this.db.handleAssetUpload(file, imageName, e.target.result, customKey);
    };
    
    reader.readAsDataURL(file);
  }
  
  updateUserGreeting() {
    const userGreeting = document.getElementById('user-greeting');
    if (userGreeting) {
      const hour = new Date().getHours();
      let greeting;
      
      if (hour < 12) greeting = "Good morning";
      else if (hour < 18) greeting = "Good afternoon";
      else greeting = "Good evening";
      
      userGreeting.textContent = `${greeting}, welcome to the Analog Horror Generator. Create chilling broadcasts to share with friends or enhance your next horror project.`;
    }
  }

  async analyseText() {
    const text = this.horrorText.value;
    if (!text.trim()) {
      this.showNotification('Please enter some text to analyse', 'error');
      return;
    }
    
    this.showNotification('Analysing broadcast for assets...');
    
    let assetPreviewPanel = document.querySelector('.asset-preview-panel');
    if (!assetPreviewPanel) {
      assetPreviewPanel = document.createElement('div');
      assetPreviewPanel.className = 'asset-preview-panel';
      this.horrorText.parentNode.appendChild(assetPreviewPanel);
    }
    
    assetPreviewPanel.innerHTML = `
      <div class="asset-preview-header">
        <span>Asset Analysis</span>
      </div>
    `;
    
    try {
      const sentences = text.split(/(?<=[.!?])\s+/);
      
      for (const sentence of sentences) {
        if (!sentence.trim()) continue;
        
        const detectedAssets = this.analyzeText(sentence);
        
        const group = document.createElement('div');
        group.className = 'sentence-asset-group';
        
        const sentenceText = document.createElement('div');
        sentenceText.className = 'sentence-text';
        sentenceText.textContent = sentence;
        group.appendChild(sentenceText);
        
        const assetsContainer = document.createElement('div');
        assetsContainer.className = 'sentence-assets';
        
        if (detectedAssets.length > 0) {
          detectedAssets.forEach(asset => {
            for (let i = 0; i < asset.count; i++) {
              if (this.imageMap[asset.imageName] && this.imageMap[asset.imageName].enabled) {
                const assetEl = document.createElement('div');
                assetEl.className = 'sentence-asset';
                assetEl.innerHTML = `
                  <img src="${this.imageMap[asset.imageName].path}" alt="${asset.imageName}">
                  <div class="asset-remove">×</div>
                `;
                
                assetEl.querySelector('.asset-remove').addEventListener('click', () => {
                  assetEl.remove();
                  this.updateAnalysisResults();
                });
                
                assetsContainer.appendChild(assetEl);
              }
            }
          });
        }
        
        const addBtn = document.createElement('button');
        addBtn.className = 'add-asset-btn';
        addBtn.textContent = '+ Add Asset';
        addBtn.addEventListener('click', () => {
          this.showAssetSelectionModal(assetsContainer, () => {
            this.updateAnalysisResults();
          });
        });
        
        assetsContainer.appendChild(addBtn);
        group.appendChild(assetsContainer);
        assetPreviewPanel.appendChild(group);
      }
      
      this.updateAnalysisResults();
      
    } catch (error) {
      console.error('Error analysing text:', error);
      this.showNotification('Error analysing broadcast', 'error');
    }
  }

  updateAnalysisResults() {
    this.analysisResults = [];
    
    document.querySelectorAll('.sentence-asset-group').forEach(group => {
      const text = group.querySelector('.sentence-text').textContent;
      const assets = [];
      
      group.querySelectorAll('.sentence-asset img').forEach(img => {
        const assetName = img.getAttribute('alt');
        const assetPath = img.getAttribute('src');
        
        let imageName = null;
        for (const [name, data] of Object.entries(this.imageMap)) {
          if (data.path === assetPath) {
            imageName = name;
            break;
          }
        }
        
        if (imageName) {
          const existingAsset = assets.find(a => a.name === imageName);
          if (existingAsset) {
            existingAsset.count++;
          } else {
            assets.push({ name: imageName, count: 1 });
          }
        }
      });
      
      this.analysisResults.push({ text, assets });
    });
  }

  showAssetSelectionModal(targetContainer, callback) {
    let modal = document.querySelector('.asset-selection-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'asset-selection-modal';
      document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
      <div class="asset-selection-container">
        <div class="asset-selection-header">
          <div class="asset-selection-title">Select an Asset</div>
          <button class="close-asset-selection">×</button>
        </div>
        <div class="asset-selection-grid">
          ${Object.entries(this.imageMap)
            .filter(([name, data]) => data.enabled)
            .map(([name, data]) => `
              <div class="asset-selection-item" data-asset="${name}">
                <img src="${data.path}" alt="${name}">
                <div class="asset-name">${name}</div>
              </div>
            `).join('')}
        </div>
      </div>
    `;
    
    modal.classList.add('visible');
    
    modal.querySelector('.close-asset-selection').addEventListener('click', () => {
      modal.classList.remove('visible');
    });
    
    modal.querySelectorAll('.asset-selection-item').forEach(item => {
      item.addEventListener('click', () => {
        const assetName = item.dataset.asset;
        if (this.imageMap[assetName]) {
          const assetEl = document.createElement('div');
          assetEl.className = 'sentence-asset';
          assetEl.innerHTML = `
            <img src="${this.imageMap[assetName].path}" alt="${assetName}">
            <div class="asset-remove">×</div>
          `;
          
          assetEl.querySelector('.asset-remove').addEventListener('click', () => {
            assetEl.remove();
            if (callback) callback();
          });
          
          targetContainer.insertBefore(assetEl, targetContainer.querySelector('.add-asset-btn'));
          
          if (callback) callback();
        }
        
        modal.classList.remove('visible');
      });
    });
  }
  
  populateBugReportsTab() {
    const reporterNameField = document.getElementById('reporter-name');
    if (reporterNameField) {
      reporterNameField.value = this.accountManager.getCurrentUser() || 'Anonymous';
      reporterNameField.readOnly = true; 
    }
    
    const reportsContainer = document.getElementById('bug-reports-container');
    if (reportsContainer) {
      const bugReports = this.db.getBugReports();
      
      if (bugReports.length === 0) {
        reportsContainer.innerHTML = '<div class="no-bugs-message">No bug reports submitted yet.</div>';
      } else {
        reportsContainer.innerHTML = bugReports.map(report => `
          <div class="bug-report-item">
            <div class="bug-report-header">
              <div class="bug-report-title">${this.escapeHTML(report.title)}</div>
              <div class="bug-report-author">Reported by: ${this.escapeHTML(report.author)}</div>
            </div>
            <div class="bug-report-content">${this.escapeHTML(report.description)}</div>
            <div class="bug-report-footer">
              <div class="bug-report-rating">
                <button class="vote-btn vote-up" data-id="${report.id}" data-type="up">👍 ${report.rating}</button>
                <button class="vote-btn vote-down" data-id="${report.id}" data-type="down">👎</button>
              </div>
            </div>
          </div>
        `).join('');
        
        reportsContainer.querySelectorAll('.vote-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const reportId = e.target.dataset.id;
            const voteType = e.target.dataset.type;
            const username = this.accountManager.getCurrentUser();
            
            if (!username) {
              this.showNotification('Please log in to vote', 'error');
              return;
            }
            
            const updatedReport = this.db.voteBugReport(reportId, username, voteType);
            if (updatedReport) {
              this.populateBugReportsTab();
            } else {
              this.showNotification('You have already voted on this report', 'error');
            }
          });
        });
      }
    }
  }
  
  submitBugReport() {
    const titleField = document.getElementById('bug-title');
    const descriptionField = document.getElementById('bug-description');
    const reporterField = document.getElementById('reporter-name');
    
    if (!titleField || !descriptionField || !reporterField) return;
    
    const title = titleField.value.trim();
    const description = descriptionField.value.trim();
    const reporter = reporterField.value.trim();
    
    const inappropriateWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'nigger', 'retard'];
    const hasInappropriateLanguage = inappropriateWords.some(word => 
      title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
    );
    
    if (hasInappropriateLanguage) {
      this.showNotification('Inappropriate language detected. Please revise your report.', 'error');
      return;
    }
    
    if (!title || !description) {
      this.showNotification('Please fill out all required fields', 'error');
      return;
    }
    
    this.db.submitBugReport(title, description, reporter);
    
    titleField.value = '';
    descriptionField.value = '';
    this.showNotification('Bug report submitted successfully! Thank you!');
    
    this.populateBugReportsTab();
  }
  
  submitUpdateSuggestion() {
    const titleField = document.getElementById('update-title');
    const descriptionField = document.getElementById('update-description');
    const suggesterField = document.getElementById('suggester-name');
    
    if (!titleField || !descriptionField || !suggesterField) return;
    
    const title = titleField.value.trim();
    const description = descriptionField.value.trim();
    const suggester = suggesterField.value.trim();
    
    const inappropriateWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'nigger', 'retard'];
    const hasInappropriateLanguage = inappropriateWords.some(word => 
      title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
    );
    
    if (hasInappropriateLanguage) {
      this.showNotification('Inappropriate language detected. Please revise your suggestion.', 'error');
      return;
    }
    
    if (!title || !description) {
      this.showNotification('Please fill out all required fields', 'error');
      return;
    }
    
    this.db.submitUpdateSuggestion(title, description, suggester);
    
    titleField.value = '';
    descriptionField.value = '';
    this.showNotification('Update suggestion submitted successfully! Thank you!');
    
    this.populateUpdateSuggestionsTab();
  }
  
  populateUpdateSuggestionsTab() {
    const suggestionsContainer = document.getElementById('update-suggestions-container');
    if (suggestionsContainer) {
      const updateSuggestions = this.db.getUpdateSuggestions();
      
      if (updateSuggestions.length === 0) {
        suggestionsContainer.innerHTML = '<div class="no-suggestions-message">No update suggestions submitted yet.</div>';
      } else {
        suggestionsContainer.innerHTML = updateSuggestions.map(suggestion => `
          <div class="update-suggestion-item">
            <div class="suggestion-header">
              <div class="suggestion-title">${this.escapeHTML(suggestion.title)}</div>
              <div class="suggestion-author">Suggested by: ${this.escapeHTML(suggestion.author)}</div>
            </div>
            <div class="suggestion-content">${this.escapeHTML(suggestion.description)}</div>
            <div class="suggestion-footer">
              <div class="suggestion-rating">
                <button class="vote-btn vote-up" data-id="${suggestion.id}" data-type="up">👍 ${suggestion.rating}</button>
                <button class="vote-btn vote-down" data-id="${suggestion.id}" data-type="down">👎</button>
              </div>
            </div>
          </div>
        `).join('');
        
        suggestionsContainer.querySelectorAll('.vote-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const suggestionId = e.target.dataset.id;
            const voteType = e.target.dataset.type;
            const username = this.accountManager.getCurrentUser();
            
            if (!username) {
              this.showNotification('Please log in to vote', 'error');
              return;
            }
            
            const updatedSuggestion = this.db.voteUpdateSuggestion(suggestionId, username, voteType);
            if (updatedSuggestion) {
              this.populateUpdateSuggestionsTab();
            } else {
              this.showNotification('You have already voted on this suggestion', 'error');
            }
          });
        });
      }
    }
  }
  
  escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.horrorGenerator = new HorrorGenerator();