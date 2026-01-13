# Content Protection Documentation

This portfolio website implements comprehensive content protection to safeguard intellectual property and prevent unauthorized copying or recording of content.

## Overview

The content protection system consists of multiple layers of defense mechanisms working together to detect and prevent various forms of content theft:

1. **Screen Capture Detection & Prevention**
2. **Canvas/Image Protection**
3. **DevTools Detection**
4. **Recording Detection**
5. **Enhanced Copy Protection**
6. **Visual Watermarking**

## Features

### 1. Screen Capture Blocking

Prevents screen sharing and capture through browser APIs:

- **Blocks `getDisplayMedia()` API**: Prevents screen sharing requests
- **Blocks `getUserMedia()` with screen constraints**: Prevents screen recording through media APIs
- **User-friendly warnings**: Shows notification when screen capture is attempted
- **Cross-browser compatibility**: Works on Chrome, Firefox, Safari, and Edge

**How it works:**
- Overrides native browser APIs to reject screen capture requests
- Returns a `NotAllowedError` when capture is attempted
- Logs all attempts for security monitoring

### 2. Canvas Protection

Prevents screenshot extraction via JavaScript canvas manipulation:

- **Corrupts `toDataURL()` output**: Returns a protected placeholder instead of actual canvas content
- **Corrupts `toBlob()` output**: Prevents binary image extraction
- **Corrupts `getImageData()` output**: Prevents pixel-level data extraction
- **Non-intrusive**: Doesn't affect legitimate canvas usage for rendering

**How it works:**
- Intercepts canvas extraction methods
- Returns blank or corrupted data with "Protected Content" watermark
- Original content remains intact for display purposes

### 3. DevTools Detection

Detects when developer tools are opened and responds accordingly:

- **Console-based detection**: Monitors console API usage patterns
- **Window size detection**: Detects size changes indicative of DevTools
- **Visual warning overlay**: Displays a clear message when DevTools are detected
- **Content blurring**: Optionally blurs content when DevTools are open

**How it works:**
- Multiple detection methods for reliability
- Checks run every second
- Shows/hides overlay based on DevTools state
- Automatically restores normal view when DevTools are closed

### 4. Recording Detection

Identifies potential screen recording attempts:

- **FPS monitoring**: Detects suspiciously low frame rates (< 20 FPS)
- **MediaRecorder API detection**: Monitors instantiation of MediaRecorder
- **Rapid canvas access detection**: Identifies potential frame extraction (> 30 accesses/second)
- **Performance impact monitoring**: Tracks unusual performance patterns

**How it works:**
- Continuously monitors frame rate using `requestAnimationFrame`
- Wraps MediaRecorder constructor to log usage
- Tracks canvas drawing operations frequency
- Logs suspicious patterns for investigation

### 5. Copy Protection

Complements existing copy protection with additional safeguards:

- **Print Screen prevention**: Detects Print Screen key and clears clipboard
- **Screenshot shortcut blocking**: Prevents OS-level screenshot shortcuts
- **Image drag prevention**: Blocks dragging images out of the page
- **Right-click protection**: Already implemented in main app

**How it works:**
- Listens for keyboard events
- Prevents default behavior on screenshot shortcuts
- Attempts to clear clipboard when Print Screen is detected

### 6. Visual Watermarking

Adds subtle indicators that content is protected:

- **Diagonal gradient pattern**: Barely visible repeating pattern overlay
- **Timestamp watermark**: Shows protection status with current timestamp
- **Non-intrusive design**: Minimal impact on user experience (3% opacity)
- **Dynamic updates**: Timestamp updates every second

**How it works:**
- Creates fixed-position overlay elements
- Uses CSS blend modes for subtle effect
- Updates timestamp in real-time
- Appears in any screenshots or recordings

## Configuration

The protection system is highly configurable. Options can be set when initializing:

```javascript
initializeContentProtection({
  enableDevToolsDetection: true,     // Enable/disable DevTools detection
  enableScreenCaptureBlocking: true, // Enable/disable screen capture blocking
  enableRecordingDetection: true,    // Enable/disable recording detection
  enableCanvasProtection: true,      // Enable/disable canvas protection
  enableWatermark: true,              // Enable/disable visual watermarks
  showWarnings: true,                 // Show user-facing warning notifications
  logAttempts: true                   // Log security events to console
});
```

### Configurable Constants

Key thresholds can be adjusted in `src/utils/contentProtection.js`:

- `DEVTOOLS_SIZE_THRESHOLD = 160`: Pixel difference threshold for DevTools detection
- `LOW_FPS_THRESHOLD = 20`: FPS below which recording is suspected
- `RAPID_CANVAS_ACCESS_THRESHOLD = 30`: Canvas accesses per second to flag
- `CANVAS_PROTECTION_COLOR = '#ff6b00'`: Color used in protected canvas output
- `CANVAS_PROTECTION_FONT = '20px Arial'`: Font for protected canvas text
- `CANVAS_PROTECTION_TEXT = 'Protected Content'`: Text shown in protected canvas

## Browser Compatibility

The protection system works across modern browsers:

- ✅ **Chrome/Chromium** (v90+): Full support for all features
- ✅ **Firefox** (v88+): Full support for all features
- ✅ **Safari** (v14+): Full support for all features
- ✅ **Edge** (v90+): Full support for all features

Note: Some detection methods may have varying accuracy across browsers due to differences in implementation.

## Security Logging

All protection events are logged to the browser console for monitoring:

```
[Content Protection] 2026-01-13T12:34:56.789Z: Screen capture blocked: getDisplayMedia() call prevented
[Content Protection] 2026-01-13T12:34:57.123Z: Canvas protection: toDataURL() call detected
[Content Protection] 2026-01-13T12:34:58.456Z: DevTools detected: Developer tools opened
[Content Protection] 2026-01-13T12:35:00.789Z: Recording detection: MediaRecorder instantiated
```

### Future Enhancements

The logging system includes placeholders for future analytics integration:

```javascript
// TODO: Send security events to analytics or monitoring service
// Example: this.sendToSecurityMonitoring({ timestamp, message, userAgent });
```

## User Experience Considerations

The protection system is designed to be:

1. **Non-intrusive**: Minimal impact on normal browsing
2. **Informative**: Clear warnings when protection is triggered
3. **Respectful**: Form inputs and editable content remain functional
4. **Performant**: Lightweight checks with minimal overhead

## Implementation Details

### Architecture

The protection system is implemented as a modular class:

- **File**: `src/utils/contentProtection.js`
- **Class**: `ContentProtection`
- **Integration**: `src/App.jsx` via React hooks
- **Lifecycle**: Initialized on mount, cleaned up on unmount

### Code Structure

```
src/
├── utils/
│   └── contentProtection.js  # Main protection class
├── App.jsx                     # Integration point
└── ...
```

### React Integration

```javascript
useEffect(() => {
  initializeContentProtection({
    // options
  });

  return () => {
    cleanupContentProtection();
  };
}, []);
```

## Limitations

While comprehensive, the protection system has some limitations:

1. **Physical cameras**: Cannot prevent photos/videos taken with external cameras
2. **VM/Remote Desktop**: May not detect recording at the host system level
3. **Browser extensions**: Some extensions might bypass protections
4. **Accessibility tools**: Screen readers and assistive technologies should still work
5. **Determined attackers**: Sophisticated users may find workarounds

## Best Practices

For optimal protection:

1. **Use HTTPS**: Ensure all content is served over secure connections
2. **Monitor logs**: Regularly review protection logs for patterns
3. **Update regularly**: Keep the protection system updated
4. **Combine with server-side**: Use server-side protections for sensitive data
5. **Legal protection**: Complement with copyright notices and terms of service

## Troubleshooting

### DevTools Overlay Won't Dismiss

- Close all developer tools completely
- Refresh the page
- Check browser window size

### Forms Not Working

- The protection system explicitly allows form inputs
- Try refreshing the page
- Check browser console for errors

### Performance Issues

- Disable some protection features via configuration
- Lower detection frequency by adjusting interval values
- Check for browser extension conflicts

## Security Considerations

This protection system is designed for:

- ✅ Deterring casual content theft
- ✅ Protecting against automated scraping
- ✅ Detecting unauthorized access attempts
- ✅ Maintaining audit trails

It is NOT a replacement for:

- ❌ Proper authentication and authorization
- ❌ Server-side data protection
- ❌ Legal protection (copyrights, patents, trademarks)
- ❌ DRM or encryption systems

## License

This content protection system is part of the portfolio project and should be used responsibly. Ensure compliance with local laws and regulations regarding content protection and user privacy.

## Support

For issues or questions about the content protection system:

1. Check this documentation
2. Review console logs for security events
3. Verify configuration options
4. Test in different browsers
5. File an issue in the repository

---

**Last Updated**: 2026-01-13  
**Version**: 1.0.0  
**Maintainer**: Divyanshu Tiwari
