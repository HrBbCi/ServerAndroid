$(document)
    .ready(
        function () {
            //Load 
            const base_url = "http://localhost:3000/api/";
            const base_url_image = "http://localhost:3000/static/images/";
            read();

            function read() {
                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: base_url + "read",
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        var res = result.data.split(";");
                        $("#avatar_1").attr("src", base_url_image + res[3]);
                        $("#avatar_2").attr("src", base_url_image + res[3]);
                        $("#avatar_3").attr("src", base_url_image + res[3]);
                        $("#name_admin").text(res[4]);
                        $("#name_admin_2").text(res[4]);
                        $("#name_admin_3").text(res[4]);

                        if (res[2] === "admin") {
                            admin(res[0], res[1]);
                        } else {
                            user(res[0], res[1]);
                        }
                        $("#emplid").val(res[0]);

                    },
                    error: function (event) {
                        console.log("Error read" + event);
                    }
                });
            }

            function admin(id, email) {
                $("#category_sidebar").show();
                $("#home_category").show();
                $("#employee_sidebar").show();
                $("#home_employee").show();
                $("#statistical").show();
                $("#home_statistical").show();
            }

            function user(id, email) {
                $("#category_sidebar").hide();
                $("#home_category").hide();
                $("#employee_sidebar").hide();
                $("#home_employee").hide();
                $("#statistical").hide();
                $("#home_statistical").hide();
            }

            $('#btnSubmit').click(function (event) {
                event.preventDefault();

                if (validate()) {
                    var file = $('#form-upload')[0];
                    var data = new FormData(file);
                    var fileList = document.getElementById("upload").files;

                    //Save Image to Server
                    $.ajax({
                        type: "POST",
                        enctype: 'multipart/form-data',
                        url: "http://localhost:3000/multiple-upload",
                        data: data,
                        processData: false,
                        contentType: false,
                        cache: false,
                        timeout: 1000000,
                        success: function (result) {
                            console.log("Save done");
                        },
                        error: function (event) {
                            alert("Save Fail");
                        }
                    });
                    var image_news = fileList.item(0).name;

                    //Get Date now
                    var d = new Date();
                    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
                        " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
                    var news = {
                        emplID: $("#emplid").val(),
                        title: $("#Tittle").val(),
                        description: $('#description').val(),
                        dateRelease: datestring,
                        image: image_news,
                        link: $('#Link').val()
                    };
                    console.log(news);
                    addNews(news);

                } else {
                    alert("Fail Save News");
                }
            });

            function validate() {
                var file = $('#form-upload')[0];
                var data = new FormData(file);
                var fileList = document.getElementById("upload").files;

                var description = $('#description').val();
                var Link = $('#Link').val();
                var Tittle = $('#Tittle').val();
                if (description === null || description.length === 0 || description === "null") {
                    alert("Incorrect description");
                    return false;
                }
                if (Link === null || Link.length === 0 || Link === "null") {
                    alert("Incorrect Link");
                    return false;
                }
                if (Tittle === null || Tittle.length === 0 || Tittle === "null") {
                    alert("Incorrect Tittle");
                    return false;
                }
                if (fileList.length === 0) {
                    alert("Incorrect Image");
                    return false;
                }
                return true;
            }

            function addNews(news) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: base_url + "news",
                    data: JSON.stringify(news),
                    dataType: "json",
                    success: function (result) {
                        alert("Add Success")
                        var xy = confirm("Are you sure that you want to add news?");
                        if (xy) {
                            return false;
                        } else {
                            window.location.href = "../news";
                        }
                    },
                    error: function (event) {
                        console.log("Save Fail" + event);
                    }
                });
            }
        });