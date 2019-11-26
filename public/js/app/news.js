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
                        url: base_url + "news2",
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
                                    
                                        html += "<td> " + item.emplID + "</td>";
                                        
                                        html += "<td> " + item.title + "</td>";
                                        html += "<td> " + item.link + "</td>";
                                        html += "<td> " + item.description + "</td>";
                                        html += "<td> " + item.dateRelease + "</td>";
                                        html += "<td> " + item.image + "</td>";
                                        html += "<td>";
                                        html += '<button type="button" id = "btnEdit_' + item.id + '" class="btn btn-info btn-success">' +
                                            '<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
                                        html += '</td>'
                                        html += '<td>' +
                                            '<button id = "btnDelete_' + item.id +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
                                        html += "<script>";
                                        $(document).ready(function () {
                                            $('body').on('click','#btnEdit_' + item.id, function (event) {
                                                event.preventDefault();
                                                window.location.href = "./news/edit/"+item.id;
                                            });
											$('body').on('click','#btnDelete_' + item.id, function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.id);
                                                } else {
                                                    return false;
                                                }
                                            });

                                            function remove(id) {
												var orderv2 = {
                                                    id:id
                                                };
                                                $.ajax({
                                                    type: "DELETE",
													contentType: "application/json",
                                                    url: base_url+"news" ,
													data: JSON.stringify(orderv2),
													dataType: "json",
                                                    success: function (result) {
                                                        alert("Success");
                                                        window.location.href = "./news";
                                                    },
                                                    error: function (event) {
                                                        alert("Fail");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }
                                        })
                                        html += "</script>";
                                       
                                       
                                        html += '</td>'
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
                window.location.href = "./news/save";
            });
        });