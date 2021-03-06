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
                       
                        var res = result.data.split(";");
						if(res[3].length ===0||res[3]===null|| res[3] ==="null"){
							res[3] = "icon_avatar.png";
						}
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
					var image_news ;
					var img_order = $('#image_order').attr('src');
					
					if(file ===  null || data === null || fileList === null || fileList.length === 0){
						img_order = img_order.substring(36,img_order.length);
						image_news = img_order;
						 var news = {
							emplID: $("#emplid").val(),
							title: $("#Tittle").val(),
							description: $('#description').val(),
							image: image_news,
							link: $('#Link').val(),
							id: $('#orderid').val()
						};
						console.log(news);
						updateNews(news);
					}else{
						 //Save Image to Server
						image_news = fileList.item(0).name;
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
						

						var news = {
							emplID: $("#emplid").val(),
							title: $("#Tittle").val(),
							description: $('#description').val(),
							image: image_news,
							link: $('#Link').val(),
							id: $('#orderid').val()
						};
						console.log(news);
						updateNews(news);
					}
                } else {
                    alert("Fail UPDATE News");
                }
            });

            function validate() {
                var file = $('#form-upload')[0];
                var data = new FormData(file);
                var fileList = document.getElementById("upload").files;
				var img_order = $('#image_order').attr('src');
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
					if(img_order === null || img_order.length ===0 ){
						alert("Incorrect Image");
						return false;
					}   
                }
                return true;
            }
	let imagesPreview = function (input, placeToInsertImagePreview) {
		if (input.files) {
			let filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					$($.parseHTML("<img width = 100px height=100px>"))
						.attr("src", event.target.result)
						.appendTo(placeToInsertImagePreview);
				};
				reader.readAsDataURL(input.files[i]);
			}
		}
	};
	$("#upload").on("change", function () {
		$('#image_order').hide();
		imagesPreview(this, "div.preview-images");
	});
            function updateNews(news) {
                $.ajax({
                    type: "PUT",
                    contentType: "application/json",
                    url: base_url + "news",
                    data: JSON.stringify(news),
                    dataType: "json",
                    success: function (result) {
                        alert("UPDATE Success")
                        window.location.href = "../../news";
                    },
                    error: function (event) {
						alert("UPDATE Fail")
                        console.log("Save Fail" + event);
                    }
                });
            }
        });