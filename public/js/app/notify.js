$(document)
    .ready(
        function () {
            const base_url = "http://localhost:3000/api/";
            loadTable();

            function loadTable() {
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url + "notify",
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $
                                .each(
                                    result,
                                    function (index, item) {
                                        
                                        html += "<tr>";
                                        html += "<td>" +
                                            (index + 1) +
                                            "</td>";
                                        if(item.CustomerId === null || item.CustomerId === "null"){
                                            html += "<td> " + "</td>";
                                        }else{
                                            html += "<td> " + item.CustomerId + "</td>";
                                        }
                                        
                                        html += "<td> " + item.Notify + "</td>";
                                        html += "<td> " + item.TypeO + "</td>";
                                        html += "<td> " + item.Date + "</td>";
                                        html += "<td>";
                                        html += '<button type="button" id = "btnEdit_' + item.key + "_" + item.Id +'" class="btn btn-info btn-success">' +
                                            '<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
                                        html += '</td>'
                                        html += '<td>' +
                                            '<button id = "btnDelete_' + item.key + "_" + item.Id +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
                                        html += '</td>'
										html += "<script>";
                                        $(document).ready(function () {
                                            $('body').on('click','#btnEdit_' + item.key + "_" + item.Id, function (event) {
                                                event.preventDefault();
                                                window.location.href = "./notification/edit/"+item.key;
                                            });
											$('body').on('click','#btnDelete_' + item.key  + "_" + item.Id , function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.key);
                                                } else {
                                                    return false;
                                                }
                                            });

                                            function remove(id) {
												var notify = {
                                                    id:id
                                                };
                                                $.ajax({
                                                    type: "DELETE",
													contentType: "application/json",
                                                    url: base_url+"notify" ,
													data: JSON.stringify(notify),
													dataType: "json",
                                                    success: function (result) {
                                                        alert("Success");
                                                        window.location.href = "./notification";
                                                    },
                                                    error: function (event) {
                                                        alert("Fail");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }
                                        })
                                        html += "</script>";
                                        html += "</tr>";
                                        index++;
                                    })
                            $("#tbodyContent").html(html);
                            $('#example1').DataTable({
                                'paging': true,
                                'lengthChange': true,
                                'searching': true,
                                'ordering': true,
                                'info': true,
                                'autoWidth': true,
                                'destroy': true
                            });

                        },
                        error: function (event) {
                            alert("Error Get");
                        }
                    });
            }

            $('#btnAdd').click(function (event) {
                event.preventDefault();
                window.location.href = "./notification/save";
            });
        });