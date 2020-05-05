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
//�X�s�[�h�Ȃǂ̐ݒ�
var options = {
    pageTopBtn : 'pagetop', // �g�b�v�֖߂�{�^����ID���i�h���h�݂̂Ł��͂��Ȃ��j
    showScroll : 200, // �{�^���̏o������X�N���[���ʒu PX�P��
    scrollSpeed : 5, //������5�@���ʁ�10 ������聨20
    fadeSpeed : 10 // ���� 5 ? 30 �������
};
 
window.onload = function(){
 
var btn = document.getElementById(options.pageTopBtn) ;
     
// �y�[�W�g�b�v�֖߂�A�j���[�V����
var scroll_timer;
function pageTop(x, y){
    if (y >= 1) {
        var scTop = Math.floor(y - (y / (options.scrollSpeed * 2)));
        window.scrollTo(x, scTop);
        scroll_timer = setTimeout(function(){pageTop(x, scTop)}, options.scrollSpeed);
        // �� y �̒l��1�ȉ��ɂȂ�܂� �����̐��l�������X�N���[���A�b�v����̂�
        // scrollSpeed �̐ݒ莞�Ԃ��ƂɌJ��Ԃ�
    } else {
        clearTimeout(scroll_timer);
        // �� y �̒l��1�ȉ��ɂȂ�����^�C�}�[���~�߂Đ��l�������̂���߂�
        window.scrollTo(x, 0);
    }
}
     
// �t�F�C�h�C���A�j���[�V�����ݒ�
var fadeIn_timer;
function fadeInTimer(opaValue){
    if (opaValue < 1){
        opaValue = opaValue + 0.05;
        btn.style.filter = "alpha(opacity:"+(opaValue*100)+")";
        btn.style.opacity = opaValue;
        fadeIn_timer = setTimeout(function(){fadeInTimer(opaValue);}, options.fadeSpeed);
        // ��opaValue ��1�ɂȂ�܂œ����x�� 0.05 �������čs���̂�
        //  fadeSpeed �ɐݒ肳�ꂽ���Ԗ��ɌJ��Ԃ�
    } else {
        clearTimeout(fadeIn_timer);
        // ��opaValue ��1�ɂȂ�����J��Ԃ��������~�߂�
        btn.style.filter = "alpha(opacity:100)";
        btn.style.opacity = 1;
    }
}
     
// �t�F�C�h�A�E�g�A�j���[�V�����ݒ�
var fadeOut_timer;
function fadeOutTimer(opaValue){
    if ( opaValue >= 0.05){
        opaValue = opaValue - 0.05;
        btn.style.filter = "alpha(opacity:"+(opaValue*100)+")";
        btn.style.opacity = opaValue;
        fadeOut_timer = setTimeout(function(){ fadeOutTimer(opaValue); }, options.fadeSpeed);
        // opaValue ��1�ɂȂ�܂œ����x�� 0.05 �������čs���̂�
        //  fadeSpeed �ɐݒ肳�ꂽ���Ԗ��ɌJ��Ԃ�
    } else {
        clearTimeout(fadeIn_timer);
        // �� opaValue ��0.05�ȉ��ɂȂ�����J��Ԃ��������~�߂�
        // ���S��0�ɂ��Ă����i���j
        btn.style.filter = "alpha(opacity:0)";
        btn.style.opacity = 0;
    }
}
 
// �X�N���[���C�x���g
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
 
// �N���b�N�C�x���g
btn.onclick = function(){
    // ���݂̃X�N���[���ʒu���擾����
    var x = document.body.scrollLeft || document.documentElement.scrollLeft;
    var y = document.body.scrollTop  || document.documentElement.scrollTop;
    // �X�N���[���ʒu�� pageTop() �֐��֓n���ČĂяo��
    pageTop(x, y);
    return false;
}
 
}

