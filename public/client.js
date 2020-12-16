$(document).ready(function () {

    $('#form').submit((event) => {
        event.preventDefault();
        $.ajax({
            url: '/api/convert',
            method: 'GET',
            data: $('#form').serialize(),
            success: data => {
                $('#string').text(data.string || data);
                $('#output').text(JSON.stringify(data))
            }
        })
    })
})