module.exports = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'TripleCommaClub',
          'x-hasura-allowed-roles': 'flagship',
        },
      },
    },
  ],
  documents: ['./src/**/*.ts', '!*.generated.ts'],
  overwrite: true,
  generates: {
    './src/graphql.generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          numeric: 'number',
          smallint: 'number',
          timestamp: 'string',
          timestamptz: 'string',
          uuid: 'string',
          bpchar: 'string',
          jsonb: 'unknown',
        },
      },
    },
    'hasura_allow_list.yaml': {
      plugins: ['hasura-allow-list'],
      config: {
        collectionName: 'flagship'
      }
    }
  },
}
