$(document).ready(function () {
    var fonte = GetCookie('fonte') == null ? 2 : GetCookie('fonte');
    var contraste = GetCookie('contraste') == null ? 0 : GetCookie('contraste');

    if (fonte == 3) {
        $('*').css({ 'font-size': '16px' });
    }
    if (fonte == 2) {
        $('*').css({ 'font-size': '' });
    }
    if (fonte == 1) {
        $('*').css({ 'font-size': '10px' });
    }

    if (fonte == 4) {
        $('*').css({ 'font-size': '18px' });
    }
    if (fonte == 3) {
        $('*').css({ 'font-size': '16px' });
    }
    if (fonte == 2) {
        $('*').css({ 'font-size': '' });
    }
    if (contraste == 1) {
        $('*').css({ 'background-color': 'black' });
        $('*').css({ 'color': 'white' });
    }
    else {
        $('*').css({ 'background-color': '' });
        $('*').css({ 'color': '' });
        contraste = 0;
    }

    $('#aumenta_fonte, #aumenta_fonte_painel_servicos').click(function () {
        fonte++;
        if (fonte == 5) {
            fonte--;
        }
        else {
            if (fonte == 4) {
                $('*').css({'font-size':'18px'});
            }
            if (fonte == 3) {
                $('*').css({ 'font-size': '16px'});
            }
            if (fonte == 2) {
                $('*').css({'font-size': ''});
            }
            SetCookie('fonte', fonte);
        }
    });

    $('#reduz_fonte, #reduz_fonte_painel_servicos').click(function () {
        fonte--;
        if (fonte == 0) {
            fonte++;
        }
        else {
            if (fonte == 3) {
                $('*').css({ 'font-size': '16px'});
            }
            if (fonte == 2) {
                $('*').css({ 'font-size': ''});
            }
            if (fonte == 1) {
                $('*').css({ 'font-size': '10px'});
            }
            SetCookie('fonte', fonte);
        }
    });

    $('#altocontraste, #altocontraste_painel_servicos').click(function () {
        contraste++;
        if (contraste == 1) {
            $('*').css({ 'background-color': 'black'});
            $('*').css({ 'color': 'white'});
        }
        else {
            $('*').css({ 'background-color': ''});
            $('*').css({ 'color': ''});
            contraste = 0;
        }
        SetCookie('contraste', contraste);
	});

	$('#fonte_normal').click(function () {
        location.reload();
        SetCookie('contraste', 0);
        SetCookie('fonte', 2);
    });
});