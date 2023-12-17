import { DELETE_PRODUCT, INSERT_PRODUCT, UPDATE_PRODUCT } from '~/gql/mutate';
import { PRODUCTS_QUERY } from '~/gql/query';
import type { Product, ProductInput, Variable } from '~/types';

export const useProduct = () => {
  const { client } = useApolloClient();

  const frm = useState<Partial<Product>>('frm', () => ({
    name: '',
    sku: '',
    barcode: '',
    description: '',
    unitPrice: 0,
    stockQuantity: 0,
    stockTrackable: false,
  }));
  const count = useState<number>('count', () => 0);

  async function getProducts(variables?: Partial<Variable>) {
    try {
      const { data, errors } = await client.query({
        query: PRODUCTS_QUERY,
        variables,
      });
      if (errors) {
        throw new Error(`[useProduct]: getProducts errors: ${errors}`);
      }
      const _count = data?.aggregate?.aggregate?.count || 0;
      count.value = _count;
      const items: Product[] = data?.products || [];
      return {
        items,
        errors,
      };
    } catch (error) {
      throw new Error(`[useProduct]: getProducts error: ${error}`);
    }
  }

  async function insert(object: ProductInput) {
    try {
      const { data, errors } = await client.mutate({
        mutation: INSERT_PRODUCT,
        variables: {
          object: toHasuraInput(object),
        },
      });

      if (errors) {
        throw new Error(`[insert]: insert errors: ${errors}`);
      }

      return {
        product: data?.insertProduct as Product,
        errors,
      };
    } catch (error) {
      throw new Error(`[useProduct]: insert error: ${error}`);
    }
  }

  async function update(id: string, object: Partial<ProductInput>) {
    try {
      const { data, errors } = await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id,
          object: toHasuraInput(object),
        },
      });

      if (errors) {
        throw new Error(`[update]: update errors: ${errors}`);
      }

      return {
        product: data?.updateProduct as Product,
        errors,
      };
    } catch (error) {
      throw new Error(`[useProduct]: update error: ${error}`);
    }
  }

  // remove
  async function remove(id: string) {
    try {
      const { data, errors } = await client.mutate({
        mutation: DELETE_PRODUCT,
        variables: {
          id,
        },
      });

      if (errors) {
        throw new Error(`[remove]: remove errors: ${errors}`);
      }

      return {
        product: data?.deleteProduct as Product,
        errors,
      };
    } catch (error) {
      throw new Error(`[useProduct]: remove error: ${error}`);
    }
  }

  return {
    frm,
    count,
    getProducts,
    insert,
    update,
    remove,
  };
};
