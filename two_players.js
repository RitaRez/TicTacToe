window.onload = buildBoard();

function buildBoard(){
 var w;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $('#r'+i).append('<div id="'+i+j+'" class="col-4"></div>')
            w = $('#'+i+j).width();
            $("#"+i+j).css('height', w);
            $("#"+i+j).css('max-width' , w);
            $("#"+i+j).css('padding', 0);
            $("#"+i+j).css('border-color', 'white');
            $("#"+i+j).css('border-width', 'thin');
            $("#"+i+j).append('<p id="s'+i+j+'" class="align-middle"></p>');
            console.log('ok')

            if(i < 2 && j < 2)
                $("#"+i+j).css('border-style', 'none solid solid none');
            else if(i<2)
                $("#"+i+j).css('border-style', 'none none solid none');
            else if(j<2)
                $("#"+i+j).css('border-style', 'none solid none none');
        }
    }
    $('#board').css('max-width', w*3)
    $('#board').css('max-height', w*3)

    var b = $('#board').width();
    $('#game').css('width', b*(12/10));
    $('#game').css('height', b*(12/10));
    $('#game').css('padding', (b*(2/10)/2));

}

//-2 PLAYERS
var count = 0;
function verify (char){
    for (var i = 0; i < 3; i++) {
        if(document.getElementById("s"+i+'0').textContent == document.getElementById("s"+i+'1').textContent){
            if (document.getElementById("s"+i+'0').textContent == document.getElementById("s"+i+'2').textContent)
                if (document.getElementById("s"+i+'0').textContent == char)
                    return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        if(document.getElementById("s"+'0'+i).textContent == document.getElementById("s"+'1'+i).textContent){
            if (document.getElementById("s"+'0'+i).textContent == document.getElementById("s"+'2'+i).textContent)
                if (document.getElementById("s"+'0'+i).textContent == char)
                    return true;
        }
    }
    if(document.getElementById("s"+'0'+'0').textContent == document.getElementById("s"+'1'+'1').textContent){
        if (document.getElementById("s"+'0'+'0').textContent == document.getElementById("s"+'2'+'2').textContent)
            if (document.getElementById("s"+'0'+'0').textContent == char)
                return true;
    }
    if(document.getElementById("s"+'2'+'0').textContent == document.getElementById("s"+'1'+'1').textContent){
        if (document.getElementById("s"+'2'+'0').textContent == document.getElementById("s"+'0'+'2').textContent)
            if (document.getElementById("s"+'1'+'1').textContent == char)
                return true;
    }
    return false;
}
function game(i, j){
    if(document.getElementById("s"+i+j).innerHTML == 'x' || document.getElementById("s"+i+j).innerHTML == 'o')
        return false;

    w = $('#'+i+j).width();
    if(count % 2 == 0){
        document.getElementById("s"+i+j).innerHTML = 'x'
        $("#s"+i+j).css('color', 'white');
        $("#s"+i+j).css('font-size', w*0.9);
        $("#s"+i+j).css('text-align', 'center');
        $("#s"+i+j).css('margin-top', (w*(-0.2)));
        if(verify('x') == true){
            return('x');

        }
    } else{
        document.getElementById("s"+i+j).innerHTML = 'o'
        $("#s"+i+j).css('color', 'white');
        $("#s"+i+j).css('font-size', w*0.9);
        $("#s"+i+j).css('text-align', 'center');
        $("#s"+i+j).css('margin-top', (w*(-0.2)));
        if(verify('o') == true){
            return 'o';
        }
    }
    count++;
    console.log('why dou')
    return false;
}

$('#00').click(function () {
    resp = game(0,0);
    if( resp != false)
        alert( resp+ ' won');
});
$('#01').click(function (){
    resp = game(0,1);
    if(resp != false)
        alert( resp+ ' won');
});
$('#02').click(function (){
    resp = game(0,2);
    if( resp != false)
        alert( resp+ ' won');
});
$('#10').click(function (){
    resp = game(1,0);
    if( resp != false)
        alert( resp+ ' won');
});
$('#11').click(function (){
    resp = game(1,1);
    if( resp != false)
        alert( resp+ ' won');
});
$('#12').click(function (){
    resp = game(1,2);
    if( resp != false)
        alert( resp+ ' won');
});
$('#20').click(function (){
    resp = game(2,0);
    if( resp != false)
        alert( resp+ ' won')
});
$('#21').click(function (){
    resp = game(2,1);
    if( resp != false)
        alert( resp+ ' won')
});
$('#22').click(function (){
    resp = game(2,2);
    if( resp != false)
        alert( resp+ ' won')
});
