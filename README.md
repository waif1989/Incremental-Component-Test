# Webpack4.8.x Config Framework For VueComponent Development
The framework bases on Webpack4.8.x and Vue which can make us develop vue component more qiuckly. Before you are going to code, The framework will prepare basal Webpack's config and Vue's config which you need. After cloning the project, You just input 'npm i' and you can code something after packages are ready.
## Getting Started
Download the project from github. Before you go to code, I suggest you change the property of name and description and keywords in package.json.
## Installing
```js
npm i
```
## Development
```js
npm start:dev
http://localhost:9081/
```
### Development Description
```
Your component file is in 'src/my-component/my-component.vue',
```
## Building
```js
npm build
```
### Building Description
```
Building files will be putted in dist folder.
The building component bundle is named 'index.js' which can be used as UMD or CMD module.
```
## License
This project is licensed under the MIT License