class Database {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || {};
    this.gallery = JSON.parse(localStorage.getItem('gallery')) || {
      creator: [
        { name: 'Apple', path: '/apple.png', author: 'Creator' },
        { name: 'Ant', path: '/ant.png', author: 'Creator' },
        { name: 'Balloon', path: '/balloon.png', author: 'Creator' },
        { name: 'BatteryEmpty', path: '/BatteryEmpty.png', author: 'Creator' },
        { name: 'BatteryFull', path: '/BatteryFull.png', author: 'Creator' },
        { name: 'BatteryHalf', path: '/BatteryHalf.png', author: 'Creator' },
        { name: 'Bed', path: '/bed.png', author: 'Creator' },
        { name: 'Bomb', path: '/bomb.png', author: 'Creator' },
        { name: 'Bone', path: '/bone.png', author: 'Creator' },
        { name: 'Butterfly', path: '/butterfly.png', author: 'Creator' },
        { name: 'Bug', path: '/bug.png', author: 'Creator' },
        { name: 'Camera', path: '/Camera.png', author: 'Creator' },
        { name: 'Car', path: '/car.png', author: 'Creator' },
        { name: 'Clock', path: '/clock.png', author: 'Creator' },
        { name: 'Cloud', path: '/cloud.png', author: 'Creator' },
        { name: 'Download', path: '/download.png', author: 'Creator' },
        { name: 'Door', path: '/Door.png', author: 'Creator' },
        { name: 'Egg', path: '/Egg.png', author: 'Creator' },
        { name: 'Eye', path: '/Eye.png', author: 'Creator' },
        { name: 'Fake', path: '/fake.png', author: 'Creator' },
        { name: 'Figure', path: '/NoArms.png', author: 'Creator' },
        { name: 'Fire', path: '/fire.png', author: 'Creator' },
        { name: 'Fish', path: '/fish.png', author: 'Creator' },
        { name: 'Flag', path: '/flag.png', author: 'Creator' },
        { name: 'Forest', path: '/forest.png', author: 'Creator' },
        { name: 'Ghost', path: '/ghost.png', author: 'Creator' },
        { name: 'Glasses', path: '/Glasses.png', author: 'Creator' },
        { name: 'Gun', path: '/gun.png', author: 'Creator' },
        { name: 'Hand', path: '/hand.png', author: 'Creator' },
        { name: 'Helicopter', path: '/helicopter.png', author: 'Creator' },
        { name: 'House', path: '/House.png', author: 'Creator' },
        { name: 'Info', path: '/Info.png', author: 'Creator' },
        { name: 'Key', path: '/key.png', author: 'Creator' },
        { name: 'Knife', path: '/Knife.png', author: 'Creator' },
        { name: 'Lightning', path: '/Thunder.png', author: 'Creator' },
        { name: 'Loupe', path: '/loupe.png', author: 'Creator' },
        { name: 'Man', path: '/Man.png', author: 'Creator' },
        { name: 'Mirror', path: '/Mirror.png', author: 'Creator' },
        { name: 'Moon', path: '/moon.png', author: 'Creator' },
        { name: 'Painting', path: '/painting.png', author: 'Creator' },
        { name: 'Paintbrush', path: '/paintbrush.png', author: 'Creator' },
        { name: 'Phone', path: '/phone.png', author: 'Creator' },
        { name: 'Pill', path: '/pill.png', author: 'Creator' },
        { name: 'Radiation', path: '/radiation.png', author: 'Creator' },
        { name: 'Radio', path: '/Radio.png', author: 'Creator' },
        { name: 'Rainy', path: '/rainy.png', author: 'Creator' },
        { name: 'Run', path: '/run.png', author: 'Creator' },
        { name: 'Sound', path: '/Sound.png', author: 'Creator' },
        { name: 'See', path: '/see.png', author: 'Creator' },
        { name: 'Shield', path: '/shield.png', author: 'Creator' },
        { name: 'Smiley', path: '/Smiley.png', author: 'Creator' },
        { name: 'Star', path: '/star.png', author: 'Creator' },
        { name: 'Sun', path: '/sun.png', author: 'Creator' },
        { name: 'Sword', path: '/sword.png', author: 'Creator' },
        { name: 'Tomb', path: '/tomb.png', author: 'Creator' },
        { name: 'Video', path: '/video.png', author: 'Creator' },
        { name: 'Village', path: '/village.png', author: 'Creator' },
        { name: 'Warning', path: '/Warning.png', author: 'Creator' },
        { name: 'Window', path: '/Window.png', author: 'Creator' },
        { name: 'Woman', path: '/Woman.png', author: 'Creator' },
        { name: 'Plane', path: '/plane.png', author: 'Creator' },
        { name: 'Up', path: '/up.png', author: 'Creator' },
        { name: 'Down', path: '/down.png', author: 'Creator' },
      ],
      players: []
    };
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
      'butterfly': { path: '/butterfly.png', enabled: true },
      'bug': { path: '/bug.png', enabled: true },
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
      'plane': { path: '/plane.png', enabled: true },
      'up': { path: '/up.png', enabled: true },
      'down': { path: '/down.png', enabled: true },
    };
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
      'eyes|watch|observe|vision': 'eye',
      'doors|gate|portal|threshold': 'door',
      'see|observe|watch|notice': 'eye',
      'hearing|listen|ear': 'sound',
      'plane|airplane|aircraft|fly': 'plane',
      'up|above|upward|rise': 'up',
      'down|below|downward|descend': 'down',
    };
    this.bugReports = JSON.parse(localStorage.getItem('bugReports')) || [];
    this.updateSuggestions = JSON.parse(localStorage.getItem('updateSuggestions')) || [];
    this.votes = JSON.parse(localStorage.getItem('feature_votes')) || {
      assets: 0,
      themes: 0, 
      logos: 0,
      voters: {} // Track who voted for what
    };
  }

  addPlayerImage(username, imageData, title) {
    const imageId = Date.now().toString(36);
    const image = {
      id: imageId,
      name: title,
      path: imageData,
      author: username || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    this.gallery.players.push(image);
    this.saveGallery();
    return imageId;
  }

  getUserImages(username) {
    return this.gallery.players.filter(img => img.author === username);
  }

  getCreatorGallery() {
    return this.gallery.creator;
  }

  getPlayerGallery() {
    return this.gallery.players;
  }

  likeImage(imageId, username) {
    const image = this.gallery.players.find(img => img.id === imageId);
    if (image) {
      image.likes = (image.likes || 0) + 1;
      this.saveGallery();
    }
  }

  renderAssets() {
    const assetsContent = document.getElementById('assets-content');
    assetsContent.innerHTML = `
      <div class="assets-container">
        <div class="assets-tabs">
          <button class="assets-tab active" data-assets-tab="creator">Creator Assets</button>
          <button class="assets-tab" data-assets-tab="player">User Gallery</button>
        </div>
        
        <div class="upload-section">
          <button id="upload-asset-btn" class="upload-btn"> Upload Image</button>
          <input type="file" id="asset-file-input" accept="image/*" style="display: none;">
          <div class="upload-preview"></div>
        </div>

        <div class="assets-grid" id="creator-assets">
          ${Object.entries(this.imageMap)
            .filter(([name]) => !name.startsWith('custom_'))
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([name, { path, enabled }]) => `
              <div class="asset-item">
                <div class="asset-image">
                  <img src="${path}" alt="${name}">
                </div>
                <div class="asset-info">
                  <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                </div>
                <div class="asset-controls">
                  <label class="toggle-switch" title="Toggle asset">
                    <input type="checkbox" class="asset-toggle" data-asset="${name}" ${enabled ? 'checked' : ''}>
                    <span class="slider"></span>
                  </label>
                  <a href="${path}" download="${name}.png" class="download-btn" title="Download"><img src="/download.png" alt="Download" width="16" height="16"></a>
                </div>
              </div>
            `).join('')}
        </div>

        <div class="assets-grid hidden" id="player-assets">
          ${this.gallery.players.map(item => `
            <div class="asset-item">
              <div class="asset-image">
                <img src="${item.path}" alt="${item.name}">
              </div>
              <div class="asset-info">
                <h3>${item.name}</h3>
                <p>by ${item.author}</p>
              </div>
              <div class="asset-controls">
                <label class="toggle-switch" title="Toggle asset">
                  <input type="checkbox" class="asset-toggle" data-asset="custom_${item.id}" checked>
                  <span class="slider"></span>
                </label>
                <a href="${item.path}" download="${item.name}.png" class="download-btn" title="Download asset"><img src="/download.png" alt="Download" width="16" height="16"></a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add event listeners for asset toggling
    document.querySelectorAll('.asset-toggle').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const assetName = e.target.dataset.asset;
        if (this.imageMap[assetName]) {
          this.imageMap[assetName].enabled = e.target.checked;
        }
      });
    });

    // Add event listener for file upload
    const uploadBtn = document.getElementById('upload-asset-btn');
    const fileInput = document.getElementById('asset-file-input');
    
    uploadBtn?.addEventListener('click', () => {
      fileInput?.click();
    });
    
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageName = prompt('Enter a name for this asset:');
          if (!imageName) return;
          const imageData = e.target.result;
          const customKey = `custom_${Date.now().toString(36)}`;
          this.handleAssetUpload(file, imageName, imageData, customKey);
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  handleAssetUpload(file, imageName, imageData, customKey) {
    if (!file || !imageName) return;
    
    // Add to gallery
    const imageId = Date.now().toString(36);
    const currentUser = localStorage.getItem('currentUser') || 'Anonymous';
    
    const newImage = {
      id: imageId,
      name: imageName,
      path: imageData,
      author: currentUser,
      createdAt: new Date().toISOString()
    };
    
    this.gallery.players.push(newImage);
    this.saveGallery();
    
    // Add to image map if it doesn't exist
    if (!this.imageMap[customKey]) {
      this.imageMap[customKey] = {
        path: imageData,
        enabled: true
      };
    }
    
    // Add trigger word
    this.triggerWords[imageName.toLowerCase()] = customKey;
    
    // Re-render assets
    this.renderAssets();
    
    // Switch to player gallery tab
    document.querySelector('[data-assets-tab="player"]').click();
  }

  async castVote(option, username) {
    if (!username) {
      throw new Error('Username is required to vote');
    }

    // Check if voting has ended 
    const votingEnd = new Date('2025-06-01T23:59:59Z');
    if (new Date() > votingEnd) {
      throw new Error('Voting has ended');
    }

    // Special case for blubber to allow voting again
    if (username === 'blubber') {
      delete this.votes.voters[username];
    }

    // Check if user has already voted
    if (this.votes.voters[username]) {
      throw new Error('You have already voted');
    }

    // Record the vote
    this.votes[option]++;
    this.votes.voters[username] = option;
    
    // Save votes to localStorage immediately
    localStorage.setItem('feature_votes', JSON.stringify(this.votes));
    
    return {
      option,
      counts: {
        assets: this.votes.assets,
        themes: this.votes.themes,
        logos: this.votes.logos
      }
    };
  }

  getVotingStatus(username) {
    // Always read from localStorage to ensure we have latest data
    const currentVotes = JSON.parse(localStorage.getItem('feature_votes')) || this.votes;
    
    return {
      hasVoted: username ? !!currentVotes.voters[username] : false,
      votedFor: username ? currentVotes.voters[username] : null,
      counts: {
        assets: currentVotes.assets,
        themes: currentVotes.themes,
        logos: currentVotes.logos
      }
    };
  }

  saveVotes() {
    localStorage.setItem('feature_votes', JSON.stringify(this.votes));
  }

  saveBugReports() {
    localStorage.setItem('bugReports', JSON.stringify(this.bugReports));
  }

  saveUpdateSuggestions() {
    localStorage.setItem('updateSuggestions', JSON.stringify(this.updateSuggestions));
  }

  getBugReports() {
    return this.bugReports;
  }

  getUpdateSuggestions() {
    return this.updateSuggestions;
  }

  saveGallery() {
    localStorage.setItem('gallery', JSON.stringify(this.gallery));
  }

  submitBugReport(title, description, username) {
    const bugReport = {
      id: Date.now().toString(36),
      title,
      description,
      author: username || 'Anonymous',
      createdAt: new Date().toISOString(),
      rating: 0,
      voters: {} // Track who has voted
    };
    
    this.bugReports.unshift(bugReport);
    this.saveBugReports();
    return bugReport;
  }

  voteBugReport(reportId, username, voteType) {
    console.log('Voting on report:', { reportId, username, voteType });

    if (!reportId || !username || !voteType) {
      console.error('Invalid vote parameters', { reportId, username, voteType });
      return null;
    }

    const report = this.bugReports.find(r => r.id === reportId);
    
    if (!report) {
      console.error('Report not found:', reportId);
      return null;
    }

    if (!report.voters) {
      report.voters = {};
    }

    if (report.voters[username]) {
      console.log('User has already voted on this report');
      return null;
    }

    report.rating += voteType === 'up' ? 1 : -1;
    report.voters[username] = voteType;
    
    this.bugReports.sort((a, b) => b.rating - a.rating);
    
    this.saveBugReports();
    return report;
  }

  submitUpdateSuggestion(title, description, username) {
    const suggestion = {
      id: Date.now().toString(36),
      title,
      description,
      author: username || 'Anonymous',
      createdAt: new Date().toISOString(),
      rating: 0,
      voters: {} // Track who has voted
    };
    
    this.updateSuggestions.unshift(suggestion);
    this.saveUpdateSuggestions();
    return suggestion;
  }

  voteUpdateSuggestion(suggestionId, username, voteType) {
    const suggestion = this.updateSuggestions.find(s => s.id === suggestionId);
    if (suggestion && !suggestion.voters[username]) {
      suggestion.rating += voteType === 'up' ? 1 : -1;
      suggestion.voters[username] = voteType;
      
      this.updateSuggestions.sort((a, b) => b.rating - a.rating);
      
      this.saveUpdateSuggestions();
      return suggestion;
    }
    return null;
  }
}

export default Database;