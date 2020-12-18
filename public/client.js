$(document).ready(function () {

    $('#form').submit((event) => {
        $.ajax({
            url: '/api/convert',
            type: 'GET',
            data: $('#form').serialize(),
            success: data => {
                $('#string').text(data.string || data);
                $('#output').text(JSON.stringify(data))
            }
        })
        event.preventDefault();
    })
})
