import { TERMS_QUERY } from '~/gql/query';
import { DELETE_TERM, INSERT_TERM, UPDATE_TERM } from '~/gql/mutate';
import type { Term, TermInput } from '~/types';

export const useTerm = () => {
  const { client } = useApolloClient();

  async function getTerms() {
    try {
      const { data, errors } = await client.query({ query: TERMS_QUERY });
      if (errors) {
        throw new Error(`[useTerm]: getTerms errors: ${errors}`);
      }
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
          object,
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
          _set: object,
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

      return {
        term: data?.deleteTerm as Term,
        errors,
      };
    } catch (error) {
      throw new Error(`[useTerm]: remove error: ${error}`);
    }
  }

  return {
    getTerms,
    insert,
    update,
    remove,
  };
};