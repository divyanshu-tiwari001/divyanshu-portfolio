import React from 'react';
import { FEATURE_FLAGS } from '../../utils/featureFlags';
import { disable3D } from '../../utils/3dSystem';

/**
 * React Error Boundary that wraps 3D canvas components.
 *
 * When a child throws during rendering, it:
 *  1. Logs the error to the console.
 *  2. If AUTO_DISABLE_3D_ON_ERROR is set, calls disable3D() which stores
 *     the flag in localStorage and reloads the page (so the user gets the
 *     clean 2-D layout on the very next load).
 *  3. While still on the current page, renders the optional `fallback` prop
 *     (or null) instead of the broken 3D canvas.
 *
 * Props:
 *   fallback  – Optional ReactNode shown while / after the error.
 *   children  – The 3D component(s) to protect.
 */
export default class ErrorBoundary3D extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('3D failed:', error, info?.componentStack ?? '');
    if (FEATURE_FLAGS.AUTO_DISABLE_3D_ON_ERROR) {
      disable3D(`Runtime error: ${error?.message ?? error}`);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
