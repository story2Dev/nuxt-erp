import type { KeyValue } from '~/types';

export const useApp = () => {
  const title = useState('app-title', () => 'Dashboard');

  // setting app
  const setting = useState<KeyValue>('app-setting', () => ({}));

  const page = ref(1);
  const limit = 2;
  const search = ref('');

  return {
    title,
    setting,
    page,
    limit,
    search,
  };
};
