// wwwroot/js/GetTaskApi.js
let allTasks = [];
let currentPage = 1;
const rowsPerPage = 5;
let filteredTasks = [];

$(document).ready(function () {
    loadTasks();
});

// Call to Load Task Details
function loadTasks() {
    $.ajax({
        url: 'https://localhost:7020/api/Task/GetTasks',
        type: 'GET',
        success: function (tasks) {
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
        } else {
            statusClass = "badge badge-sm bg-gradient-secondary";
        }

        const rowNumber = ((currentPage - 1) * rowsPerPage) + index + 1;

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
                        <button type="button" class="btn bg-gradient-primary btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Task" onclick="openEditModal(${task.id})">
                         <i class="bi bi-pencil-square"></i>
                        </button>
                       <button type="button" class="btn bg-gradient-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Task" onclick="deleteTask(${task.id})">
                           <i class="bi bi-trash3"></i>
                       </button>
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
function openEditModal(taskId) {
    $.ajax({
        url: `https://localhost:7020/api/Task/GetTasks/${taskId}`,
        type: 'GET',
        success: function (task) {
            $('#editTaskId').val(task.id);
            $('#editTitle').val(task.title);
            $('#editDescription').val(task.description);
            $('#editStatus').val(task.status);

            $('#editDueDate').val(task.formattedDueDate);

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
