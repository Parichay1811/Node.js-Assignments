const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filepath = path.join(__dirname, 'task.txt');

// Create Readline Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display menu options
function showMenu() {
    console.log('\nTo-Do List App');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Delete a task');
    console.log('5. Exit');

    rl.question('\nChoose an option (1-5): ', (choice) => {
        switch (choice) {
            case '1':
                rl.question('Enter the task: ', (task) => {
                    saveTask(task);
                });
                break;
            case '2':
                viewTasks();
                break;
            case '3':
                rl.question('Enter the task to mark as complete: ', (task) => {
                    markAsComplete(task);
                });
                break;
            case '4':
                rl.question('Enter the task to delete: ', (task) => {
                    deleteTask(task);
                });
                break;
            case '5':
                console.log('Exiting...');
                rl.close();
                return;
            default:
                console.log('Invalid choice! Try again.');
                showMenu();
        }
    });
}

//1. Function to add a new task
function saveTask(task) {
    fs.appendFile(filepath, task + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Task added successfully!');
        showMenu();
    });
}

//2. Function to view all tasks
function viewTasks() {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        if (!data.trim()) {
            console.log('No tasks available.');
        } else {
            console.log('\nTasks:');
            data.split('\n').filter(Boolean).forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        showMenu();
    });
}

//3. Function to mark a task as complete
function markAsComplete(task) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let tasks = data.split('\n').filter(Boolean);
        let index = tasks.indexOf(task);
        if (index > -1) {
            tasks[index] = `[Completed] ${tasks[index]}`;
            fs.writeFile(filepath, tasks.join('\n'), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log('Task marked as complete!');
                showMenu();
            });
        } else {
            console.log('Task not found!');
            showMenu();
        }
    });
}

//4. Function to delete a task
function deleteTask(task) {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let tasks = data.split('\n').filter(Boolean);
        let index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
            fs.writeFile(filepath, tasks.join('\n'), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log('Task deleted!');
                showMenu();
            });
        } else {
            console.log('Task not found!');
            showMenu();
        }
    });
}

// Start the menu
showMenu();
