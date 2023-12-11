export const INSERT_TERM = gql`
  mutation insertTerm($object: terms_insert_input!) {
    insertTerm: insert_terms_one(object: $object) {
      id
      name
      parentId: parent_id
      groupId: group_id
      termMeta: term_meta {
        id
        key
        value
      }
    }
  }
`;

export const UPDATE_TERM = gql`
  mutation updateTerm($id: uuid!, $object: terms_set_input!) {
    updateTerm: update_terms_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      name
      parentId: parent_id
      groupId: group_id
      termMeta: term_meta {
        id
        key
        value
      }
    }
  }
`;

export const DELETE_TERM = gql`
  mutation deleteTerm($id: uuid!) {
    deleteTerm: delete_terms_by_pk(id: $id) {
      id
    }
  }
`;
