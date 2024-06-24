//we  will be creating a task/todo manager
// we will be storing our taks in json format in a file

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// console.log(__dirname);
const taskFilePath = path.join(__dirname, "task.json");

// ensure the file exists

if (!fs.existsSync(taskFilePath)) {
  console.log("filke does not exist, creating new file");
  fs.writeFileSync(taskFilePath, JSON.stringify([]));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("What is your name ?", (input) => {
//   console.log(`Hello ${input}`);
//   rl.close();
// });
const getMyTask = () => {
  const tasks = fs.readFileSync(taskFilePath, "utf-8");
  //  tasks data in now inn string form
  return JSON.parse(tasks);
};
const listTasks = () => {
  const tasks = getMyTask();
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.description} -[${task.completed ? "X" : " "}]`
    );
  });
};

const saveMyTasks = (tasks) => {
  fs.writeFileSync(taskFilePath, JSON.stringify(tasks));
};

const addTask = (task) => {
  const tasks = getMyTask();
  tasks.push({ description: task, completed: false });
  saveMyTasks(tasks);
  //   console.info("task has been added successfully");
};
const completeTask = (taskNo) => {
  const tasks = getMyTask();
  if (tasks[taskNo - 1]) {
    tasks[taskNo - 1].completed = true;
    saveMyTasks(tasks);
    console.info("task updated successfully");
  } else {
    console.warn("invalid task number");
    return;
  }
};
const deleteTask = (taskNo) => {
  const tasks = getMyTask();
  if (tasks[taskNo - 1]) {
    const filteredTasks = tasks.filter((task, idx) => idx !== taskNo - 1);
    saveMyTasks(filteredTasks);
    console.info("task deleted successfully");
  } else {
    console.warn("invalid task number");
  }
};

function todoManager() {
  rl.question(
    `What do you want to do?
    \n 1. Add a task 
    \n 2. List all tasks
    \n 3. Mark task as complete
    \n 4. Delete task
    \n 5. Quit
    `,
    (answer) => {
      switch (answer) {
        case "1":
          rl.question("Enter your task: ", (task) => {
            addTask(task);
            todoManager();
          });
          break;
        case "2":
          listTasks();
          todoManager();
          break;
        case "3":
          rl.question(
            "Enter the task number you want to complete: ",
            (taskNo) => {
              completeTask(+taskNo);
              todoManager();
            }
          );
          break;
        case "4":
          rl.question(
            "Enter the task number you want to delete: ",
            (taskNo) => {
              deleteTask(+taskNo);
              todoManager();
            }
          );
          break;
        case "5":
          rl.close();
          break;
        default:
          console.log("Invalid option");
          todoManager();
      }
    }
  );
}

todoManager();
