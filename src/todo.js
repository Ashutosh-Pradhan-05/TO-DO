$(function () {
    function LoadView(url) {
        $.ajax({
            method: "get",
            url: url,
            success: (response) => {
                $("section").html(response);
            }
        });
    }

    LoadView("../public/home.html");

    $(document).on("click", "#btnCreateAccount", () => {
        LoadView("../public/user-register.html");
    })

    $(document).on("click", "#btnCancel", () => {
        LoadView("../public/home.html");
    })

    $(document).on("click", "#btnSignin", () => {
        LoadView("../public/user-login.html");
    })

    $(document).on("click", "#btnRegister", () => {
        var user = {
            UserId: $("#txtRUserId").val().trim(),
            UserName: $("#txtRUserName").val().trim(),
            Password: $("#txtRPassword").val().trim(),
            Email: $("#txtREmail").val().trim(),
            Mobile: $("#txtRMobile").val().trim()
        };

        for (const [key, value] of Object.entries(user)) {
            if (!value) {
                alert(`${key} is required.`);
                return;
            }
        }

        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(user.Mobile)) {
            alert("Mobile number must be exactly 10 digits.");
            return;
        }
        $.ajax({
            method: "post",
            url: "http://127.0.0.1:4040/register-user",
            data: user,
            success: () => {
                alert("Registered Successfully.");
                LoadView("../public/user-login.html");
            },
            error: (err) => {
                alert("An error occurred during registration.");
                console.error(err);
            }
        });
    });


    $(document).on("keyup", "#txtRUserId", (e) => {

        $.ajax({
            method: "get",
            url: "http://127.0.0.1:4040/users",
            success: (users => {
                for (var user of users) {
                    if (user.UserId === e.target.value) {
                        $("#lblUserIdError").html(`"${user.UserId}" this User Id already taken - Try Another`).css("color", "red");
                        break;
                    } else {
                        $("#lblUserIdError").html(`You can take this User Id.`).css("color", "green");
                    }
                }
            })
        })

    });

    function GetAppointments(userId) {
        $.ajax({
            method: "get",
            url: `http://127.0.0.1:4040/get-appointments/${userId}`,
            success: (appointments) => {
                $("#lblUserId").html($.cookie("username"));
                $("#appointmentsContainer").html("");
                appointments.forEach((appointment) => {
                    $(`
                   <div class="alert alert-success alert-dismissible m-4">
                       <button class="btn btn-close" data-bs-dismiss="alert"></button>
                       <h3>${appointment.Title}</h3>
                       <p>${appointment.Description}</p>
                       <p>${appointment.Date}</p>
                       <button value=${appointment.AppointmentId} id="btnEdit" class="btn btn-warning bi bi-pen-fill"> Edit</button>
                       <button value=${appointment.AppointmentId} id="btnDelete" class="btn btn-danger bi bi-trash-fill"> Delete</button>
                   </div>
                `).appendTo("#appointmentsContainer");
                });
            },
        });
    }

    $(document).on("click", "#btnDelete", function (e) {
        const appointmentId = e.target.value;
        LoadView("../public/delete-appointment.html");

        $.ajax({
            method: "get",
            url: `http://127.0.0.1:4040/get-appointment/${appointmentId}`,
            success: (appointment) => {
                $("#lblTitle").html(appointment.Title);
                $("#lblDescription").html(appointment.Description);
                $("#txtId").val(appointment.AppointmentId);
            },
        });
    });

    $(document).on("click", "#btnConfirmDelete", function () {
        const appointmentId = $("#txtId").val();
        $.ajax({
            method: "delete",
            url: `http://127.0.0.1:4040/delete-appointment/${appointmentId}`,
            success: () => {
                // alert("Appointment deleted successfully!");
                reloadDashboard();
            },
            error: (err) => {
                console.error("Error deleting appointment:", err);
                alert("Failed to delete the appointment.");
            },
        });
    });

    $(document).on("click", "#btnDeleteCancel", function () {
        reloadDashboard();
    });

    function reloadDashboard() {
        LoadView("../public/user-dashboard.html");
        GetAppointments($.cookie("userid"));
    }

    $(document).on("click", "#btnLogin", () => {

        var userid = $("#txtLoginUserId").val();
        var password = $("#txtLoginPassword").val();

        if (!userid) {
            alert("User ID field can't be empty.\nKindly enter your User ID .");
            return;
        }

        if (!password) {
            alert("Password field can't be empty.");
            return;
        }
        $.ajax({
            method: "get",
            url: "http://127.0.0.1:4040/users",
            success: (users => {
                var user = users.find(record => record.UserId === userid);
                if (user) {
                    if (user.Password === password) {
                        $.cookie("userid", userid);
                        $.cookie("username", user.UserName);

                        LoadView("../public/user-dashboard.html");

                        GetAppointments(userid);

                    } else {
                        alert("Invalid Password");
                    }
                }
                else {
                    alert("Invalid User Id");
                }
            })
        })
    });

    $(document).on("click", "#btnSignout", () => {

        $.removeCookie('userid');
        $.removeCookie('username');
        LoadView("../public/user-login.html");
    })

    $(document).on("click", "#btnNewAppointment", () => {
        LoadView("../public/add-appointment.html");
    })

    $(document).on("click", "#btnAdd", () => {
        var appointmentId = $("#txtId").val().trim();
        var title = $("#txtTitle").val().trim();
        var description = $("#txtDescription").val().trim();
        var dateTime = $("#txtDate").val().trim();
    
        if (!appointmentId) {
            alert("Appointment Id is required.");
            return;
        }
        if (!title) {
            alert("Title is required.");
            return;
        }
        if (!dateTime) {
            alert("Date and Time are required.");
            return;
        }
    
        var appointment = {
            AppointmentId: appointmentId,
            Title: title,
            Description: description,
            Date: dateTime,
            Time: dateTime,
            UserId: $.cookie("userid")
        };
    
        $.ajax({
            method: "post",
            url: "http://127.0.0.1:4040/add-appointment",
            data: appointment,
            success: () => {
                alert('Appointment Added Successfully.');
                LoadView("../public/user-dashboard.html");
                GetAppointments($.cookie('userid'));
            },
            error: (err) => {
                console.error("Error adding appointment:", err);
                alert("Failed to add the appointment.");
            }
        });
    });
    
    $(document).on("click", "#btnCancelAppoint", () => {
        LoadView("../public/user-dashboard.html");
        GetAppointments($.cookie('userid'));
    });

    $(document).on("click", "#btnEdit", (e) => {
        const appointmentId = e.target.value;
        LoadView("../public/edit-appointment.html");

        $.ajax({
            method: "get",
            url: `http://127.0.0.1:4040/get-appointment/${appointmentId}`,
            success: (appointment) => {
                $("#txtId").val(appointment.AppointmentId);
                $("#txtTitle").val(appointment.Title);
                $("#txtDescription").val(appointment.Description);

                const dateStr = appointment.Date;
                const date = dateStr.slice(0, dateStr.indexOf("T"));
                const time = dateStr.slice(dateStr.indexOf("T") + 1, dateStr.length - 1);

                $("#txtDate").val(`${date} ${time}`);
            },
            error: (err) => {
                console.error("Error fetching appointment details:", err);
            },
        });
    });

    $(document).on("click", "#btnEditCancel", () => {
        reloadDashboard();
    })

    $(document).on("click", "#btnSave", () => {

        var appointment = {
            AppointmentId: $("#txtId").val(),
            Title: $("#txtTitle").val(),
            Description: $("#txtDescription").val(),
            Date: $("#txtDate").val(),
            Time: $("#txtDate").val(),
            UserId: $.cookie("userid")
        }

        $.ajax({
            method: "put",
            url: `http://127.0.0.1:4040/edit-appointment/${$("#txtId").val()}`,
            data: appointment
        })

        alert('Appointment Modified Successfully..');
        LoadView("../public/user-dashboard.html");
        GetAppointments($.cookie('userid'));
    });
});