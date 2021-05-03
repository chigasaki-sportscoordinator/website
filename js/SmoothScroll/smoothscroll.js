/* Smooth scrolling
   Changes links that link to other parts of this page to scroll
   smoothly to those links rather than jump to them directly, which
   can be a little disorienting.
   
   sil, http://www.kryogenix.org/
   
   v1.0 2003-11-11
   v1.1 2005-06-16 wrap it up in an object
*/

var ss = {
  fixAllLinks: function() {
    // Get a list of all links in the page
    var allLinks = document.getElementsByTagName('a');
    // Walk through the list
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if ((lnk.href && lnk.href.indexOf('#') != -1) && 
          ( (lnk.pathname == location.pathname) ||
	    ('/'+lnk.pathname == location.pathname) ) && 
          (lnk.search == location.search)) {
        // If the link is internal to the page (begins in #)
        // then attach the smoothScroll function as an onclick
        // event handler
        ss.addEvent(lnk,'click',ss.smoothScroll);
      }
    }
  },

  smoothScroll: function(e) {
    // This is an event handler; get the clicked on element,
    // in a cross-browser fashion
    if (window.event) {
      target = window.event.srcElement;
    } else if (e) {
      target = e.target;
    } else return;

    // Make sure that the target is an element, not a text node
    // within an element
    if (target.nodeName.toLowerCase() != 'a') {
      target = target.parentNode;
    }
  
    // Paranoia; check this is an A tag
    if (target.nodeName.toLowerCase() != 'a') return;
  
    // Find the <a name> tag corresponding to this href
    // First strip off the hash (first character)
    anchor = target.hash.substr(1);
    // Now loop all A tags until we find one with that name
    var allLinks = document.getElementsByTagName('a');
    var destinationLink = null;
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if (lnk.name && (lnk.name == anchor)) {
        destinationLink = lnk;
        break;
      }
    }
    if (!destinationLink) destinationLink = document.getElementById(anchor);

    // If we didn't find a destination, give up and let the browser do
    // its thing
    if (!destinationLink) return true;
  
    // Find the destination's position
    var destx = destinationLink.offsetLeft; 
    var desty = destinationLink.offsetTop;
    var thisNode = destinationLink;
    while (thisNode.offsetParent && 
          (thisNode.offsetParent != document.body)) {
      thisNode = thisNode.offsetParent;
      destx += thisNode.offsetLeft;
      desty += thisNode.offsetTop;
    }
  
    // Stop any current scrolling
    clearInterval(ss.INTERVAL);
  
    cypos = ss.getCurrentYPos();
  
    ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
    ss.INTERVAL =
setInterval('ss.scrollWindow('+ss_stepsize+','+desty+',"'+anchor+'")',10);
  
    // And stop the actual click happening
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    if (e && e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  scrollWindow: function(scramount,dest,anchor) {
    wascypos = ss.getCurrentYPos();
    isAbove = (wascypos < dest);
    window.scrollTo(0,wascypos + scramount);
    iscypos = ss.getCurrentYPos();
    isAboveNow = (iscypos < dest);
    if ((isAbove != isAboveNow) || (wascypos == iscypos)) {
      // if we've just scrolled past the destination, or
      // we haven't moved from the last scroll (i.e., we're at the
      // bottom of the page) then scroll exactly to the link
      window.scrollTo(0,dest);
      // cancel the repeating timer
      clearInterval(ss.INTERVAL);
      // and jump to the link directly so the URL's right
      location.hash = anchor;
    }
  },

  getCurrentYPos: function() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
  },

  addEvent: function(elm, evType, fn, useCapture) {
    // addEvent and removeEvent
    // cross-browser event handling for IE5+,  NS6 and Mozilla
    // By Scott Andrew
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent){
      var r = elm.attachEvent("on"+evType, fn);
      return r;
    } else {
      alert("Handler could not be removed");
    }
  } 
}

ss.STEPS = 25;

ss.addEvent(window,"load",ss.fixAllLinks);

/* ============================= */
//スピードなどの設定
var options = {
    pageTopBtn : 'pagetop', // トップへ戻るボタンのID名（”名”のみで＃はつけない）
    showScroll : 200, // ボタンの出現するスクロール位置 PX単位
    scrollSpeed : 5, //早い→5　普通→10 ゆっくり→20
    fadeSpeed : 10 // 早い 5 ? 30 ゆっくり
};
 
window.onload = function(){
 
var btn = document.getElementById(options.pageTopBtn) ;
     
// ページトップへ戻るアニメーション
var scroll_timer;
function pageTop(x, y){
    if (y >= 1) {
        var scTop = Math.floor(y - (y / (options.scrollSpeed * 2)));
        window.scrollTo(x, scTop);
        scroll_timer = setTimeout(function(){pageTop(x, scTop)}, options.scrollSpeed);
        // ↑ y の値が1以下になるまで 少しの数値分だけスクロールアップするのを
        // scrollSpeed の設定時間ごとに繰り返す
    } else {
        clearTimeout(scroll_timer);
        // ↑ y の値が1以下になったらタイマーを止めて数値を引くのをやめる
        window.scrollTo(x, 0);
    }
}
     
// フェイドインアニメーション設定
var fadeIn_timer;
function fadeInTimer(opaValue){
    if (opaValue < 1){
        opaValue = opaValue + 0.05;
        btn.style.filter = "alpha(opacity:"+(opaValue*100)+")";
        btn.style.opacity = opaValue;
        fadeIn_timer = setTimeout(function(){fadeInTimer(opaValue);}, options.fadeSpeed);
        // ↑opaValue が1になるまで透明度を 0.05 ずつ足して行くのを
        //  fadeSpeed に設定された時間毎に繰り返す
    } else {
        clearTimeout(fadeIn_timer);
        // ↑opaValue が1になったら繰り返し処理を止める
        btn.style.filter = "alpha(opacity:100)";
        btn.style.opacity = 1;
    }
}
     
// フェイドアウトアニメーション設定
var fadeOut_timer;
function fadeOutTimer(opaValue){
    if ( opaValue >= 0.05){
        opaValue = opaValue - 0.05;
        btn.style.filter = "alpha(opacity:"+(opaValue*100)+")";
        btn.style.opacity = opaValue;
        fadeOut_timer = setTimeout(function(){ fadeOutTimer(opaValue); }, options.fadeSpeed);
        // opaValue が1になるまで透明度を 0.05 ずつ引いて行くのを
        //  fadeSpeed に設定された時間毎に繰り返す
    } else {
        clearTimeout(fadeIn_timer);
        // ↑ opaValue が0.05以下になったら繰り返し処理を止めて
        // 完全な0にしておく（↓）
        btn.style.filter = "alpha(opacity:0)";
        btn.style.opacity = 0;
    }
}
 
// スクロールイベント
btn.style.opacity = 0;
btn.style.filter = "alpha(opacity:0)";
window.onscroll = function(){
    var winSc = document.body.scrollTop || document.documentElement.scrollTop;
    if(winSc >= options.showScroll){
        clearTimeout(fadeOut_timer);
        var opaValue = parseFloat(btn.style.opacity);
        fadeInTimer(opaValue);
    } else {
        clearTimeout(fadeIn_timer);
        var opaValue = parseFloat(btn.style.opacity);
        fadeOutTimer(opaValue);
    }
}
 
// クリックイベント
btn.onclick = function(){
    // 現在のスクロール位置を取得する
    var x = document.body.scrollLeft || document.documentElement.scrollLeft;
    var y = document.body.scrollTop  || document.documentElement.scrollTop;
    // スクロール位置を pageTop() 関数へ渡して呼び出す
    pageTop(x, y);
    return false;
}
 
}

