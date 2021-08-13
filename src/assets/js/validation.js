export function overLappingIssue(){
    const inputs = $('.inputDiv').find('input');
    for (let input of inputs) {
        var text_val = $(input).val();
        if (text_val === "") {
            $(input).removeClass('has-value');
        } else {
            $(input).addClass('has-value');
        }
    };
    const selects = $('.inputDiv').find('select')
    for (let select of selects) {
        var text_val = $(select).val();
        if (text_val === "") {
            $(select).css('color', '#000');
            $(select).removeClass('has-value');
        } else {
            $(select).css('color', '#000');
            $(select).addClass('has-value');
        }
    };
    $(function () {
        $('.inputDiv input').focusout(function () {
            var text_val = $(this).val();
            if (text_val === "") {
                $(this).removeClass('has-value');
            } else {
                $(this).addClass('has-value');
            }
        });
    });
   $(function (){
       $('inputDiv input').val("");
       $('inputDiv input').focusout(function (){
           if($(this).val() != ""){
               $(this).addClass('has-content');
           }else{
               $(this).removeClass('has-content');
           }
           
       })
   });
    $('select').css('color', 'transparent');
    $('select option').css('color', 'black');
    $('select').change(function () {
        if ($(this).val() !== "") {
            $(this).css('color', '#000');
            $(this).addClass('has-value');
        } else {
            $(this).css('color', 'transparent');
            $(this).removeClass('has-value');
        }
    });
    $('.inputDiv input, .inputDiv select, .inputDiv textarea').focusin(function () {
        $(this).parent().addClass('is-focused');
    });
    $('.inputDiv input, .inputDiv select, .inputDiv textarea').focusout(function () {
        $(this).parent().removeClass('is-focused');
    });
}