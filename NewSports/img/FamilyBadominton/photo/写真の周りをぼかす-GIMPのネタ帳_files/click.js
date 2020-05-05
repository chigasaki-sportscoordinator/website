var host = 'http://www.infotop.jp';
function clickCount(aid, iid, pfg){
	if(pfg){
		//location.href = 'http://www.infotop.jp/click.php?aid=' + aid + '&iid=' + iid + '&pfg=' + pfg;
		location.href = host+'/click.php?aid=' + aid + '&iid=' + iid + '&pfg=' + pfg;
	}else{
		//location.href = 'http://www.infotop.jp/click.php?aid=' + aid + '&iid=' + iid;
		location.href = host+'/click.php?aid=' + aid + '&iid=' + iid;
	}
	return false;
}
