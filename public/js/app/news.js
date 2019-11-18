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
                                        console.log(item);
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