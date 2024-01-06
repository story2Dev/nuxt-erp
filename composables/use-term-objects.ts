import { INSERT_TERM_OBJECTS } from '~/gql/mutate';
import type { TermObject, TermObjectInput } from '~/types';

export const useTermObjects = () => {
  const { client } = useApolloClient();

  async function insert(objects: TermObjectInput[]) {
    try {
      const { data, errors } = await client.mutate({
        mutation: INSERT_TERM_OBJECTS,
        variables: {
          objects: toHasuraInput(objects),
        },
      });

      if (errors) {
        throw new Error(`[useTermObjects]: insert errors: ${errors}`);
      }

      return {
        termObjects: data?.insertTermObjects as TermObject[],
        errors,
      };
    } catch (error) {
      throw new Error(`[useTermObjects]: insert error: ${error}`);
    }
  }

  return {
    insert,
  };
};
