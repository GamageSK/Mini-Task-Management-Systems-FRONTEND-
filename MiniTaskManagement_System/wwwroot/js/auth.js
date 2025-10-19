// auth.js
//logout funtion

$(document).ready(function () {

    const user = localStorage.getItem("user");
    const path = window.location.pathname.toLowerCase();

    if (!user && path !== "/login") {
        window.location.href = "/Login";
    }

    $("#logoutBtn").click(function () {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                window.location.href = "/Login";
            }
        });
    });


 /*    Hide Add Task button & LOGOUTon Login page*/
    if (path === "/login") {
        $("#addTaskBtn").hide();
        $("#logoutBtn").hide();
    }
});
