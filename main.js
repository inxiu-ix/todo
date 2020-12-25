const addTask = document.querySelector('#buttonId');
const inputTask = document.querySelector('#inputId');
const ul = document.querySelector('.ul');
const deleteAllTasks = document.querySelector('#buttonAllDel');
const copmletedTaskRadioBtn = document.querySelector('#completed');
const sortBtns = document.getElementsByName('tasks');
inputTask.focus();

const store = {
  state: {
    tasks: [],
    currentFilterSlug: 'all',
  },
  get currentFilterSlug() {
    return this.state.currentFilterSlug;
  },
  set currentFilterSlug(value) {
    this.state.currentFilterSlug = value;
    renderList();
  },
  get tasks() {
    return this.state.tasks;
  },
  set tasks(value) {
    this.state.tasks = value;
    renderList();
    updateLocal();
  },
  filters: [
    {
      slug: 'completed',
      callback: (task) => task.completed,
    },
    {
      slug: 'active',
      callback: (task) => !task.completed,
    },
  ],
  get filteredTasks() {
    const currentFilter = this.filters.find((filter) => filter.slug === this.currentFilterSlug);

    if (!currentFilter) return this.tasks;

    return this.tasks.filter(currentFilter.callback);
  },
};

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(store.tasks));
};

const createTaskId = () => `f${(+new Date()).toString(16)}-${store.tasks.length}`;

const createTask = (text) => ({
  id: createTaskId(),
  text,
  completed: false,
  edit: false,
});

const createTaskDeleteButton = (task) => {
  const buttonDel = document.createElement('button');

  buttonDel.textContent = 'Удалить';

  buttonDel.addEventListener('click', () => {
    store.tasks = store.tasks.filter((t) => t.id !== task.id);
  });

  return buttonDel;
};

const createTaskCompleteButton = (task) => {
  const buttonComplete = document.createElement('button');

  buttonComplete.textContent = 'Выполнить';

  buttonComplete.addEventListener('click', () => {
    store.tasks = store.tasks.map((t) => ({
      ...t,
      completed: t.id === task.id ? !t.completed : t.completed,
    }));
  });

  return buttonComplete;
};

const createTaskEditor = (task) => {
  const divEditAndSave = document.createElement('div');
  const inputEdit = document.createElement('input');
  const editButton = document.createElement('button');
  const saveButton = document.createElement('button');
  inputEdit.style.display = 'none';
  saveButton.textContent = 'Сохранить';
  saveButton.style.display = 'none';
  editButton.textContent = 'Редактировать';

  if (task.edit) {
    inputEdit.style.display = 'inline-block';
    inputEdit.value = task.text;
    saveButton.style.display = 'inline-block';
    editButton.style.display = 'none';
  } else {
    inputEdit.style.display = 'none';
  }

  const saveTask = (e) => {
    if ((e.type !== 'click' && e.keyCode !== 13) || !inputEdit.value) return;

    store.tasks = store.tasks.map((t) => ({
      ...t,
      text: t.id === task.id ? inputEdit.value : t.text,
      edit: false,
    }));
  };

  inputEdit.addEventListener('keydown', saveTask);
  saveButton.addEventListener('click', saveTask);

  editButton.addEventListener('click', () => {
    store.tasks = store.tasks.map((t) => ({
      ...t,
      edit: t.id === task.id,
    }));
  });

  divEditAndSave.append(editButton);
  divEditAndSave.append(inputEdit);
  divEditAndSave.append(saveButton);
  return divEditAndSave;
};

const addTaskListener = (e) => {
  if (e.type !== 'click' && e.keyCode !== 13) return;

  const newTask = createTask(inputTask.value);
  inputTask.value = '';
  if (newTask.text === '') {
    return;
  }

  store.tasks = [...store.tasks, newTask];
};

deleteAllTasks.addEventListener('click', () => {
  store.tasks = [];
});

addTask.addEventListener('click', addTaskListener);
inputTask.addEventListener('keydown', addTaskListener);

const createTaskTemplate = (task) => {
  const li = document.createElement('li');
  const deleteButton = createTaskDeleteButton(task);
  const completeButton = createTaskCompleteButton(task);
  const taskEditor = createTaskEditor(task);

  li.className = 'text';

  if (task.completed) {
    li.classList.add('text--strikethrough');
  }

  if (task.edit) {
    li.textContent = '';
  } else {
    li.textContent = task.text;
  }

  li.append(completeButton);
  li.append(deleteButton);
  li.append(taskEditor);

  if (copmletedTaskRadioBtn.hasAttribute('checked')) {
    completeButton.remove();
  }
  return li;
};

sortBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    store.currentFilterSlug = btn.value;
  });
});

const renderList = () => {
  ul.innerHTML = '';

  store.filteredTasks.forEach((task) => {
    const taskTemplate = createTaskTemplate(task);
    ul.append(taskTemplate);
  });
};

if (!localStorage.tasks) {
  store.tasks = [];
} else {
  store.tasks = JSON.parse(localStorage.getItem('tasks'));
}
