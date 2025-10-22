// wwwroot/js/EditTaskApi.js


$(document).ready(function () {

    const today = new Date().toISOString().split('T')[0];
    $('#editDueDate').attr('min', today); 

    $('#updateTaskBtn').on('click', function () {
        updateTask();
    });
});

function updateTask() {
    const taskId = $('#editTaskId').val();

 

    const taskData = {
        title: $('#editTitle').val(),
        description: $('#editDescription').val(),
        status: $('#editStatus').val(),
        dueDate: $('#editDueDate').val() + 'T00:00:00.000Z'
    };
    

    // SweetAlert2
    if (!taskData.title || !taskData.description || !taskData.dueDate) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill in all required fields before updating.',
            confirmButtonColor: '#f39c12'
        });
        return;
    }

    // Confirmation before updating
    Swal.fire({
        title: 'Update Task?',
        text: 'Are you sure you want to save these changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `https://localhost:7020/api/Task/UpdateTask/${taskId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(taskData),
                success: function () {
                    $('#editTaskModal').modal('hide');
                    Swal.fire({
                        icon: 'success',
                        title: 'Task Updated',
                        text: 'The task has been successfully updated!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    loadTasks();
                    if (typeof refreshSearch === 'function') refreshSearch();
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: 'Error updating task: ' + error,
                        confirmButtonColor: '#d33'
                    });
                }
            });
        }
    });
}