$(document).ready(function() {
	
	$('#btnSubmit').click(function(event) {
		event.preventDefault();
		 var form = $('#fileUploadForm')[0];
		 var imgid = $("#imageid").val();
		 var data = new FormData(form);
		 console.log(data);
		$.ajax({
			type : "POST",
			enctype: 'multipart/form-data',
			url : "https://localhost:8443/serverptit/api/upload/"+imgid,
			data: data,
			processData: false,
		    contentType: false,
		    cache: false,
		    timeout: 1000000,
			success : function(result){
				console.log(result);
				save();
				console.log("Save done");
			},
			error : function(event){
				console.log("Save Fail");
			}
		});
		
	});
	$('#btnBack').click(function(event) {
		event.preventDefault();
		window.location.href = "./product";
	});

	loadOptionTypeProduct();
	loadOptionManuFactory();
	
	function save() {
		var img = {
				id: $("#imageid").val(),
				url : null,
				filename : $("#file").val(),
				product:{
					id: $("#productid").val(),
					material:$("#material").val() ,
					name :$("#namep").val(),
					price: $("#price").val(),
					stock :$("#stock").val(),
					description: $("#description").val(),
					manufactory: {
						id :$("#idmanufactory").val(),
						name :$("#manufactory").val()
		            },
		            ct: {
		            	id :$("#idcategory").val(),
		            	name :$("#name").val()
		            },
				}
			};
		
		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : "https://localhost:8443/serverptit/admin/product/api/save/",
			data : JSON.stringify(img),
			dataType : "json",
			success : function(result){
				alert("Save done");
				window.location.href = "https://localhost:8443/serverptit/admin/product";
				
			},
			error : function(event){
				alert("Save Fail");
				console.log(event)
			}
		});
	}

	
	
	function loadOptionTypeProduct() {
		var category = {
			id: $("#id").val(),
			name : $("#name").val(),
		};
		$
				.ajax({
					type : "GET",
					contentType : "application/json",
					url : "https://localhost:8443/serverptit/category/api/",
					data : category,
					dataType : "json",
					success : function(result) {
						var html = "";
						 $.each(result,function(index, item) {
									$('<option>',{
								                   value: item.name,
								               	}).html(item.name).appendTo("#typep");
								})
					},
					error : function(event) {
						alert("Error Get Category");
					}

				});
	}
	
	function loadOptionManuFactory() {
		var category = {
			id: $("#id").val(),
			name : $("#name").val(),
		};
		$
				.ajax({
					type : "GET",
					contentType : "application/json",
					url : "https://localhost:8443/serverptit/manufactory/api/",
					data : category,
					dataType : "json",
					success : function(result) {
						var html = "";
						 $.each(result,function(index, item) {
									$('<option>',{
								                   value: item.name,
								               	}).html(item.name).appendTo("#manufactory");
								})
					},
					error : function(event) {
						alert("Error Get Category");
					}

				});
	}
	$('#picture').click(function(event) {
		$('#imagepreview').attr('src', $('#picture').attr('src')); 
		   $('#imagemodal').modal('show'); 
	});
	
	$('#file').change(function(event) {
		readURL(this);
	});
	
	$('#manufactory').change(function() {
		var i = $('#manufactory option:selected').index();
          $('#idmanufactory').val(i+1);
	});
	
	$('#typep').change(function() {
		var i = $('#typep option:selected').index();
          $('#idcategory').val(i+1);
	});
	
	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#picture')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
});

