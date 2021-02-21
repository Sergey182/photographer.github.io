$(document).ready(function () {
    function showSuccess(jsonData) {
        $(".submit__button").hide();
        $(".submit__success").text(jsonData['response']).show();
        setTimeout(function () {
            $(".submit__success").text('').hide();
            $("#popup").hide();
            $(".submit__button").show();
        }, 5000);
    }

    $(document).on('submit', '.submit__form', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: './php/form.php',
            data: $(this).serialize(),
            success: function (response) {
                let jsonData = JSON.parse(response);
                showSuccess(jsonData);
            }
        });
    });
});
