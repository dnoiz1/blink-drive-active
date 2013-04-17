// 720 no sc0pe
(function($){
  $('img').each(function(i,e) { if(!$(e).hasClass('blink_live')) e.remove() });
  $('script').each(function(i,e) { e.remove() });
  //$('style').each(function(i,e) { e.remove() });
  $('link').each(function(i,e) { e.remove() });
  $('a[href="/blink/?act=logout"]').html('logout');
  $('br').remove();
  $('a#mnu_show_promos').attr('href', '/blink/?act=show_promos&type=promo');
  $('div.span-3 > a#mnu_stats').html('Weekly Tokens').attr('href', '/blink/freetoken/get');

  if(window.location.href.indexOf('#accept') !== -1) {
    chrome.runtime.sendMessage({method: "setLocalStorage", key: "accepted", value: "1"}, function(response){});
  }

  chrome.runtime.sendMessage({method: "getLocalStorage", key: "accepted"}, function(response) {
    var ignore_warning = response.data;
    if(ignore_warning != '1') {
      var warning = $('div').first();
      if(warning.css('display') == 'none') {
        warning.css({
            background: '-webkit-linear-gradient(top,  #fefcea 0%,#fae693 100%)',
            background: 'linear-gradient(to bottom,  #fefcea 0%,#fae693 100%)',
            position: 'static',
            width: '100%',
            height: '30px',
            padding: '0',
            'text-align': 'center',
            color: 'black'
        });   
        warning.html(warning.html() + '<input type="button" onclick="$(this).parent().slideUp();window.location.href += \'#accept\';window.location.reload()" value="I understand, dont show this warning again">');
        warning.slideDown();
      }
    }

  });
})($);

/*
var bw = [];

function WatchBlink(id)
{
  if(typeof id == 'object') id = id.id;
  el = $('#' + id).find('img.blink_live');
  if(el) {
    el.click();
    setTimeout('WatchBlink(' + id + ')', 4000);
  }
}

$('img.blink_live').click(function(){
  id = $(this).parents('form').attr('id');
  if(bw.indexOf(id) !== -1) return; 
  bw.push(id);
  WatchBlink(id);
});


*/