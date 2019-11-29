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
                        url: base_url + "customer",
                        dataType: "json",
                        success: function (result) {
							var customer =  result.customer;
                            var html = "";
                            $
                                .each(
                                    customer,
                                    function (index, item) {
										
                                        html += "<tr>";
                                        html += "<td>" +
                                            (index + 1) +
                                            "</td>";
                                        html += "<td> " + item.Email + "</td>";
                                        html += "<td> " + item.FullName + "</td>";
                                        
										if(item.Phone === null || item.Phone === "null" || item.Phone.trim().length ===0|| item.Phone.length ===''|| item.Phone.length ===' '){
                                            html += '<td>Chưa có số điện thoại'  + '</td>';
                                        }else{
                                           html += "<td> " + item.Phone + "</td>";
                                        }
										if(item.Image === null || item.Image === "null" || item.Image.trim().length ===0|| item.Image.length ===''|| item.Image.length ===' '){
                                            html += '<td>Chưa có hình ảnh'  + '</td>';
                                        }else{
                                            html += '<td><img width="50" height="50" src="http://localhost:3000/static/images/'+ item.Image + '"></td>';
                                        }
										var address = "";
										for(let i = 0 ; i<item.Location.length;i++){
											 address += (item.Location)[i].NumApartment + ", Xã/Phường. "+(item.Location)[i].Ward 
											 + ", Huyện/Quận. "+(item.Location)[i].District +  ", Tỉnh/TP. "+(item.Location)[i].City +
											 " <br />";
										}
                                        html += "<td> " + address+ "</td>";
                                       
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

        });