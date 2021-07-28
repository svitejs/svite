# svite-template-tauri-routify-ts

## setup

1. Setup tauri dev environment for your os

- see https://tauri.studio/en/docs/getting-started/intro

2. init tauri with `npm run tauri init`

- set web web assets dir to `../dist`
- set dev server to http://localhost:3000

3. development

- use `npm run dev` if you only want to develop the ui part in the browser
- use `npm run tauri-dev` if you want to develop with tauri running. first run takes a while

4. building

- use `npm run build` if you only want to build the ui part into `dist`
- use `npm run tauri-build` if you want to build the native app. first run takes a while

5. enjoy
