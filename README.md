# Config
* config file 생성

/src/config/secret.ts
```
export const JWT_SECRET_KEY = key
export const PASSWORD_SALT_ROUND = salt
```

/src/config/storage.ts
```
export default {
  deveopment: {
    schema: 'workhub',
    username: 'foo',
    password: 'foo123',
    host: 'host',
    dialect: 'mysql',
  },
  product: {
    schema: 'workhub',
    username: 'foo',
    password: 'foo123',
    host: 'host',
    dialect: 'mysql',
  }
}
```