class Gallery {
  constructor(database, accountManager) {
    this.db = database;
    this.accountManager = accountManager;
    this.currentTab = 'creator';
    
    this.init();
  }

  init() {
    if (!document.querySelector('#assets-content')) {
      // Only initialize in assets tab
      return;
    }
    this.createGalleryModal();
    this.bindEvents();
    this.loadGallery();
  }

  createGalleryModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
      <div class="gallery-container">
        <div class="gallery-header">
          <h2>Horror Art Gallery</h2>
          <div class="gallery-tabs">
            <button class="gallery-tab active" data-tab="creator">Creator Assets</button>
            <button class="gallery-tab" data-tab="players">Player Gallery</button>
          </div>  
          <button class="close-gallery">×</button>
        </div>
        
        <div class="gallery-content">
          <div class="gallery-grid" id="gallery-grid"></div>
        </div>
        
        <div class="gallery-footer">
          ${this.accountManager.isLoggedIn() ? `
            <button id="upload-to-gallery" class="action-btn">
              Upload Your Art
            </button>
          ` : `
            <button id="login-to-upload" class="action-btn">
              Login to Upload
            </button>
          `}
        </div>
      </div>
    `;
    
    document.querySelector('#assets-content').appendChild(modal);
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.gallery-tab')?.forEach(tab => {
      tab?.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.tab;
        this.loadGallery();
      });
    });

    // Close button
    document.querySelector('.close-gallery')?.addEventListener('click', () => {
      document.querySelector('.gallery-modal')?.classList.remove('visible');
    });

    // Upload button
    const uploadBtn = document.getElementById('upload-to-gallery');
    const loginBtn = document.getElementById('login-to-upload');

    uploadBtn?.addEventListener('click', () => {
      if (!this.accountManager.isLoggedIn()) {
        this.showNotification('Please login to upload images', 'error');
        return;
      }
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => this.handleImageUpload(e);
      input.click();
    });

    loginBtn?.addEventListener('click', () => {
      this.showNotification('Please login to upload images', 'error');
    });
  }

  loadGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const images = this.currentTab === 'creator' ? 
      this.db.getCreatorGallery() : 
      this.db.getPlayerGallery();
    
    images.forEach(image => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <div class="gallery-image-container">
          <img src="${image.path}" alt="${image.name}">
        </div>
        <div class="gallery-item-info">
          <h3>${image.name}</h3>
          <p>by ${image.author}</p>
          ${this.currentTab === 'players' ? `
            <div class="gallery-item-actions">
              <button class="like-btn" data-id="${image.id}">
                ❤️ ${image.likes || 0}
              </button>
            </div>
          ` : ''}
        </div>
      `;
      
      if (this.currentTab === 'players') {
        const likeBtn = item.querySelector('.like-btn');
        likeBtn?.addEventListener('click', () => {
          if (this.accountManager.isLoggedIn()) {
            this.likeImage(image.id);
          } else {
            this.showNotification('Please login to like images', 'error');
          }
        });
      }
      
      grid.appendChild(item);
    });
  }

  loadMiniGallery() {
    const grid = document.querySelector('.mini-gallery-grid');
    if (!grid) return;
    
    const creatorAssets = this.db.getCreatorGallery();
    
    grid.innerHTML = creatorAssets.map(image => `
      <div class="mini-gallery-item">
        <div class="mini-gallery-image">
          <img src="${image.path}" alt="${image.name}">
        </div>
        <div class="mini-gallery-title">${image.name}</div>
      </div>
    `).join('');
  }

  async handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const title = await this.promptForTitle();
        if (!title) return;
        
        const imageData = e.target.result;
        const username = this.accountManager.getCurrentUser();
        
        await this.db.addPlayerImage(username, imageData, title);
        this.loadGallery();
        this.loadMiniGallery();
        this.showNotification('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      this.showNotification(error.message, 'error');
    }
  }

  async promptForTitle() {
    return prompt('Enter a title for your artwork:');
  }

  likeImage(imageId) {
    this.db.likeImage(imageId, this.accountManager.getCurrentUser());
    this.loadGallery();
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

export default Gallery;