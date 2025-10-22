// wwwroot/js/GetTaskApi.js
let allTasks = [];
let currentPage = 1;
const rowsPerPage = 5;
let filteredTasks = [];

$(document).ready(function () {
    loadTasks();
});

// Call to Load Task Details
// Call to Load Task Details
function loadTasks() {
    $.ajax({
        url: 'https://localhost:7020/api/Task/GetTasks',
        type: 'GET',
        success: function (tasks) {
            // Check Over Dude Task
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            tasks.forEach(task => {
                const dueDate = new Date(task.dueDate);
                dueDate.setHours(0, 0, 0, 0);

                if (task.status !== "Done" && dueDate < today) {
                    task.status = "Overdue";
                }
            });

            allTasks = tasks;
            filteredTasks = tasks;

            if (typeof updateTaskList === 'function') {
                updateTaskList(tasks);
            }

            if (typeof updateDashboard === 'function') {
                updateDashboard(tasks);
            }

            showPage(1);
        },
        error: function (xhr, status, error) {
            console.error('Error loading tasks:', error);
            alert('Failed to load tasks');
            const tbody = $('table tbody');
            tbody.html('<tr><td colspan="6" class="text-center text-danger py-4">Error loading tasks</td></tr>');
        }
    });
}


function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const pageTasks = filteredTasks.slice(startIndex, endIndex);

    populateTaskTable(pageTasks);
    updatePagination();
}
// Load Task Details
function populateTaskTable(tasks) {
    const tbody = $('table tbody');
    tbody.empty();

    if (tasks.length === 0) {
        tbody.html('<tr><td colspan="6" style="text-align:center; color:#6c757d;">No tasks found</td></tr>');
        return;
    }

    tasks.forEach((task, index) => {
        let statusClass = "";
        if (task.status === "Done") {
            statusClass = "badge badge-sm bg-gradient-success";
        } else if (task.status === "In Progress") {
            statusClass = "badge badge-sm bg-gradient-warning";
        } else if (task.status === "To Do") {
            statusClass = "badge badge-sm bg-gradient-secondary";
        } else if (task.status === "Overdue") {
            statusClass = "badge badge-sm bg-gradient-danger";
        }

        const rowNumber = ((currentPage - 1) * rowsPerPage) + index + 1;


        let editButton = "";
        let deleteButton = "";

        if (task.status === "To Do") {
            editButton = `<button class="btn bg-gradient-primary btn-sm" title="Edit" onclick="openEditModal(${task.id})"><i class="bi bi-pencil-square"></i></button>`;
            deleteButton = `<button class="btn bg-gradient-danger btn-sm" title="Delete" onclick="deleteTask(${task.id})"><i class="bi bi-trash3"></i></button>`;
        }
        else if (task.status === "In Progress") {
            editButton = `<button class="btn bg-gradient-primary btn-sm" title="Edit" onclick="openEditModal(${task.id})"><i class="bi bi-pencil-square"></i></button>`;
            deleteButton = `<button class="btn bg-gradient-secondary btn-sm disabled-btn" data-message="Cannot delete task in progress"><i class="bi bi-trash3"></i></button>`;
        }
        else if (task.status === "Done") {
            editButton = `<button class="btn bg-gradient-secondary btn-sm disabled-btn" data-message="Cannot edit completed task"><i class="bi bi-pencil-square"></i></button>`;
            deleteButton = `<button class="btn bg-gradient-secondary btn-sm disabled-btn" data-message="Cannot delete completed task"><i class="bi bi-trash3"></i></button>`;
        }

        const row = `
                     <tr>
                      <td>
                        <div class="d-flex px-3 py-1">
                          <div class="d-flex flex-column justify-content-center">
                             <h6 class="text-xs text-secondary mb-0">${rowNumber}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex px-3 py-1">
                          <div class="d-flex flex-column justify-content-center">
                             <h6 class="mb-0 text-xs">Task ID : ${task.id}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${task.title}</p>
                        <p class="text-xs text-secondary mb-0">${task.description}</p>
                      </td>
                      <td class="align-middle text-center text-sm">
                       <span class="${statusClass}">${task.status}</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-sm font-weight-bold">${task.dueDate.split('T')[0]}</span>
                      </td>
                      <td class="align-middle text-center">
                         ${editButton}
                    ${deleteButton}
                      </td>
                    </tr>`;
        tbody.append(row);
    });
}
// Pagination Process
function updatePagination() {
    const totalPages = Math.ceil(filteredTasks.length / rowsPerPage);
    const paginationContainer = $('#paginationContainer');
    paginationContainer.empty();

    if (totalPages <= 1) return;

    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<li class="page-item active"><a class="page-link" href="javascript:;">${i}</a></li>`;
        } else {
            paginationHTML += `<li class="page-item"><a class="page-link" href="javascript:;" onclick="showPage(${i})">${i}</a></li>`;
        }
    }

    paginationContainer.html(paginationHTML);
}

// Open edit modal with task data
//function openEditModal(taskId) {
//    $.ajax({
//        url: `https://localhost:7020/api/Task/GetTasks/${taskId}`,
//        type: 'GET',
//        success: function (task) {
//            $('#editTaskId').val(task.id);
//            $('#editTitle').val(task.title);
//            $('#editDescription').val(task.description);
//            $('#editStatus').val(task.status);

//            $('#editDueDate').val(task.formattedDueDate);

//            $('#editTaskModal').modal('show');
//        },
//        error: function (xhr, status, error) {
//            alert('Error loading task data: ' + error);
//        }
//    });
//}

function openEditModal(taskId) {
    $.ajax({
        url: `https://localhost:7020/api/Task/GetTasks/${taskId}`,
        type: 'GET',
        success: function (task) {
            $('#editTaskId').val(task.id);
            $('#editTitle').val(task.title);
            $('#editDescription').val(task.description);
            $('#editDueDate').val(task.formattedDueDate);

            const statusSelect = $('#editStatus');
            statusSelect.empty(); // Clear existing options

            // Set status options dynamically based on current status
            if (task.status === "To Do") {
                statusSelect.append('<option value="To Do" selected>To Do</option>');
                statusSelect.append('<option value="In Progress">In Progress</option>');
                statusSelect.append('<option value="Done">Done</option>');
                statusSelect.append('<option value="Overdue">Overdue</option>');
            }
            else if (task.status === "In Progress") {
                statusSelect.append('<option value="In Progress" selected>In Progress</option>');
                statusSelect.append('<option value="Done">Done</option>');
                statusSelect.append('<option value="Overdue">Overdue</option>');
            }
            else if (task.status === "Done") {
                // “Done” tasks can’t change status
                statusSelect.append('<option value="Done" selected>Done</option>');
                statusSelect.prop('disabled', true);
            }
            else if (task.status === "Overdue") {
                // “Overdue” can only move to “In Progress” or “Done”
                statusSelect.append('<option value="Overdue" selected>Overdue</option>');
                statusSelect.append('<option value="In Progress">In Progress</option>');
                statusSelect.append('<option value="Done">Done</option>');
            }

            // Show modal
            $('#editTaskModal').modal('show');
        },
        error: function (xhr, status, error) {
            alert('Error loading task data: ' + error);
        }
    });
}







// Delete task function
function deleteTask(taskId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This task will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Delete it'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `https://localhost:7020/api/Task/DeleteTask/${taskId}`,
                type: 'DELETE',
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Task deleted successfully.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    loadTasks();
                    if (typeof refreshSearch === 'function') refreshSearch();
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to delete task: ' + error
                    });
                }
            });
        }
    });
}
$(document).on('change', '#statusFilter', function () {
    const selectedStatus = $(this).val();

    if (selectedStatus === 'All') {
        filteredTasks = allTasks;
    } else {
        filteredTasks = allTasks.filter(task => task.status === selectedStatus);
    }

    showPage(1);
});
