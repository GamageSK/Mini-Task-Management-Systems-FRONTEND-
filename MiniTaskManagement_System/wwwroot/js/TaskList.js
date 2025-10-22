//TaskList.js

//Disabled btn arlets
$(document).ready(function () {
    $(document).on('click', '.disabled-btn', function (e) {
        e.preventDefault();

        const message = $(this).data('message') || 'This action is currently disabled.';

        Swal.fire({
            icon: 'warning',
            title: 'Action Disabled',
            text: message,
            confirmButtonColor: '#f39c12',
            timer: 2500
        });
    });
});
