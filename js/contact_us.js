

//contact us form
function whatsapp() {
    //disable submit button on click
    // $(".contact_btn").attr("disabled", "disabled");
    // $(".contact_btn b").text('Sending');
    $(".contact_btn i").removeClass('d-none');

    //simple validation at client's end
    var post_data, output;
    var proceed = "true";
    // var allBlank;

    var str = $('#contact-form-data').serializeArray();

    $('#contact-form-data input').each(function() {
        if(!$(this).val()){
            // alert('Some fields are empty');
            proceed = "false";
        }
    });

    //everything looks good! proceed...
    if (proceed === "true") {

        var userName = document.getElementById("userName").value;
        var userEmail = document.getElementById("userEmail").value;
        var userSubject = document.getElementById("userSubject").value;
        var userMessage = document.getElementById("userMessage").value;

        var accessURL = "https://wa.me/919947886837?text="
        +"*Name :* "+userName+"%0a"
        +"*Email :* "+userEmail+"%0a"
        +"*Subject :* "+userSubject+"%0a"
        +"*Message :* "+userMessage+"%0a"

        window.open(accessURL, '_blamk').focus();

        //data to be sent to server
        $.ajax({
            type: 'POST',
            url: accessURL,
            data: str,
            dataType: 'json',
            success: function (response) {
                if (response.type == 'error') {
                    output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                } else {
                    output = '<div class="alert-success" style="padding:10px 15px; margin-bottom:30px;">' + response.text + '</div>';
                    //reset values in all input fields
                    $('.contact-form input').val('');
                    $('.contact-form textarea').val('');
                }

                if ($("#result").length) {
                    // alert("yes");
                    $("#result").hide().html(output).slideDown();
                    $(".contact_btn i").addClass('d-none');
                }else{
                    if (response.type == 'error') {
                        Swal.fire({
                            type: 'error',
                            icon: 'error',
                            title: 'Oops...',
                            html: '<div class="text-danger">'+ response.text +'</div>',
                        })
                        $(".contact_btn i").addClass('d-none');
                    }else{
                        Swal.fire({
                            type: 'success',
                            icon: 'success',
                            title: 'Success!',
                            html: '<div class="text-success">'+ response.text +'</div>',
                        })
                        $(".contact_btn i").addClass('d-none');
                    }
                }
            },
            // error: function () {
            //     alert("Failer");
            // }
        });

    }
    else
    {
        if ($("#result").length) {
            // alert("yes");
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $("#result").hide().html(output).slideDown();
            $(".contact_btn i").addClass('d-none');
        }else{
            Swal.fire({
                icon: 'error',
                type: 'error',
                title: 'Oops...',
                html: '<div class="text-danger">Please provide the missing fields.</div>'
            })
            $(".contact_btn i").addClass('d-none');
        }

    }
    $(".contact_btn i").addClass('d-none');

};
