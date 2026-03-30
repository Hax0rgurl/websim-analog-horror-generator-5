class TabManager {
  constructor() {
    this.tabs = [];
    this.activeTabIndex = -1;
    
    this.initializeDOMElements();
    this.setupEventListeners();
    
    // Optional: Add keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  initializeDOMElements() {
    const container = document.createElement('div');
    container.className = 'tab-manager-container';
    container.innerHTML = `
      <div class="tab-bar"></div>
      <button class="new-tab-btn">+ New Tab</button>
    `;
    
    document.querySelector('.container').insertBefore(container, document.querySelector('.tab-container'));
    
    this.tabBar = container.querySelector('.tab-bar');
    this.newTabBtn = container.querySelector('.new-tab-btn');
  }

  setupEventListeners() {
    this.newTabBtn.addEventListener('click', () => this.openTabSelector());
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + T to open new tab
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        this.openTabSelector();
      }
      
      // Ctrl/Cmd + W to close current tab
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (this.tabs.length > 0) {
          this.closeTab(this.activeTabIndex);
        }
      }
      
      // Ctrl/Cmd + Tab to cycle tabs forward
      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        this.cycleTabs(1);
      }
      
      // Ctrl/Cmd + Shift + Tab to cycle tabs backward
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        this.cycleTabs(-1);
      }
    });
  }

  cycleTabs(direction) {
    if (this.tabs.length === 0) return;

    let newIndex = this.activeTabIndex + direction;
    
    // Wrap around
    if (newIndex >= this.tabs.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.tabs.length - 1;
    }

    this.setActiveTab(newIndex);
  }

  openTabSelector() {
    const selector = document.createElement('div');
    selector.className = 'tab-selector';
    selector.innerHTML = `
      <div class="tab-selector-grid">
        <div class="tab-selector-item" data-tab="broadcast">
          <img src="/Radio.png" alt="Broadcast">
          <h3>Generate Horror Broadcasts</h3>
        </div>
        <div class="tab-selector-item" data-tab="assets">
          <img src="/painting (1).png" alt="Assets">
          <h3>Manage Horror Assets</h3>
        </div>
        <div class="tab-selector-item" data-tab="channels">
          <img src="/video.png" alt="Channels">
          <h3>YouTube Horror Channels</h3>
        </div>
        <div class="tab-selector-item" data-tab="credits">
          <img src="/Smiley.png" alt="Credits">
          <h3>Project Contributors</h3>
        </div>
        <div class="tab-selector-item" data-tab="voting">
          <img src="/clock.png" alt="Feature Voting">
          <h3>Vote on New Features</h3>
        </div>
      </div>
    `;
    
    document.body.appendChild(selector);
    
    // Close selector when clicking outside
    const closeSelector = (e) => {
      if (!selector.contains(e.target) && e.target !== this.newTabBtn) {
        selector.remove();
        document.removeEventListener('click', closeSelector);
      }
    };
    
    // Slight delay to prevent immediate closure
    setTimeout(() => {
      document.addEventListener('click', closeSelector);
    }, 100);
    
    selector.querySelectorAll('.tab-selector-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.dataset.tab;
        this.addTab(tabId);
        selector.remove();
      });
    });
  }

  addTab(tabId) {
    // Prevent duplicate tabs
    if (this.tabs.some(tab => tab.id === tabId)) {
      return;
    }

    const tabTitles = {
      'broadcast': 'Broadcast Generator',
      'assets': 'Assets Gallery',
      'channels': 'YouTube Channels',
      'bugs': 'Bug Reports',
      'credits': 'Credits',
      'voting': 'Feature Voting'
    };

    const tabIcons = {
      'broadcast': '/Radio.png',
      'assets': '/painting (1).png',
      'channels': '/video.png',
      'bugs': '/bug.png',
      'credits': '/Smiley.png',
      'voting': '/clock.png'
    };

    const tab = {
      id: tabId,
      title: tabTitles[tabId],
      icon: tabIcons[tabId]
    };

    this.tabs.push(tab);
    this.renderTabs();
    this.setActiveTab(this.tabs.length - 1);
  }

  renderTabs() {
    this.tabBar.innerHTML = this.tabs.map((tab, index) => `
      <div class="tab-item ${index === this.activeTabIndex ? 'active' : ''}" data-index="${index}">
        <img src="${tab.icon}" alt="${tab.title}">
        <span class="tab-item-title">${tab.title}</span>
        <button class="tab-close" data-index="${index}">&times;</button>
      </div>
    `).join('');

    this.attachTabEventListeners();
  }

  attachTabEventListeners() {
    this.tabBar.querySelectorAll('.tab-item').forEach(tabEl => {
      tabEl.addEventListener('click', () => {
        const index = parseInt(tabEl.dataset.index);
        this.setActiveTab(index);
      });
    });

    this.tabBar.querySelectorAll('.tab-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(closeBtn.dataset.index);
        this.closeTab(index);
      });
    });
  }

  setActiveTab(index) {
    this.activeTabIndex = index;
    
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show active tab content
    const activeTab = this.tabs[index];
    document.getElementById(`${activeTab.id}-content`).classList.add('active');

    this.renderTabs();
  }

  closeTab(index) {
    this.tabs.splice(index, 1);
    
    // Update active tab index
    if (this.activeTabIndex >= this.tabs.length) {
      this.activeTabIndex = this.tabs.length - 1;
    }

    if (this.tabs.length === 0) {
      // If no tabs left, hide all content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
    } else {
      // Set active tab
      this.setActiveTab(this.activeTabIndex);
    }

    this.renderTabs();
  }
}

export default TabManager;