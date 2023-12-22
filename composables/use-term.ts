import { TERMS_QUERY } from '~/gql/query';
import { DELETE_TERM, INSERT_TERM, UPDATE_TERM } from '~/gql/mutate';
import type { Term, TermInput, Variable } from '~/types';
import { SORT_MODE, type SortMode } from '~/constants';

export const useTerm = () => {
  const { client } = useApolloClient();

  const { limit, search, page } = useApp();
  const terms = useState<Term[]>('terms', () => []);
  const count = useState<number>('count', () => 0);
  const frm = useState<Partial<Term>>('frm', () => ({
    id: '',
    name: '',
    status: true,
  }));

  const isAdd = ref(false);
  const isEdit = ref(false);
  const isDelete = ref(false);

  async function getTerms(variables?: Partial<Variable>) {
    try {
      const { data, errors } = await client.query({
        query: TERMS_QUERY,
        variables,
      });
      if (errors) {
        throw new Error(`[useTerm]: getTerms errors: ${errors}`);
      }
      const _count = data?.aggregate?.aggregate?.count || 0;
      count.value = _count;
      const items: Term[] = data?.terms || [];
      return {
        items,
        errors,
      };
    } catch (error) {
      throw new Error(`[useTerm]: getTerms error: ${error}`);
    }
  }

  async function insert(object: TermInput) {
    try {
      const { data, errors } = await client.mutate({
        mutation: INSERT_TERM,
        variables: {
          object: toHasuraInput(object),
        },
      });

      if (errors) {
        throw new Error(`[insert]: insert errors: ${errors}`);
      }

      return {
        term: data?.insertTerm as Term,
        errors,
      };
    } catch (error) {
      throw new Error(`[useTerm]: insert error: ${error}`);
    }
  }

  async function update(id: string, object: Partial<TermInput>) {
    try {
      const { data, errors } = await client.mutate({
        mutation: UPDATE_TERM,
        variables: {
          object: toHasuraInput(object),
          id,
        },
      });

      if (errors) {
        throw new Error(`[useTerm]: update errors: ${errors}`);
      }

      return {
        term: data?.updateTerm as Term,
        errors,
      };
    } catch (error) {
      throw new Error(`[useTerm]: update error: ${error}`);
    }
  }

  async function remove(id: string) {
    try {
      const { data, errors } = await client.mutate({
        mutation: DELETE_TERM,
        variables: {
          id,
        },
      });

      if (errors) {
        throw new Error(`[useTerm]: remove errors: ${errors}`);
      }
      // remove state
      terms.value = terms.value.filter((item) => item.id !== id);

      return {
        term: data?.deleteTerm as Term,
        errors,
      };
    } catch (error) {
      throw new Error(`[useTerm]: remove error: ${error}`);
    }
  }

  const pageCount = computed(() => Math.ceil(count.value / limit));

  async function handleSearch(
    groupId: number,
    orderBy: SortMode = SORT_MODE.ASC
  ) {
    const { items } = await getTerms({
      where: {
        group_id: {
          _eq: groupId,
        },
        name: {
          _ilike: `%${search.value}%`,
        },
      },
      limit,
      offset: (page.value - 1) * limit,
      orderBy: {
        name: orderBy,
      },
    });
    terms.value = items;
  }

  function setEdit(item: Term) {
    frm.value = {
      ...item,
    };
    isEdit.value = true;
  }

  function setDelete(item: Term) {
    frm.value = {
      ...item,
    };
    isDelete.value = true;
  }

  function handleRemove() {
    remove(frm.value.id as string);
    isDelete.value = false;
  }

  return {
    getTerms,
    insert,
    update,
    remove,
    terms,
    frm,
    count,
    handleSearch,
    pageCount,
    isAdd,
    setEdit,
    setDelete,
    handleRemove,
    isDelete,
    isEdit,
    search,
    page,
  };
};
