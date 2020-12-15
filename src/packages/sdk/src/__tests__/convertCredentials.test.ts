import { uriToCredentials, credentialsToUri } from '../convertCredentials'

const uris = [
  'file:',
  'file:dev.db',
  'file:/absolute-dev.db',
  'file:./current-dev.db',
  'file:../parent-dev.db',
  'file:../../parent-parent-dev.db',
  'sqlite:',
  'sqlite:dev.db',
  'sqlite:/absolute-dev.db',
  'sqlite:./current-dev.db',
  'sqlite:../parent-dev.db',
  'sqlite:../../parent-parent-dev.db',
  'sqlite://',
  'sqlite://dev.db',
  'postgresql://localhost:5433?schema=production',
  'postgresql://other@localhost/otherdb?schema=my_schema&connect_timeout=10&application_name=myapp',
  'mysql://user@localhost:3333',
  'mysql://user@localhost:3333/dbname',
  'mysql://user@localhost:3333/dbname?sslmode=prefer',
  'mysql://root@/db?socket=/private/tmp/mysql.sock',
  'mongodb://mongodb0.example.com:27017/admin',
  'mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/admin',
  'sqlserver://localhost:1433;database=master;user=SA;password=Pr1sm4_Pr1sm4;trustServerCertificate=true;encrypt=DANGER_PLAINTEXT;schema=mySchema',
  'sqlserver://localhost:1433;database=master;user=SA;password=Pr1sm4_Pr1sm4;trustServerCertificate=true;encrypt=DANGER_PLAINTEXT',
]

for (const uri of uris) {
  test(`Convert ${uri}`, () => {
    const credentials = uriToCredentials(uri)
    const uriFromCredentials = credentialsToUri(credentials)

    expect(credentials).toMatchSnapshot()
    expect(uriFromCredentials).toMatchSnapshot()

    expect(uriFromCredentials).toBe(uri)
  })
}

// Because we add ?schema=public for default
const notIdenticalUris = [
  'postgresql://',
  'postgresql://localhost',
  'postgresql://localhost:5433',
  'postgresql://localhost/mydb',
  'postgresql://user@localhost',
  'postgresql://user:secret@localhost',
  'postgresql://user:secret@localhost?sslmode=prefer',
  'postgresql://root:prisma@/prisma?host=/var/run/postgresql/',
]

for (const uri of notIdenticalUris) {
  test(`Convert ${uri}`, () => {
    const credentials = uriToCredentials(uri)
    const uriFromCredentials = credentialsToUri(credentials)

    expect(credentials).toMatchSnapshot()
    expect(uriFromCredentials).toMatchSnapshot()
  })
}
