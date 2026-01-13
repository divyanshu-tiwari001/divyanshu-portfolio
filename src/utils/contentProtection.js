/**
 * Comprehensive Content Protection System
 * Provides multiple layers of protection against content theft
 */

export class ContentProtection {
  constructor(options = {}) {
    this.options = {
      enableDevToolsDetection: true,
      enableScreenCaptureBlocking: true,
      enableRecordingDetection: true,
      enableCanvasProtection: true,
      enableWatermark: true,
      showWarnings: true,
      logAttempts: true,
      ...options
    };

    this.isDevToolsOpen = false;
    this.detectionHandlers = [];
    this.originalAPIs = {};
  }

  /**
   * Initialize all protection mechanisms
   */
  initialize() {
    if (this.options.enableScreenCaptureBlocking) {
      this.blockScreenCapture();
    }

    if (this.options.enableDevToolsDetection) {
      this.detectDevTools();
    }

    if (this.options.enableRecordingDetection) {
      this.detectRecording();
    }

    if (this.options.enableCanvasProtection) {
      this.protectCanvas();
    }

    if (this.options.enableWatermark) {
      this.addVisualWatermark();
    }

    this.preventPrintScreen();
    this.preventDragDrop();
    
    return this;
  }

  /**
   * Block screen capture APIs (getDisplayMedia)
   */
  blockScreenCapture() {
    try {
      // Store original API
      this.originalAPIs.getDisplayMedia = navigator.mediaDevices?.getDisplayMedia;

      // Override getDisplayMedia
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const self = this;
        navigator.mediaDevices.getDisplayMedia = function() {
          self.logAttempt('Screen capture blocked: getDisplayMedia() call prevented');
          if (self.options.showWarnings) {
            self.showWarning('Screen sharing is disabled on this page for content protection.');
          }
          return Promise.reject(new DOMException('Screen capture is not allowed', 'NotAllowedError'));
        };
      }

      // Also block getUserMedia with screen sharing
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const originalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        const self = this;
        
        navigator.mediaDevices.getUserMedia = function(constraints) {
          if (constraints?.video?.displaySurface || constraints?.video?.cursor || 
              constraints?.video?.logicalSurface) {
            self.logAttempt('Screen capture blocked: getUserMedia() with screen sharing prevented');
            if (self.options.showWarnings) {
              self.showWarning('Screen sharing is disabled on this page.');
            }
            return Promise.reject(new DOMException('Screen capture is not allowed', 'NotAllowedError'));
          }
          return originalGetUserMedia(constraints);
        };
      }
    } catch (error) {
      console.warn('Screen capture blocking initialization failed:', error);
    }
  }

  /**
   * Protect canvas from screenshot extraction
   */
  protectCanvas() {
    try {
      const self = this;
      
      // Override toDataURL
      const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
      HTMLCanvasElement.prototype.toDataURL = function(...args) {
        self.logAttempt('Canvas protection: toDataURL() call detected');
        
        // Return a blank canvas or corrupted data
        const blankCanvas = document.createElement('canvas');
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        const ctx = blankCanvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
        ctx.fillStyle = '#ff6b00';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Protected Content', blankCanvas.width / 2, blankCanvas.height / 2);
        
        return originalToDataURL.call(blankCanvas, ...args);
      };

      // Override toBlob
      const originalToBlob = HTMLCanvasElement.prototype.toBlob;
      HTMLCanvasElement.prototype.toBlob = function(callback, ...args) {
        self.logAttempt('Canvas protection: toBlob() call detected');
        
        const blankCanvas = document.createElement('canvas');
        blankCanvas.width = this.width;
        blankCanvas.height = this.height;
        const ctx = blankCanvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
        
        return originalToBlob.call(blankCanvas, callback, ...args);
      };

      // Protect getImageData
      const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
      CanvasRenderingContext2D.prototype.getImageData = function(...args) {
        self.logAttempt('Canvas protection: getImageData() call detected');
        
        // Return corrupted or blank image data
        const [sx, sy, sw, sh] = args;
        const imageData = originalGetImageData.call(this, sx, sy, sw, sh);
        
        // Corrupt the data
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = Math.floor(Math.random() * 50); // R
          imageData.data[i + 1] = Math.floor(Math.random() * 50); // G
          imageData.data[i + 2] = Math.floor(Math.random() * 50); // B
          imageData.data[i + 3] = 25; // A (low opacity)
        }
        
        return imageData;
      };
    } catch (error) {
      console.warn('Canvas protection initialization failed:', error);
    }
  }

  /**
   * Detect when DevTools is opened
   */
  detectDevTools() {
    const self = this;
    let checkInterval;

    // Method 1: Console detection
    const consoleCheck = () => {
      const element = new Image();
      let devtoolsOpen = false;
      
      Object.defineProperty(element, 'id', {
        get: function() {
          devtoolsOpen = true;
          return 'devtools-detector';
        }
      });
      
      console.log('%c', element);
      
      if (devtoolsOpen && !this.isDevToolsOpen) {
        this.onDevToolsOpen();
      } else if (!devtoolsOpen && this.isDevToolsOpen) {
        this.onDevToolsClose();
      }
    };

    // Method 2: Window size detection
    const sizeCheck = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if ((widthThreshold || heightThreshold) && !this.isDevToolsOpen) {
        this.onDevToolsOpen();
      } else if (!widthThreshold && !heightThreshold && this.isDevToolsOpen) {
        this.onDevToolsClose();
      }
    };

    // Method 3: Debugger detection (intentionally unused but available for future use)
    // const debuggerCheck = () => {
    //   const start = performance.now();
    //   debugger; // eslint-disable-line no-debugger
    //   const end = performance.now();
    //   
    //   if (end - start > 100 && !this.isDevToolsOpen) {
    //     this.onDevToolsOpen();
    //   }
    // };

    // Periodic checks
    checkInterval = setInterval(() => {
      try {
        consoleCheck.call(self);
        sizeCheck.call(self);
      } catch {
        // Ignore errors during detection
      }
    }, 1000);

    // Window resize detection
    window.addEventListener('resize', () => {
      sizeCheck.call(self);
    });

    // Store cleanup function
    this.detectionHandlers.push(() => {
      clearInterval(checkInterval);
    });
  }

  onDevToolsOpen() {
    this.isDevToolsOpen = true;
    this.logAttempt('DevTools detected: Developer tools opened');
    
    if (this.options.showWarnings) {
      this.showWarning('Developer tools detected. Some features may be restricted.');
    }
    
    // Optionally blur content
    document.body.style.filter = 'blur(5px)';
    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';
    
    // Create overlay message
    const overlay = document.createElement('div');
    overlay.id = 'devtools-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    `;
    overlay.innerHTML = `
      <div>
        <h1 style="font-size: 2em; margin-bottom: 20px; color: #ff6b00;">⚠️ Developer Tools Detected</h1>
        <p style="font-size: 1.2em; margin-bottom: 15px;">This content is protected.</p>
        <p style="font-size: 1em; opacity: 0.8;">Please close developer tools to continue.</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  onDevToolsClose() {
    this.isDevToolsOpen = false;
    
    // Remove blur
    document.body.style.filter = '';
    document.body.style.userSelect = '';
    document.body.style.pointerEvents = '';
    
    // Remove overlay
    const overlay = document.getElementById('devtools-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Detect screen recording attempts
   */
  detectRecording() {
    const self = this;
    
    // Method 1: Performance monitoring (recordings often affect performance)
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Suspiciously low FPS might indicate recording
        if (fps < 20) {
          self.logAttempt(`Recording detection: Low FPS detected (${fps})`);
        }
      }
      
      requestAnimationFrame(checkFrameRate);
    };
    
    requestAnimationFrame(checkFrameRate);

    // Method 2: Monitor for MediaRecorder API
    if (window.MediaRecorder) {
      const OriginalMediaRecorder = window.MediaRecorder;
      window.MediaRecorder = function(...args) {
        self.logAttempt('Recording detection: MediaRecorder instantiated');
        if (self.options.showWarnings) {
          self.showWarning('Screen recording detected and may be restricted.');
        }
        return new OriginalMediaRecorder(...args);
      };
      
      // Copy static properties
      Object.setPrototypeOf(window.MediaRecorder, OriginalMediaRecorder);
      window.MediaRecorder.prototype = OriginalMediaRecorder.prototype;
    }

    // Method 3: Detect rapid canvas/image extraction
    let canvasAccessCount = 0;
    let canvasAccessTimer;
    
    const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;
    CanvasRenderingContext2D.prototype.drawImage = function(...args) {
      canvasAccessCount++;
      
      clearTimeout(canvasAccessTimer);
      canvasAccessTimer = setTimeout(() => {
        if (canvasAccessCount > 30) {
          self.logAttempt(`Recording detection: Rapid canvas access detected (${canvasAccessCount} calls)`);
        }
        canvasAccessCount = 0;
      }, 1000);
      
      return originalDrawImage.apply(this, args);
    };
  }

  /**
   * Prevent Print Screen key
   */
  preventPrintScreen() {
    const self = this;
    
    document.addEventListener('keyup', (e) => {
      // Print Screen key detection (various methods)
      if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
        self.logAttempt('Print Screen key detected');
        
        if (self.options.showWarnings) {
          self.showWarning('Screenshot functionality is disabled for content protection.');
        }
        
        // Try to clear clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      }
    });

    // Additional keyboard combinations
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + Shift + 3/4/5 (Mac screenshot shortcuts)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && [51, 52, 53].includes(e.keyCode)) {
        e.preventDefault();
        self.logAttempt('Screenshot keyboard shortcut detected');
        if (self.options.showWarnings) {
          self.showWarning('Screenshot shortcuts are disabled.');
        }
      }
    });
  }

  /**
   * Prevent drag and drop of images
   */
  preventDragDrop() {
    document.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        this.logAttempt('Image drag attempt prevented');
      }
    });
  }

  /**
   * Add visual watermark overlay
   */
  addVisualWatermark() {
    const watermark = document.createElement('div');
    watermark.id = 'content-protection-watermark';
    watermark.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.03;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(255, 107, 0, 0.1) 100px,
        rgba(255, 107, 0, 0.1) 200px
      );
      mix-blend-mode: multiply;
    `;
    
    // Add timestamp watermark
    const timestamp = document.createElement('div');
    timestamp.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      font-size: 10px;
      opacity: 0.15;
      color: #ff6b00;
      pointer-events: none;
      z-index: 9999;
      font-family: monospace;
    `;
    timestamp.textContent = `Protected • ${new Date().toISOString()}`;
    
    document.body.appendChild(watermark);
    document.body.appendChild(timestamp);
    
    // Update timestamp periodically
    setInterval(() => {
      timestamp.textContent = `Protected • ${new Date().toISOString()}`;
    }, 1000);
  }

  /**
   * Show warning notification
   */
  showWarning(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ff6b00, #ff8c00);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(255, 107, 0, 0.4);
      z-index: 999999;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 350px;
      animation: slideInFromRight 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOutToRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">🛡️</div>
        <div>
          <div style="font-weight: bold; margin-bottom: 4px;">Content Protection</div>
          <div style="font-size: 12px; opacity: 0.9;">${message}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutToRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }

  /**
   * Log security attempts
   */
  logAttempt(message) {
    if (this.options.logAttempts) {
      const timestamp = new Date().toISOString();
      console.warn(`[Content Protection] ${timestamp}: ${message}`);
      
      // Could also send to analytics or security monitoring service
      // this.sendToSecurityMonitoring({ timestamp, message });
    }
  }

  /**
   * Cleanup all protections
   */
  cleanup() {
    // Call all cleanup handlers
    this.detectionHandlers.forEach(handler => handler());
    
    // Restore original APIs
    if (this.originalAPIs.getDisplayMedia && navigator.mediaDevices) {
      navigator.mediaDevices.getDisplayMedia = this.originalAPIs.getDisplayMedia;
    }
    
    // Remove watermarks
    const watermark = document.getElementById('content-protection-watermark');
    if (watermark) watermark.remove();
    
    // Remove DevTools overlay
    const overlay = document.getElementById('devtools-overlay');
    if (overlay) overlay.remove();
    
    // Restore body styles
    document.body.style.filter = '';
    document.body.style.userSelect = '';
    document.body.style.pointerEvents = '';
  }
}

// Export singleton instance
let protectionInstance = null;

export const initializeContentProtection = (options) => {
  if (!protectionInstance) {
    protectionInstance = new ContentProtection(options);
    protectionInstance.initialize();
  }
  return protectionInstance;
};

export const cleanupContentProtection = () => {
  if (protectionInstance) {
    protectionInstance.cleanup();
    protectionInstance = null;
  }
};

export default ContentProtection;
