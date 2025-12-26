<<<<<<< 

🚀 Демо
<img width="1889" height="899" alt="image" src="https://github.com/user-attachments/assets/4ca3943d-6a0f-470e-a42b-6e5a98d13715" />

https://yakushev-sergey.github.io/ToDo-App/

✨ Особенности

 🎯 Управление задачами
- ✅ Создание, удаление задач
- 📅 Привязка к дедлайнам
- 🏷️ Категории (Персональные/Официальные)
- 📊 Отслеживание прогресса выполнения
- 
👤 Пользовательская система
- 🔐 Регистрация и вход
- 👤 Персональные данные пользователей
- 🔄 Привязка задач к аккаунту

 🎨 Интерфейс
- 📱 Полностью адаптивный дизайн
- 🎭 Плавные анимации
- 🌊 Интерактивный прогресс-бар
- 📅 Интегрированный календарь

-  🛠️ Технологии

| Технология | Назначение |

| **React 18** 
| **TypeScript** 
| **CSS Modules** 
| **LocalStorage** 
| **Vite**

👨‍💻 Автор
Сергей Якушев
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# ToDo-App
>>>>>>> 3489decb9fb1de51c2540a09ed3de66101d0f418
