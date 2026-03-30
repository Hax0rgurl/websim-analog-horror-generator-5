class AccountManager {
  constructor() {
    this.init();
  }

  async init() {
    try {
      // Fetch the current user from WebSim
      const user = await window.websim.getUser();
      
      if (user && user.username) {
        // Set username in local storage and input fields
        localStorage.setItem('uploadUsername', user.username);
        this.updateUploadName(user.username);
      } else {
        // Fallback if no user found (shouldn't happen, but just in case)
        this.showUserSetupModal();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      this.showUserSetupModal();
    }
  }

  showUserSetupModal() {
    // Create a modal to ensure user has a username
    const modal = document.createElement('div');
    modal.className = 'user-setup-modal';
    modal.innerHTML = `
      <div class="user-setup-content">
        <h2>Set Up Your Username</h2>
        <p>You must set a username to use the Analog Horror Generator.</p>
        <form id="username-form">
          <input type="text" id="username-input" placeholder="Enter your username" required>
          <button type="submit">Save Username</button>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const form = modal.querySelector('#username-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = modal.querySelector('#username-input');
      const username = usernameInput.value.trim();
      
      if (username) {
        try {
          // Validate username
          if (!/^[a-zA-Z0-9_]{3,32}$/.test(username)) {
            alert('Username must be 3-32 characters long and contain only letters, numbers, and underscores.');
            return;
          }
          
          // Save username in local storage
          localStorage.setItem('uploadUsername', username);
          
          // Update all input fields
          this.updateUploadName(username);
          
          // Remove modal
          modal.remove();
        } catch (error) {
          console.error('Error setting username:', error);
          alert('Failed to set username. Please try again.');
        }
      }
    });
  }

  updateUploadName(username) {
    const usernameInputs = [
      document.getElementById('reporter-name'),
      document.getElementById('suggester-name')
    ];
    
    usernameInputs.forEach(input => {
      if (input) {
        input.value = username;
        input.readOnly = true; // Make it read-only
      }
    });
  }

  getCurrentUser() {
    return localStorage.getItem('uploadUsername');
  }

  isLoggedIn() {
    return !!localStorage.getItem('uploadUsername');
  }
}

export default AccountManager;