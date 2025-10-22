// wwwroot/js/PostTaskApi.js
$(document).ready(function () {

    const today = new Date().toISOString().split('T')[0];
    $('input[name="DueDate"]').attr('min', today);

    $('#saveTaskBtn').on('click', function () {
        createTask();
    });
});

function createTask() {
    const form = $('#addTaskForm');
    const title = $('input[name="Title"]');
    const description = $('textarea[name="Description"]');
    const status = $('select[name="Status"]');
    const dueDate = $('input[name="DueDate"]');

    // Reset previous validation messages
    form.find('.invalid-feedback').remove();
    form.find('.is-invalid').removeClass('is-invalid');

    let isValid = true;

    // Validate required fields
    if (!title.val().trim()) {
        showFieldError(title, 'Title is required');
        isValid = false;
    }

    if (!description.val().trim()) {
        showFieldError(description, 'Description is required');
        isValid = false;
    }

    if (!status.val().trim()) {
        showFieldError(dueDate, 'Please select Status');
        isValid = false;
    }

    if (!dueDate.val().trim()) {
        showFieldError(dueDate, 'Please select a due date');
        isValid = false;
    }

    if (!isValid) return; 

    const taskData = {
        title: title.val().trim(),
        description: description.val().trim(),
        status: status.val(),
        dueDate: dueDate.val() + 'T00:00:00.000Z'
    };

    $.ajax({
        url: 'https://localhost:7020/api/Task/PostTask',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(taskData),
        success: function () {
            $('#addTaskModal').modal('hide');
            form[0].reset();

            Swal.fire({
                icon: 'success',
                title: 'Task created successfully!',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end'
            });

            loadTasks();
            if (typeof refreshSearch === 'function') {
                refreshSearch();
            }
        },
        error: function (xhr) {
            let errorMsg = 'An error occurred while creating the task.';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMsg = xhr.responseJSON.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: errorMsg,
                confirmButtonColor: '#d33'
            });
        }
    });
}

// show validation errors
function showFieldError(element, message) {
    element.addClass('is-invalid');
    element.after(`<div class="invalid-feedback">${message}</div>`);
}
