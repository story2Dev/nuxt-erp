export const TERM_QUERY = gql`
  query term($id: uuid!) {
    term: terms_by_pk(id: $id) {
      id
      name
      parentId: parent_id
      groupId: group_id
      createdAt: created_at
      updatedAt: updated_at
      termMeta: term_meta {
        id
        key
        value
      }
    }
  }
`;

export const TERMS_QUERY = gql`
  query term(
    $where: terms_bool_exp
    $orderBy: [terms_order_by!] = { name: asc }
    $limit: Int
    $offset: Int
  ) {
    terms(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
      id
      name
      parentId: parent_id
      groupId: group_id
      createdAt: created_at
      updatedAt: updated_at
      termMeta: term_meta {
        id
        key
        value
        termId: term_id
      }
    }
    aggregate: terms_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
