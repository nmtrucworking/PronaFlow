Code Flow
![[Code Flow - Backend.png]]

Root folder - Backend project
![[Pasted image 20250926160951.png]]

## Start server:
```bash
npm run start:dev
```

`nodemon`: Tự động reload server theo src được sửa, không cần tắt server để reload lại.
## Folder:
### `config/`
![[Pasted image 20250926161235.png]]
`src/config/`: 
- `cor.js`:
- `environment.js`:
- `mongodb.js`: cấu hình mongodb
`src/controllers/`: Xử lý điều hướng (flow) các chức năng của project
`providers/`: Xử dụng dịch vụ bên thứ ba:
	vd: Xác thực email, lưu trữ file (clouds), ...
`routes/`: API endpoint.
`serviecs/`: Xử lý logic của dự án. Sau khi xử lý logic sẽ gọi đến `models/`
`src/utils/`

`.eslintrc.cjs`
```js
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 * Sample Eslint config for NodeJS ExpressJS MongoDB project
 */
module.exports = {
  env: { es2020: true, node: true },
  extends: [
    'eslint:recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    allowImportExportEverywhere: true
  },
  plugins: [],
  rules: {
    // Common
    'no-console': 1,
    'no-extra-boolean-cast': 0,
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': ['warn', 2],
    'semi': [1, 'never'],
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1
  }
}
```



`.gitinore`: [[Git and Github]]
