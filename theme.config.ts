import type { ThemeConfig } from '@bg-dev/nuxt-naiveui';
import { theme } from '#tailwind-config';

const rounded = '0.5rem';

const themeConfig: ThemeConfig = {
  shared: {
    common: {
      // borderColor: '#eee',
      primaryColor: theme.colors.primary[500],
      primaryColorHover: theme.colors.primary[400],
      primaryColorPressed: theme.colors.primary[300],
      borderRadius: rounded,
      borderRadiusSmall: '4px',
    },
    Button: {
      borderRadiusLarge: rounded,
      borderRadiusMedium: '0.7rem',
    },
    Input: {
      paddingMedium: '2px 12px',
      fontSizeMedium: '12px',
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
  },
  light: {
    Input: {
      borderFocus: '1px solid ' + theme.colors.primary[400],
      boxShadowFocus: '0 0 0px 3px ' + theme.colors.primary[100],
      borderHover: '1px solid ' + theme.colors.primary[300],
    },
  },
  dark: {
    common: {},
    Input: {
      borderFocus: '1px solid ' + theme.colors.primary[500],
      boxShadowFocus: '0 0 0px 3px ' + theme.colors.primary[400],
      borderHover: '1px solid ' + theme.colors.primary[400],
    },
  },
};

export { themeConfig };
