import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CookieConsent from '../CookieConsent';
import { useLanguage } from '../../context/LanguageContext';

// Mock framer-motion to simplify testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }) => {
      // Remove specific animation props for standard div rendering
      const { initial, animate, exit, ...rest } = props;
      return <div className={className} {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the language context
vi.mock('../../context/LanguageContext', () => ({
  useLanguage: vi.fn(),
}));

describe('CookieConsent Component', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Default mock implementation for translations
    useLanguage.mockReturnValue({
      t: (key) => key,
    });

    // Mock localStorage
    Storage.prototype.getItem = vi.fn();
    Storage.prototype.setItem = vi.fn();

    // Use fake timers
    vi.useFakeTimers();

    // Mock window dispatch event
    vi.spyOn(window, 'dispatchEvent');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render initially if there is no consent', () => {
    Storage.prototype.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    // Before the timer completes, it shouldn't be visible
    expect(screen.queryByText('cookies.title')).not.toBeInTheDocument();
  });

  it('should render after 1500ms if there is no consent', () => {
    Storage.prototype.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Now it should be visible
    expect(screen.getByText('cookies.title')).toBeInTheDocument();
    expect(screen.getByText('cookies.desc')).toBeInTheDocument();
  });

  it('should not render at all if consent is already given (granted)', () => {
    Storage.prototype.getItem.mockReturnValue('granted');
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText('cookies.title')).not.toBeInTheDocument();
  });

  it('should not render at all if consent is already given (declined)', () => {
    Storage.prototype.getItem.mockReturnValue('declined');
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.queryByText('cookies.title')).not.toBeInTheDocument();
  });

  it('should handle accepting cookies correctly', () => {
    Storage.prototype.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const acceptBtn = screen.getByText('cookies.accept');
    fireEvent.click(acceptBtn);

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('cookie-consent', 'granted');

    // Check custom event is dispatched
    const dispatchedEvent = window.dispatchEvent.mock.calls[0][0];
    expect(dispatchedEvent.type).toBe('cookie-consent-granted');

    // Should hide the banner
    expect(screen.queryByText('cookies.title')).not.toBeInTheDocument();
  });

  it('should handle declining cookies correctly', () => {
    Storage.prototype.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const declineBtn = screen.getByText('cookies.decline');
    fireEvent.click(declineBtn);

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('cookie-consent', 'declined');

    // Should NOT dispatch the GA event
    expect(window.dispatchEvent).not.toHaveBeenCalled();

    // Should hide the banner
    expect(screen.queryByText('cookies.title')).not.toBeInTheDocument();
  });
});
