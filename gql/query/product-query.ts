export const PRODUCTS_QUERY = gql`
  query products(
    $limit: Int
    $offset: Int
    $orderBy: [products_order_by!]
    $where: products_bool_exp
  ) {
    products(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      name
      sku
      barcode
      description
      cost
      unitPrice: unit_price
      stockQuantity: stock_quantity
      stockTrackable: stock_trackable
      typeId: type_id
      categoryId: category_id
      parentId: parent_id
      thumbnail
      createdAt: created_at
      updatedAt: updated_at
      category: term {
        id
        name
      }
    }
    aggregate: products_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query products($id: uuid!) {
    product: products_by_pk(id: $id) {
      id
      name
      sku
      barcode
      description
      cost
      unitPrice: unit_price
      stockQuantity: stock_quantity
      stockTrackable: stock_trackable
      typeId: type_id
      categoryId: category_id
      unitId: unit_id
      parentId: parent_id
      thumbnail
      createdAt: created_at
      updatedAt: updated_at
      category: term {
        id
        name
      }
      type: termByTypeId {
        name
      }
      unit: termByUnitId {
        name
      }
      tags {
        id
        term {
          name
        }
      }
    }
  }
`;
