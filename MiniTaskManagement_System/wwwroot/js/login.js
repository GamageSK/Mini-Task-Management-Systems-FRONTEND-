
// wwwroot/js/loging.js

$("#loginForm").submit(function (e) {
    e.preventDefault();

    const mobileNumber = $("#mobileNumber").val();
    const password = $("#password").val();

    $.ajax({
        url: "https://localhost:7020/api/Login/Login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            mobileNumber: mobileNumber,
            password: password
        }),
        success: function (res) {
            if (res.success) {
                localStorage.setItem("user", JSON.stringify(res.user));
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1200
                }).then(() => {
                    window.location.href = "/Index";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: res.message
                });
            }
        },
        error: function () {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to connect to server!"
            });
        }
    });
});

