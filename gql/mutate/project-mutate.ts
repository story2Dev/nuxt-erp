export const INSERT_PROJECT = gql`
  mutation insertProject($object: projects_insert_input!) {
    insertProject: insert_projects_one(object: $object) {
      id
      name
      description
      email
      startDate: start_date
      endDate: end_date
      statusId: status_id
      userId: user_id
      projectMeta: project_meta {
        id
        key
        value
      }
    }
  }
`;
