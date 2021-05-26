/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/style.scss":
/*!***************************!*\
  !*** ./styles/style.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./styles/style.scss?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ \"./styles/style.scss\");\n\r\n\r\n\r\nconst addTask = document.querySelector('#buttonId');\r\nconst inputTask = document.querySelector('#inputId');\r\nconst ul = document.querySelector('.ul');\r\nconst deleteAllTasks = document.querySelector('#buttonAllDel');\r\nconst copmletedTaskRadioBtn = document.querySelector('#completed');\r\nconst sortBtns = document.getElementsByName('tasks');\r\ninputTask.focus();\r\n\r\nconst store = {\r\n  state: {\r\n    tasks: [],\r\n    currentFilterSlug: 'all',\r\n  },\r\n  get currentFilterSlug() {\r\n    return this.state.currentFilterSlug;\r\n  },\r\n  set currentFilterSlug(value) {\r\n    this.state.currentFilterSlug = value;\r\n    renderList();\r\n  },\r\n  get tasks() {\r\n    return this.state.tasks;\r\n  },\r\n  set tasks(value) {\r\n    this.state.tasks = value;\r\n    renderList();\r\n    updateLocal();\r\n  },\r\n  filters: [\r\n    {\r\n      slug: 'completed',\r\n      callback: (task) => task.completed,\r\n    },\r\n    {\r\n      slug: 'active',\r\n      callback: (task) => !task.completed,\r\n    },\r\n  ],\r\n  get filteredTasks() {\r\n    const currentFilter = this.filters.find((filter) => filter.slug === this.currentFilterSlug);\r\n\r\n    if (!currentFilter) return this.tasks;\r\n\r\n    return this.tasks.filter(currentFilter.callback);\r\n  },\r\n};\r\n\r\nconst updateLocal = () => {\r\n  localStorage.setItem('tasks', JSON.stringify(store.tasks));\r\n};\r\n\r\nconst createTaskId = () => `f${(+new Date()).toString(16)}-${store.tasks.length}`;\r\n\r\nconst createTask = (text) => ({\r\n  id: createTaskId(),\r\n  text,\r\n  completed: false,\r\n  edit: false,\r\n});\r\n\r\nconst createTaskDeleteButton = (task) => {\r\n  const buttonDel = document.createElement('button');\r\n\r\n  buttonDel.textContent = 'Удалить';\r\n\r\n  buttonDel.addEventListener('click', () => {\r\n    store.tasks = store.tasks.filter((t) => t.id !== task.id);\r\n  });\r\n\r\n  return buttonDel;\r\n};\r\n\r\n\r\n\r\nconst createTaskCompleteButton = (task) => {\r\n  const buttonComplete = document.createElement('button');\r\n\r\n  buttonComplete.textContent = 'Выполнить';\r\n\r\n  buttonComplete.addEventListener('click', () => {\r\n    store.tasks = store.tasks.map((t) => ({\r\n      ...t,\r\n      completed: t.id === task.id ? !t.completed : t.completed,\r\n    }));\r\n  });\r\n\r\n  return buttonComplete;\r\n};\r\n\r\n\r\nconst createTaskEditor = (task) => {\r\n  const btnDel = createTaskDeleteButton(task);\r\n  const btnComplete = createTaskCompleteButton(task);\r\n  const editorField = document.createElement('div');\r\n  const inputEdit = document.createElement('input');\r\n  const editButton = document.createElement('button');\r\n  const saveButton = document.createElement('button');\r\n  inputEdit.style.display = 'none';\r\n  saveButton.textContent = 'Сохранить';\r\n  saveButton.style.display = 'none';\r\n  editButton.textContent = 'Редактировать';\r\n\r\n  editButton.className = 'button';\r\n  saveButton.className = 'button';\r\n  btnComplete.className = 'button';\r\n  btnDel.className = 'button';\r\n  inputEdit.className = 'input-field';\r\n  inputEdit.classList.add('input-edit-task');\r\n\r\n  if (task.edit) {\r\n    inputEdit.style.display = 'inline-block';\r\n    inputEdit.value = task.text;\r\n    saveButton.style.display = 'inline-block';\r\n    editButton.style.display = 'none';\r\n    console.log('>>>', btnComplete);\r\n    btnComplete.style.display = 'none';\r\n    btnDel.style.display = 'none';\r\n  } else {\r\n    inputEdit.style.display = 'none';\r\n    btnComplete.style.display = 'inline-block';\r\n    btnDel.style.display = 'inline-block'\r\n  }\r\n\r\n  const saveTask = (e) => {\r\n    if ((e.type !== 'click' && e.keyCode !== 13) || !inputEdit.value) return;\r\n\r\n    store.tasks = store.tasks.map((t) => ({\r\n      ...t,\r\n      text: t.id === task.id ? inputEdit.value : t.text,\r\n      edit: false,\r\n    }));\r\n  };\r\n\r\n  inputEdit.addEventListener('keydown', saveTask);\r\n  saveButton.addEventListener('click', saveTask);\r\n\r\n  editButton.addEventListener('click', () => {\r\n    store.tasks = store.tasks.map((t) => ({\r\n      ...t,\r\n      edit: t.id === task.id,\r\n    }));\r\n  });\r\n  editorField.append(btnDel);\r\n  editorField.append(btnComplete);\r\n  editorField.append(editButton);\r\n  editorField.append(inputEdit);\r\n  editorField.append(saveButton);\r\n  return editorField;\r\n};\r\n\r\nconst addTaskListener = (e) => {\r\n  if (e.type !== 'click' && e.keyCode !== 13) return;\r\n\r\n  const newTask = createTask(inputTask.value);\r\n  inputTask.value = '';\r\n  if (newTask.text === '') {\r\n    return;\r\n  }\r\n\r\n  store.tasks = [...store.tasks, newTask];\r\n};\r\n\r\ndeleteAllTasks.addEventListener('click', () => {\r\n  store.tasks = [];\r\n});\r\n\r\naddTask.addEventListener('click', addTaskListener);\r\ninputTask.addEventListener('keydown', addTaskListener);\r\n\r\nconst createTaskTemplate = (task) => {\r\n  const li = document.createElement('li');\r\n  // const deleteButton = createTaskDeleteButton(task);\r\n  // const completeButton = createTaskCompleteButton(task);\r\n  const taskEditor = createTaskEditor(task);\r\n\r\n  li.className = 'task-item';\r\n  // btnComplete.className = 'button';\r\n  // deleteButton.className = 'button';\r\n\r\n  if (task.completed) {\r\n    li.classList.add('task-completed');\r\n  }\r\n\r\n  if (task.edit) {\r\n    li.textContent = '';\r\n  } else {\r\n    li.textContent = task.text;\r\n  }\r\n\r\n  // li.append(btnComplete);\r\n  // li.append(deleteButton);\r\n  li.append(taskEditor);\r\n\r\n  if (copmletedTaskRadioBtn.hasAttribute('checked')) {\r\n    completeButton.remove();\r\n  }\r\n  return li;\r\n};\r\n\r\nsortBtns.forEach((btn) => {\r\n  btn.addEventListener('click', () => {\r\n    store.currentFilterSlug = btn.value;\r\n  });\r\n});\r\n\r\nconst renderList = () => {\r\n  ul.innerHTML = '';\r\n\r\n  store.filteredTasks.forEach((task) => {\r\n    const taskTemplate = createTaskTemplate(task);\r\n    ul.append(taskTemplate);\r\n  });\r\n};\r\n\r\nif (!localStorage.tasks) {\r\n  store.tasks = [];\r\n} else {\r\n  store.tasks = JSON.parse(localStorage.getItem('tasks'));\r\n}\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;