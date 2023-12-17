export const INSERT_PRODUCT = gql`
  mutation insertProduct($object: products_insert_input!) {
    insertProduct: insert_products_one(object: $object) {
      id
      name
      sku
      barcode
      description
      unitPrice: unit_price
      stockQuantity: stock_quantity
      stockTrackable: stock_trackable
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: uuid!, $object: products_set_input!) {
    updateProduct: update_products_by_pk(
      pk_columns: { id: $id }
      _set: $object
    ) {
      id
      name
      sku
      barcode
      description
      unitPrice: unit_price
      stockQuantity: stock_quantity
      stockTrackable: stock_trackable
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: uuid!) {
    deleteProduct: delete_products_by_pk(id: $id) {
      id
    }
  }
`;
