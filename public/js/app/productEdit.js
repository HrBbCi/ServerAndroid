$(document).ready(function () {
	const base_url = "http://localhost:3000/api/";
	$('#btnSubmit').click(function (event) {
		event.preventDefault();
		if (validate()) {
			var file = $('#form-upload')[0];
			var data = new FormData(file);
			var fileList = document.getElementById("upload").files;
			var sizeImage = $("#listImg > img").length;
						
			if(file ===  null || data === null || fileList === null || fileList.length === 0){
				//Ko cần update ảnh
				//Update Product
				var i = $('#typep option:selected').index();
				console.log(i + 1);
				//Radio
				var colorValue = $("input[name='editList']:checked").val();
				var sizeValue = $("input[name='sizeList']:checked").val();

				var dataProduct = {
					ProductId: $('#productid').val(),
					Figure: $('#number').val(),
					Description: $('#description').val(),
					Material: $('#Material').val(),
					Type: $('#Type').val(),
					ColorId: colorValue,
					Size: sizeValue,
					Tittle: $('#Tittle').val(),
					CoverPrice: $('#CoverPrice').val(),
					OriginPrice: $('#OriginPrice').val(),
					ColorId_old:  $('#color_old').val(),
					Size_old: $('#size_old').val(),
					Title_old: $('#title_old').val()
				};
				updateProduct(dataProduct);
			}else{
				//Delete ảnh cũ
				deleteValue($('#productid').val());
				
				//Insert Ảnh mới
				//Up to server
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
						console.log("Save Fail" + event);
					}
				});

				var dataImage = [];
				for (var i = 0; i < fileList.length; i++) {
					console.log(fileList.item(i).name)
					dataImage[i] = {
						ProductsId: $('#productid').val(),
						UrlImage: fileList.item(i).name
					};
					//Save Value Image
					saveValue(dataImage[i]);
				}

				//Update Product
				var i = $('#typep option:selected').index();
				console.log(i + 1);
				//Radio
				var colorValue = $("input[name='editList']:checked").val();
				var sizeValue = $("input[name='sizeList']:checked").val();

				var dataProduct = {
					ProductId: $('#productid').val(),
					Figure: $('#number').val(),
					Description: $('#description').val(),
					Material: $('#Material').val(),
					Type: $('#Type').val(),
					ColorId: colorValue,
					Size: sizeValue,
					Tittle: $('#Tittle').val(),
					CoverPrice: $('#CoverPrice').val(),
					OriginPrice: $('#OriginPrice').val(),
					ColorId_old:  $('#color_old').val(),
					Size_old: $('#size_old').val(),
					Title_old: $('#title_old').val()
				};
				updateProduct(dataProduct);
			}
		} else {
			alert("Fail Save Product");
		}
	});

	function validate() {
		var file = $('#form-upload')[0];
		var data = new FormData(file);
		var fileList = document.getElementById("upload").files;
		var Id = $('#productid').val();
		var number = $('#number').val();
		var description = $('#description').val();
		var Material = $('#Material').val();
		var Type = $('#Type').val();
		var Tittle = $('#Tittle').val();
		var CoverPrice = $('#CoverPrice').val();
		var OriginPrice = $('#OriginPrice').val();
		var colorValue = $("input[name='editList']:checked").val();
		var sizeValue = $("input[name='sizeList']:checked").val();
		var sizeImage = $("#listImg > img").length;
		if (Id === null || Id.length === 0 || Id === "null") {
			alert("Incorrect Id");
			return false;
		}
		if (number === null || number.length === 0 || number === "null") {
			alert("Incorrect number");
			return false;
		}
		if (description === null || description.length === 0 || description === "null") {
			alert("Incorrect description");
			return false;
		}
		if (Material === null || Material.length === 0 || Material === "null") {
			alert("Incorrect Material");
			return false;
		}
		if (Type === null || Type.length === 0 || Type === "null") {
			alert("Incorrect Type");
			return false;
		}
		if (Tittle === null || Tittle.length === 0 || Tittle === "null") {
			alert("Incorrect Tittle");
			return false;
		}
		if (CoverPrice === null || CoverPrice.length === 0 || CoverPrice === "null" || CoverPrice <= 0) {
			alert("Incorrect CoverPrice");
			return false;
		}
		if (OriginPrice === null || OriginPrice.length === 0 || OriginPrice === "null" || OriginPrice <= 0) {
			alert("Incorrect OriginPrice");
			return false;
		}
		if (colorValue === null || colorValue.length === 0 || colorValue === "null" || colorValue === -1) {
			alert("Incorrect colorValue");
			return false;
		}
		if (sizeValue === null || sizeValue.length === 0 || sizeValue === "null" || sizeValue === -1) {
			alert("Incorrect sizeValue");
			return false;
		}
		if(fileList.length === 0){
			if(sizeImage ===0){
				alert("Incorrect Image");
				return false;
			}
		}
		return true;
	}

	function deleteValue(ProductId){
		$.ajax({
			type: "DELETE",
			contentType: "application/json",
			url: base_url + "product/saveValue",
			data: JSON.stringify(ProductId),
			dataType: "json",
			success: function (result) {
				console.log("DELETE Val 1");
			},
			error: function (event) {
				console.log("DELETE Fail" + event);
			}
		});
	}
	function saveValue(dataImage) {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: base_url + "product/saveValue",
			data: JSON.stringify(dataImage),
			dataType: "json",
			success: function (result) {
				console.log("saveValue 1");
			},
			error: function (event) {
				console.log("Save Fail" + event);
			}
		});
	}

	function updateProduct(dataProduct) {
		$.ajax({
			type: "PUT",
			contentType: "application/json",
			url: base_url + "product",
			data: JSON.stringify(dataProduct),
			dataType: "json",
			success: function (result) {
				console.log("saveProduct 1");
				alert("Update success");
				window.location.href = "../../product";
			},
			error: function (event) {
				alert("Save Fail" + event);
			}
		});
	}
	$('#btnBack').click(function (event) {
		event.preventDefault();
		window.location.href = "/admin/product";
	});

	//Option Product
	loadOptionTypeProduct();
	function loadOptionTypeProduct() {		
		$
			.ajax({
				type: "GET",
				contentType: "application/json",
				url: base_url + "category",
				dataType: "json",
				success: function (result) {
					var html = "";
					$.each(result, function (index, item) {
						$('<option>', {
							value: item.Name,
						}).html(item.Name).appendTo("#typep");
					})
				
					var index  = $('#idcategory').val() - 1 ;
					$('#typep option:eq(' + index +')').attr("selected", "selected");
				},
				error: function (event) {
					alert("Error Get Category");
				}

			});
	}
	$('#typep').change(function () {
		var i = $('#typep option:selected').index();
		$('#idcategory').val(i + 1);

		var idK = $('#typep').val();
	});
	//Load Image
	let imagesPreview = function (input, placeToInsertImagePreview) {
		if (input.files) {
			let filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				let reader = new FileReader();
				reader.onload = function (event) {
					$($.parseHTML("<img style='padding: 10px' width = 100px height=100px>"))
						.attr("src", event.target.result)
						.appendTo(placeToInsertImagePreview);
				};
				reader.readAsDataURL(input.files[i]);
			}
		}
	};
	$("#upload").on("change", function () {
		$('div.preview-images').empty();
		imagesPreview(this, "div.preview-images");
		$('#listImg').hide();
	});
	
});