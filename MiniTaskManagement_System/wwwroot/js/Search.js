// wwwroot/js/Search.js

$(document).ready(function () {
    setupSearch();
});

// Handle search input
function setupSearch() {

    $('#searchInput').on('input', function () {
        const searchTerm = $(this).val().trim();
        console.log('Search term:', searchTerm);
        filterTasks(searchTerm);
    });
}

function filterTasks(searchTerm) {
    if (!searchTerm) {
        if (typeof populateTaskTable === 'function') {
            populateTaskTable(allTasks);
        }
        return;
    }

    console.log('All tasks:', allTasks);

    // Filter tasks based on search term
    const filteredTasks = allTasks.filter(task => {

        console.log('Checking task:', task);

        const taskTitle = task.title ? task.title.toLowerCase() : '';
        const taskDescription = task.description ? task.description.toLowerCase() : '';
        const taskStatus = task.status ? task.status.toLowerCase() : '';
        const taskDueDate = task.dueDate ? task.dueDate.toLowerCase() : '';
        const taskId = task.id ? task.id.toString() : '';


        const searchTermLower = searchTerm.toLowerCase();

        console.log('Task ID:', taskId, 'Search term:', searchTerm);
        console.log('ID match:', taskId.includes(searchTerm));
        console.log('Title match:', taskTitle.includes(searchTermLower));
        console.log('Description match:', taskDescription.includes(searchTermLower));
        console.log('Status match:', taskStatus.includes(searchTermLower));
        console.log('Due date match:', taskDueDate.includes(searchTermLower));

        // Search in all fields
        const match = (
            taskId.includes(searchTerm) || 
            taskTitle.includes(searchTermLower) || 
            taskDescription.includes(searchTermLower) || 
            taskStatus.includes(searchTermLower) || 
            taskDueDate.includes(searchTermLower) 
        );

        console.log('Overall match:', match);
        return match;
    });

    console.log('Filtered tasks:', filteredTasks);

    if (typeof populateTaskTable === 'function') {
        populateTaskTable(filteredTasks);
    }
}

function updateTaskList(tasks) {
    allTasks = tasks;
    console.log('Tasks updated for search:', allTasks);
}

function refreshSearch() {
    const searchTerm = $('#searchInput').val().trim();
    filterTasks(searchTerm);
}