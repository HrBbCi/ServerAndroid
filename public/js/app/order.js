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
                        url: base_url + "orderv2",
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $
                                .each(
                                    result,
                                    function (index, item) {
                                        var resultPrice = getPrice(item.Product);
                                        var price = resultPrice[0].detail[0].origin_price;
                                        html += "<tr>";
                                        html += "<td>" +
                                            (index + 1) +
                                            "</td>";
                                        html += "<td> " + item.customerId + "</td>";
                                        html += "<td> " + item.region + "</td>";
                                        html += "<td> " + item.status + "</td>";
                                        html += "<td> " + item.payment + "</td>";
                                        html += "<td> " + item.DateOrder + "</td>";
                                        html += "<td> " + item.Product + "</td>";
                                        html += "<td> " + item.Number + "</td>";
                                        html += "<td> " + (price * item.Number) + "</td>";
                                        if (item.statusId === 1 || item.statusId === '1') {
                                            html += "<td>" +
                                                '<button id = "btnConfirm_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk" >' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Confirm</button>';

                                            html += "</td>";
                                        } else if (item.statusId === 5 || item.statusId === '5') {
                                            html += "<td>" +
                                                '<button style="width: 86px; max-width:86px" id = "btnConfirm_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk" disabled>' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Done</button>';

                                            html += "</td>";
                                        } else {
                                            html += "<td>" +
                                                '<button id = "btnConfirmS_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk">' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Confirm</button>';

                                            html += "</td>";
                                        }


                                        html += '<td>' +
                                            '<button id = "btnDelete_' + item.id + "_" + item.Product + "_" + price +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';

                                        html += "<script>";
                                        $(document).ready(function () {
                                            $('#btnConfirm_' + item.id + "_" + item.Product + "_" + price).click(function (event) {
                                                event.preventDefault();

                                                var xy = confirm("Are you sure that you want to confirm order?");
                                                if (xy) {
                                                    updateProcess(item.id, item.Product);
                                                } else {
                                                    return false;
                                                }
                                            });
                                            $('#btnConfirmS_' + item.id + "_" + item.Product + "_" + price).click(function (event) {
                                                event.preventDefault();

                                                var xy = confirm("Are you sure that you want to confirm shipping order?");
                                                if (xy) {
                                                    var d = new Date();
                                                    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
                                                        " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
                                                    updateFinish(item.id, item.Product, datestring);
                                                    createBill(item.id, price, datestring);
                                                } else {
                                                    return false;
                                                }
                                            });
                                            $('#btnDelete_' + item.id + "_" + item.Product + "_" + price).click(function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.id, item.Product);
                                                } else {
                                                    return false;
                                                }

                                            });

                                            function createBill(OrderId, Total, DatePayments) {
                                                var bill = {
                                                    'ShopkeeperEmplId': $('#emplIDOrder').val(),
                                                    'OrderId': OrderId,
                                                    'Total': Total,
                                                    'DatePayments': DatePayments
                                                }
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json",
                                                    url: base_url + "bill",
                                                    data: JSON.stringify(bill),
                                                    dataType: "json",
                                                    success: function (result) {},
                                                    error: function (event) {
                                                        console.log("Save Fail" + event);
                                                    }
                                                });
                                            }

                                            function updateProcess(id, ProductId) {
                                                var orderv2 = {
                                                    'StatusId': 2,
                                                    'id': id,
                                                    'ProductId': ProductId,
                                                    'DatePayment': ''
                                                }

                                                $
                                                    .ajax({
                                                        type: "PUT",
                                                        contentType: "application/json",
                                                        url: base_url + "order/update",
                                                        data: JSON.stringify(orderv2),
                                                        dataType: "json",
                                                        success: function (result) {
                                                            alert("Success");
                                                            window.location.href = "./order";
                                                        },
                                                        error: function (event) {
                                                            alert("Fail");
                                                            console.log("Fail", event);
                                                        }
                                                    });
                                            }

                                            function updateFinish(id, ProductId, datestring) {

                                                var orderv2 = {
                                                    'StatusId': 5,
                                                    'id': id,
                                                    'ProductId': ProductId,
                                                    'DatePayment': datestring
                                                }

                                                $
                                                    .ajax({
                                                        type: "PUT",
                                                        contentType: "application/json",
                                                        url: base_url + "order/update",
                                                        data: JSON.stringify(orderv2),
                                                        dataType: "json",
                                                        success: function (result) {
                                                            alert("Success");
                                                            window.location.href = "./order";
                                                        },
                                                        error: function (event) {
                                                            alert("Fail");
                                                            console.log("Fail", event);
                                                        }
                                                    });
                                            }



                                            function remove(id, ProductId) {
                                                var orderv2 = {
                                                    id: id,
                                                    ProductId: ProductId
                                                };

                                                $.ajax({
                                                    type: "PUT",
                                                    contentType: "application/json",
                                                    url: base_url + "order/delete",
                                                    data: JSON.stringify(orderv2),
                                                    dataType: "json",
                                                    success: function (result) {
                                                        alert("Success");
                                                        window.location.href = "./order";
                                                    },
                                                    error: function (event) {
                                                        alert("Fail");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }

                                        });
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

            $('#ddlRelationship').change(function () {
                var idK = $('#ddlRelationship').val();
                var urlSearch = "";
                if(idK === "All"){
                    urlSearch="";
                    urlSearch = base_url + "orderv2";
                }
                else if (idK === "Chờ xử lý") {
                    urlSearch="";
                    var num = 1;
                    urlSearch = base_url + "orderf/" + num;
                } else if (idK === "Đang giao hàng") {
                    num = 2;
                    urlSearch = "";
                    urlSearch = base_url + "orderf/" + num;
                } else if (idK === "Đơn hàng đổi trả") {
                    num = 3;
                    urlSearch = "";
                    urlSearch = base_url + "orderf/" + num;
                } else if (idK === "Đơn hàng hủy bỏ") {
                    num = 4;
                    urlSearch = "";
                    urlSearch = base_url + "orderf/" + num;
                } else if (idK === "Đã hoàn thành") {
                    num = 5;
                    urlSearch = "";
                    urlSearch = base_url + "orderf/" + num;
                } else if (idK === "Chờ thanh toán") {
                    num = 6;
                    urlSearch = "";
                    urlSearch = base_url + "orderf/" + num;
                }
                $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: urlSearch,
                        dataType: "json",
                        success: function (result) {
                            var html = "";
                            $
                                .each(
                                    result,
                                    function (index, item) {
                                        var resultPrice = getPrice(item.Product);
                                        var price = resultPrice[0].detail[0].origin_price;
                                        html += "<tr>";
                                        html += "<td>" +
                                            (index + 1) +
                                            "</td>";
                                        html += "<td> " + item.customerId + "</td>";
                                        html += "<td> " + item.region + "</td>";
                                        html += "<td> " + item.status + "</td>";
                                        html += "<td> " + item.payment + "</td>";
                                        html += "<td> " + item.DateOrder + "</td>";
                                        html += "<td> " + item.Product + "</td>";
                                        html += "<td> " + item.Number + "</td>";
                                        html += "<td> " + (price * item.Number) + "</td>";
                                        if (item.statusId === 1 || item.statusId === '1') {
                                            html += "<td>" +
                                                '<button id = "btnConfirm_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk" >' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Confirm</button>';

                                            html += "</td>";
                                        } else if (item.statusId === 5 || item.statusId === '5') {
                                            html += "<td>" +
                                                '<button style="width: 86px; max-width:86px" id = "btnConfirm_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk" disabled>' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Done</button>';

                                            html += "</td>";
                                        } else {
                                            html += "<td>" +
                                                '<button id = "btnConfirmS_' + item.id + "_" + item.Product + "_" + price + '" class = "btn btn-info btn-success btk">' +
                                                '<i class = "glyphicon glyphicon-new-window"></i>Confirm</button>';
                                            html += "</td>";
                                        }


                                        html += '<td>' +
                                            '<button id = "btnDelete_' + item.id + "_" + item.Product + "_" + price +
                                            '" class = "btn btn-danger"><i class = "glyphicon glyphicon-trash"></i>Delete</button>';

                                        html += "<script>";
                                        $(document).ready(function () {
                                            $('body').on('click', '#btnConfirm_' + item.id + "_" + item.Product + "_" + price, function (event) {
                                                event.preventDefault();

                                                var xy = confirm("Are you sure that you want to confirm order?");
                                                if (xy) {
                                                    updateProcess(item.id, item.Product);
                                                } else {
                                                    return false;
                                                }
                                            });
                                            $('body').on('click', '#btnConfirmS_' + item.id + "_" + item.Product + "_" + price, function (event) {
                                                event.preventDefault();
                                                var xy = confirm("Are you sure that you want to confirm shipping order?");
                                                if (xy) {
                                                    var d = new Date();
                                                    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) +
                                                        " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
                                                    updateFinish(item.id, item.Product, datestring);
                                                    createBill(item.id, price, datestring);
                                                } else {
                                                    return false;
                                                }
                                            });
                                            $('body').on('click', '#btnDelete_' + item.id + "_" + item.Product + "_" + price, function (event) {
                                                event.preventDefault();
                                                var x = confirm("Are you sure that you want to delete?");
                                                if (x) {
                                                    remove(item.id, item.Product);
                                                } else {
                                                    return false;
                                                }

                                            });

                                            function createBill(OrderId, Total, DatePayments) {
                                                var bill = {
                                                    'ShopkeeperEmplId': $('#emplIDOrder').val(),
                                                    'OrderId': OrderId,
                                                    'Total': Total,
                                                    'DatePayments': DatePayments
                                                }
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json",
                                                    url: base_url + "bill",
                                                    data: JSON.stringify(bill),
                                                    dataType: "json",
                                                    success: function (result) {},
                                                    error: function (event) {
                                                        console.log("Save Fail" + event);
                                                    }
                                                });
                                            }

                                            function updateProcess(id, ProductId) {
                                                var orderv2 = {
                                                    'StatusId': 2,
                                                    'id': id,
                                                    'ProductId': ProductId,
                                                    'DatePayment': ''
                                                }

                                                $
                                                    .ajax({
                                                        type: "PUT",
                                                        contentType: "application/json",
                                                        url: base_url + "order/update",
                                                        data: JSON.stringify(orderv2),
                                                        dataType: "json",
                                                        success: function (result) {
                                                            alert("Success");
                                                            window.location.href = "./order";
                                                        },
                                                        error: function (event) {
                                                            alert("Fail");
                                                            console.log("Fail", event);
                                                        }
                                                    });
                                            }

                                            function updateFinish(id, ProductId, datestring) {

                                                var orderv2 = {
                                                    'StatusId': 5,
                                                    'id': id,
                                                    'ProductId': ProductId,
                                                    'DatePayment': datestring
                                                }

                                                $
                                                    .ajax({
                                                        type: "PUT",
                                                        contentType: "application/json",
                                                        url: base_url + "order/update",
                                                        data: JSON.stringify(orderv2),
                                                        dataType: "json",
                                                        success: function (result) {
                                                            alert("Success");
                                                            window.location.href = "./order";
                                                        },
                                                        error: function (event) {
                                                            alert("Fail");
                                                            console.log("Fail", event);
                                                        }
                                                    });
                                            }

                                            function remove(id, ProductId) {
                                                var orderv2 = {
                                                    id: id,
                                                    ProductId: ProductId
                                                };

                                                $.ajax({
                                                    type: "PUT",
                                                    contentType: "application/json",
                                                    url: base_url + "order/delete",
                                                    data: JSON.stringify(orderv2),
                                                    dataType: "json",
                                                    success: function (result) {
                                                        alert("Success");
                                                        window.location.href = "./order";
                                                    },
                                                    error: function (event) {
                                                        alert("Fail");
                                                        console.log("Error : ", event);
                                                    }
                                                });
                                            }

                                        });
                                        html += "</script>";
                                        html += '</td>'
                                        html += "</tr>";
                                        index++;
                                    })
                            $("#tbodyContent").html(html);
                            var table = $('#example1').html();
                            $('#example1_wrapper').before('<table id="example1"  class="table table-striped" cellspacing="0" width="100%">' + table + '</table>');
                            $('#example1_wrapper').remove();
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
            });


            //Get Price
            function getPrice(id) {
                var jqXHR = $
                    .ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: base_url + "product/getPById/" + id,
                        dataType: "json",
                        async: false,
                        success: function (resultPrice) {},
                        error: function (event) {
                            alert("Error Get");
                        }
                    });
                // console.log(jqXHR)
                return jqXHR.responseJSON;
            }

            read2();

            function read2() {
                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    url: base_url + "read",
                    dataType: "json",
                    success: function (result) {
                        var res = result.data.split(";");
                        $("#emplIDOrder").val(res[0]);

                    },
                    error: function (event) {
                        console.log("Error read" + event);
                    }
                });
            }
        });