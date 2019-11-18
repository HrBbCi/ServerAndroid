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
                                        console.log(item);
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
                                        html += '<button type="button" id = "btnEdit_' + item.Email + '" class="btn btn-info btn-success">' +
                                            '<i class = "glyphicon glyphicon-edit"></i>Edit</button>';
                                        html += '</td>'
                                        html += '<td>' +
                                            '<button id = "btnDelete' + item.Email +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';
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
                window.location.href = "./product/save";
            });
        });