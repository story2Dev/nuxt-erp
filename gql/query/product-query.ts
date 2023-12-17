export const PRODUCTS_QUERY = gql`
  query products(
    $limit: Int
    $offset: Int
    $order_by: [products_order_by!]
    $where: products_bool_exp
  ) {
    products(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      id
      name
      sku
      barcode
      description
      unitPrice: unit_price
      stockQuantity: stock_quantity
      stockTrackable: stock_trackable
      typeId: type_id
      categoryId: category_id
      parentId: parent_id
      thumbnail
      createdAt: created_at
      updatedAt: updated_at
    }
    aggregate: products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
