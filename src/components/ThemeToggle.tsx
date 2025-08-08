'use client';

import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme, isDark } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'bi-sun-fill';
      case 'dark':
        return 'bi-moon-fill';
      case 'system':
        return 'bi-display';
      default:
        return 'bi-display';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'System';
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-secondary"
        size="sm"
        className="d-flex align-items-center gap-2"
        aria-label="Toggle theme"
      >
        <i className={`bi ${getThemeIcon()}`}></i>
        <span className="d-none d-md-inline">{getThemeLabel()}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => setTheme('light')}
          className={theme === 'light' ? 'active' : ''}
        >
          <i className="bi bi-sun-fill me-2"></i>
          Light
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setTheme('dark')}
          className={theme === 'dark' ? 'active' : ''}
        >
          <i className="bi bi-moon-fill me-2"></i>
          Dark
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setTheme('system')}
          className={theme === 'system' ? 'active' : ''}
        >
          <i className="bi bi-display me-2"></i>
          System
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
