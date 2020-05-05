 var y = 0;
 var ny = 0;
 var speed = 0;
 var scrollSize =0.8;

function pagetop(){
	var rep = setTimeout("pagetop()", speed)
	
	// スクロール位置をチェック（IE用）
	 if(document.all){
		y = document.body.scrollTop;
 	}
	// スクロール位置をチェック（NN用）
	 else if(document.layers || document.getElementById){
		y = pageYOffset;
	 }

	 if(ny == y){ // スクロールし終わっていたら処理を終了
 		clearTimeout(rep);
	 }
	 else{
		ny = y;
	 }

	 y = y *0.8 ;
	window.scrollTo(0,y); // スクロール処理

}