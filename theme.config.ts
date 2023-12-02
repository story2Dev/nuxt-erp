import type { GlobalThemeOverrides } from 'naive-ui';
import { theme } from '#tailwind-config';

const rounded = '0.5rem';

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: theme.colors.primary[500],
    borderColor: '#eee',
    borderRadius: rounded,
    borderRadiusSmall: '4px',
    primaryColorHover: theme.colors.primary[600],
  },
  Button: {
    borderRadiusLarge: rounded,
    borderRadiusMedium: '0.7rem',
  },

  Input: {
    borderFocus: '1px solid ' + theme.colors.primary[400],
    boxShadowFocus: '0 0 0px 3px ' + theme.colors.primary[100],
    paddingMedium: '2px 12px',
    fontSizeMedium: '12px',
    lineHeightMedium: '1px',
    lineHeight: '1px',
    heightMedium: '30px',
    borderRadius: rounded,
  },
  Card: {
    borderRadius: rounded,
    paddingMedium: '1rem',
  },
  Select: {
    peers: {
      InternalSelection: {},
    },
  },
  Notification: {
    borderRadius: rounded,
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: theme.colors.primary[600],
    borderColor: '#eee',
    borderRadius: rounded,
    borderRadiusSmall: rounded,
  },
  Button: {
    borderRadiusLarge: '12px',
    borderRadiusMedium: rounded,
    border: '1px solid #404040',
  },
  Input: {
    textColor: theme.colors.primary[600],
    borderFocus: '1px solid ' + theme.colors.primary[100],
    boxShadowFocus: '0 0 0px 3px ' + theme.colors.primary[500],
    paddingMedium: '2px 12px',
    fontSizeMedium: '12px',
    lineHeightMedium: '1px',
    lineHeight: '1px',
    heightMedium: '30px',
    borderRadius: rounded,
  },
  Card: {
    borderRadius: rounded,
    paddingMedium: '1rem',
    color: '#000000',
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#FF0000',
      },
    },
  },
  Notification: {
    borderRadius: rounded,
  },
  Popover: {
    color: '#232323',
  },
};

export { lightThemeOverrides, darkThemeOverrides };
