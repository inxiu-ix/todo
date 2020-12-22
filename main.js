const addTask = document.querySelector('#buttonId');
const inputTask = document.querySelector('#inputId');
const ul = document.querySelector('.ul');
const deleteAllTasks = document.querySelector('#buttonAllDel');
const alltaskRadioBtn = document.querySelector('#all');
const copmletedTaskRadioBtn = document.querySelector('#completed');
const activeTaskRadioBtn = document.querySelector('#active');

inputTask.focus();

let tasks;
let tasksCompleted = [];
let tasksActive = [];

if (!localStorage.tasks) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskId = () => `f${(+new Date()).toString(16)}-${tasks.length}`;

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
    if (copmletedTaskRadioBtn.hasAttribute('checked')) {
      const index = tasksCompleted.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasksCompleted.splice(index, 1);
      }
    } else if (activeTaskRadioBtn.hasAttribute('checked')) {
      const index = tasksActive.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasksActive.splice(index, 1);
      }
    }
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      tasks.splice(index, 1);
    }
    updateLocal();
    renderList();
  });

  return buttonDel;
};

const createTaskCompleteButton = (task) => {
  const buttonComplete = document.createElement('button');

  buttonComplete.textContent = 'Выполнить';

  buttonComplete.addEventListener('click', () => {
    if (activeTaskRadioBtn.hasAttribute('checked')) {
      const index = tasksActive.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        task.completed = true;
        tasksActive.splice(index, 1);
      }
    }
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1 && task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    updateLocal();
    renderList();
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

  inputEdit.addEventListener('keydown', (e) => {
    if (e.type !== 'click' && e.keyCode !== 13) return;
    inputEdit.style.display = 'none';
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1 && inputEdit.value === '') {
      task.innerHTML = task.text;
      task.edit = !task.edit;
    } else {
      task.text = inputEdit.value;
      task.edit = !task.edit;
    }
    updateLocal();
    renderList();
  });

  saveButton.addEventListener('click', () => {
    inputEdit.style.display = 'none';
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1 && inputEdit.value === '') {
      task.innerHTML = task.text;
      task.edit = !task.edit;
    } else {
      task.text = inputEdit.value;
      task.edit = !task.edit;
    }
    updateLocal();
    renderList();
  });

  editButton.addEventListener('click', () => {
    inputEdit.style.display = 'inline-block';
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';

    if (copmletedTaskRadioBtn.hasAttribute('checked')) {
      const index = tasksCompleted.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        task.edit = true;
        inputEdit.value = task.text;
      }
    } else if (activeTaskRadioBtn.hasAttribute('checked')) {
      const index = tasksActive.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        task.edit = true;
        inputEdit.value = task.text;
      }
    }
    const index = tasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      task.edit = true;
      inputEdit.value = task.text;
    }

    renderList();
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

  tasks.push(newTask);
  tasksActive.push(newTask);

  updateLocal();
  renderList();
};

deleteAllTasks.addEventListener('click', () => {
  tasks = [];
  updateLocal();
  renderList();
});

addTask.addEventListener('click', addTaskListener);
inputTask.addEventListener('keydown', addTaskListener);

alltaskRadioBtn.addEventListener('click', () => {
  alltaskRadioBtn.setAttribute('checked', true);
  activeTaskRadioBtn.removeAttribute('checked');
  copmletedTaskRadioBtn.removeAttribute('checked');
  renderList();
});

activeTaskRadioBtn.addEventListener('click', () => {
  const activeTask = tasks.filter(t => t.completed === false);
  tasksActive = activeTask;
  activeTaskRadioBtn.setAttribute('checked', true);
  copmletedTaskRadioBtn.removeAttribute('checked');
  alltaskRadioBtn.removeAttribute('checked');
  renderList();
});

copmletedTaskRadioBtn.addEventListener('click', () => {
  const completedTask = tasks.filter(t => t.completed === true);
  tasksCompleted = completedTask;
  copmletedTaskRadioBtn.setAttribute('checked', true);
  activeTaskRadioBtn.removeAttribute('checked');
  alltaskRadioBtn.removeAttribute('checked');
  console.log('value >>>', copmletedTaskRadioBtn.hasAttribute('checked'));
  renderList();
});

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

const renderList = () => {
  ul.innerHTML = '';

  if (copmletedTaskRadioBtn.hasAttribute('checked')) {
    tasksCompleted.forEach((task) => {
      console.log('alert!!!');
      const taskTemplate = createTaskTemplate(task);
      ul.append(taskTemplate);
    });
  } else if (activeTaskRadioBtn.hasAttribute('checked')) {
    tasksActive.forEach((task) => {
      console.log('alert active');
      const taskTemplate = createTaskTemplate(task);
      ul.append(taskTemplate);
    });
  } else if (tasks.length > 0) {
    tasks.forEach((task) => {
      const taskTemplate = createTaskTemplate(task);
      ul.append(taskTemplate);
    });
  } else {
    tasks.forEach((task) => {
      const taskTemplate = createTaskTemplate(task);
      ul.append(taskTemplate);
    });
  }
};
updateLocal();
renderList();
