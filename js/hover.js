$(document).ready(function(){
    
    
    $(document).on('mouseenter','#teamlink',function(){
        console.log('mouse entered');
        $(this).addClass('linkactive');
    });
    
    $(document).on('mouseleave','#teamlink',function(){
        console.log('mouse left');
        $(this).removeClass('linkactive');
    });
    
    
    $(document).on('mouseenter','#matchlink',function(){
        console.log('mouse entered score');
        $(this).children().addClass('scoreactive');
    });
    
    $(document).on('mouseleave','#matchlink',function(){
        console.log('mouse entered score');
        $(this).children().removeClass('scoreactive');
    });
});