$('img').each(function(i,e) { if(!$(e).hasClass('blink_live')) e.remove() });
$('script').each(function(i,e) { e.remove() });
$('style').each(function(i,e) { e.remove() });
$('link').each(function(i,e) { e.remove() });
$('a[href="/blink/?act=logout"]').html('logout');
$('br').remove();
$('a#mnu_show_promos').attr('href', '/blink/?act=show_promos&type=promo');
$('div.span-3 > a#mnu_stats').html('Weekly Tokens').attr('href', '/blink/freetoken/get');


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
