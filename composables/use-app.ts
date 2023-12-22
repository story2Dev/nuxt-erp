import { SORT_MODE } from '~/constants';
import type { KeyValue, SortKey } from '~/types';

export const useApp = () => {
  const title = useState('app-title', () => 'Dashboard');

  // setting app
  const setting = useState<KeyValue>('app-setting', () => ({
    formatDate: 'dd/MM/yyyy',
    formatDateTime: 'dd/MM/yyyy HH:mm:ss',
    formatTime: 'HH:mm:ss',
  }));

  const page = ref(1);
  const limit = 10;
  const search = ref('');
  const orderBy = useState<SortKey>('app-order-by', () => ({
    key: 'id',
    mode: SORT_MODE.ASC,
  }));

  function getOrderBy() {
    const { key, mode } = orderBy.value;
    return {
      [key]: mode,
    };
  }

  return {
    title,
    setting,
    page,
    limit,
    search,
    orderBy,
    getOrderBy,
  };
};
