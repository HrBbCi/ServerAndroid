$(document)
    .ready(
        function () {
            const base_url = "http://localhost:3000/api";
            loadTable();

            function loadTable() {
                var acc = {
                    username: $("#id").val(),
                    password: $("#name").val(),
                };
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url+"/category",
                        data: acc,
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $
                                .each(
                                    result,
                                    function (index, item) {
                                        html += "<tr>";
                                        html += "<td>" +
                                            item.Id +
                                            "</td>";
                                        html += "<td>" +
                                            item.Name +
                                            "</td>";
                                        html += "<td>" +
                                            "<button id = \"" + item.Id +
                                            "\" class = \"btn btn-info btn-success btk\" data-toggle=\"modal\" data-target=\"#myModal" + item.Id + "\" >" +
                                            "<i class = \"glyphicon glyphicon-edit\">" + "</i>Edit" +
                                            "</button>";
                                        html += " <div class=\"modal fade\" id=\"myModal" + item.Id + "\" role=\"dialog\"> ";
                                        html += " <div class=\"modal-dialog\"> ";
                                        html += "<div class= \"modal-content\"> ";
                                        html += " <div class=\"modal-header\"> ";
                                        html += " <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
                                        html += " <h4 class=\"modal-title\">Edit Category</h4>";
                                        html += " </div>";

                                        html += " <div class=\"modal-body\"> ";
                                        html += " <table class=\"table table-striped\" cellspacing=\"0\" width=\"100%\">";
                                        html += "<tr>";
                                        html += "<td><label>ID: </label></td>";
                                        html += "<td>";
                                        html += "<input type=\"text\" id=\"idForm\" readonly value =\"" + item.Id + "\" class=\"form-control\" /> ";
                                        html += "</td> ";
                                        html += "</tr> ";

                                        html += "<tr>";
                                        html += "<td><label>Name: </label></td>";
                                        html += "<td>";
                                        html += "<input type=\"text\" id=\"nameForm\" value =\"" + item.Name + "\" class=\"form-control\" /> ";
                                        html += "</td> ";
                                        html += "</tr> ";

                                        html += "</table>";
                                        html += " </div>";
                                        html += " <div class=\"modal-footer\"> ";
                                        html += " <button type=\"button\" id = \"btnEdit" + item.Id + "\" class=\"btn btn-default\"  data-dismiss=\"modal\"><a href =\"admin/category/update/" + item.Id + "\">Edit</a></button> ";
                                        html += " <button type=\"button\" id = \"btnClose" + item.Id + "\" class=\"btn btn-default\"  data-dismiss=\"modal\">Close</button> ";
                                        html += " </div>";
                                        html += " </div>";
                                        html += " </div>";
                                        html += " </div>";
                                        html += "<script>";
                                        $(document).ready(function () {
                                            $('#btnEdit' + item.Id).click(function (event) {
                                                event.preventDefault();
                                                var x = $("#nameForm").val();
                                                if (x === null || x === "" || x.length <= 0) {
                                                    alert("Please fill name!!");
                                                    return false;
                                                }
                                                update(item.Id);

                                            });

                                            function update(id) {
                                                var category = {
                                                    Id: id,
                                                    Name: $("#nameForm").val(),
                                                }
                                                $
                                                    .ajax({
                                                        type: "PUT",
                                                        contentType: "application/json",
                                                        url: base_url+"/category/" +
                                                            category.Id,
                                                        data: JSON.stringify(category),
                                                        dataType: "json",
                                                        success: function (result) {
                                                            alert("Edit success");
                                                            window.location.href = "./category";
                                                        },
                                                        error: function (event) {
                                                            alert("Edit fail");
                                                            console.log("Fail", event);
                                                        }
                                                    });
                                            }

                                        });
                                        html += "</script>"; +
                                        "</td>";
                                        html += "<td>" +
                                            "<button" +
                                            "\" id = \"btnDelete" +
                                            item.Id +
                                            "\" class = \"btn btn-danger\"><i class = \"glyphicon glyphicon-trash\"></i>Delete</button>";
                                        html += "<script>";
                                        $(document).ready(function () {

                                            $('#btnDelete' + item.Id).click(function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.Id);
                                                } else {
                                                    return false;
                                                }


                                            });

                                            function remove(id) {
                                                $.ajax({
                                                    type: "DELETE",
                                                    url: base_url+"/category/" + id,
                                                    success: function (result) {
                                                        alert("Delete Success");
                                                        window.location.href = "./category";
                                                    },
                                                    error: function (event) {
                                                        alert("Error Delete");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }

                                        });
                                        html += "</script>";
                                        html += "</td>";
                                        html += "</tr>";
                                        index++;
                                    })
                            $("#tbodyContent1").html(html);
                            $('#table_id').DataTable({
                                'paging': true,
                                'lengthChange': true,
                                'searching': true,
                                'ordering': true,
                                'info': true,
                                'autoWidth': true
                            });
                        },
                        error: function (event) {
                            alert("Error Get");
                        }

                    });
            }

        });