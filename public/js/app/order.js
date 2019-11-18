$(document)
    .ready(
        function () {
            const base_url = "http://localhost:3000/api/";
            loadTable();
            loadOption();

            function loadTable() {
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url + "order",
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

                                        html += "<td> " + item.customerId + "</td>";

                                        html += "<td> " + item.shipping.region + "</td>";
                                        html += "<td> " + item.status.name + "</td>";
                                        if (item.paymentMethodId === 1 || item.paymentMethodId === "1") {
                                            html += "<td>Thanh toán trực tiếp</td>";
                                        } else {
                                            html += "<td>Thanh toán Paypal</td>";
                                        }
                                        html += "<td> " + item.number + "</td>";
                                        html += "<td> " + item.dateOrder + "</td>";
                                        html += "<td> " + item.product[0].product_id + "</td>";
                                        html += "<td>" +
                                            '<button id = "' + item.customerId +
                                            '" class = "btn btn-info btn-success btk" data-toggle="modal" data-target="#myModal_' + item.customerId + '" >' +
                                            '<i class = "glyphicon glyphicon-new-window"></i>Detail' +
                                            '</button>';
                                        html += ' <div class="modal fade" id="myModal_' + item.customerId + '" role="dialog">';
                                        html += ' <div class="modal-dialog">';
                                        html += ' <div class= "modal-content">';
                                        html += ' <div class="modal-header"> ';
                                        html += ' <button type="button" class="close" data-dismiss="modal">&times;</button>';
                                        html += ' <h4 class="modal-title">Confirm Order</h4>';
                                        html += ' </div>';

                                        html += '<div class="modal-body">';
                                        html += '<table class="table table-striped" cellspacing="0" width="100%">';
                                        html += '<tr>';
                                        html += '<td><label>ID: </label></td>';
                                        html += '<td>';
                                        html += '<input type="text" id="idForm" readonly value ="' + item.customerId + '" class="form-control" />';
                                        html += '</td>';
                                        html += '</tr>';

                                        html += '</table>'
                                        html += '</div>';
                                        html += '<div class="modal-footer">';
                                        html += '<button type="button" id = "btnEdit' + item.customerId + '" class="btn btn-default"  data-dismiss="modal"><a href ="admin/update/' + item.Id + '">Edit</a></button>';
                                        html += '<button type="button" id = "btnClose' + item.customerId + '" class="btn btn-default"  data-dismiss="modal">Close</button>';
                                        html += '</div>';
                                        html += '</div>';
                                        html += '</div>';
                                        html += '</div>';
                                        html += '<script>';
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
                                                        url: base_url + "/category/" +
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



                                        html += '<td>' +
                                            '<button id = "btnDelete' + item.customerId +
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
                // event.preventDefault();
                // window.location.href = "./product/save";
            });

            function loadOption() {
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url + "status",
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $("#ddlRelationship").append('<option value="All" selected="true">All</option>');
                            $.each(result, function (index, item) {
                                $('<option>', {
                                    value: item.Status,
                                }).html(item.Status).appendTo("#ddlRelationship");
                            })
                        },
                        error: function (event) {
                            alert("Error Get Status");
                        }

                    });
            }
        });