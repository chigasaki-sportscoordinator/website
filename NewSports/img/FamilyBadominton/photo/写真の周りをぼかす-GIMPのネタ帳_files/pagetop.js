 var y = 0;
 var ny = 0;
 var speed = 0;
 var scrollSize =0.8;

function pagetop(){
	var rep = setTimeout("pagetop()", speed)
	
	// ����������֤�����å���IE�ѡ�
	 if(document.all){
		y = document.body.scrollTop;
 	}
	// ����������֤�����å���NN�ѡ�
	 else if(document.layers || document.getElementById){
		y = pageYOffset;
	 }

	 if(ny == y){ // �������뤷����äƤ����������λ
 		clearTimeout(rep);
	 }
	 else{
		ny = y;
	 }

	 y = y *0.8 ;
	window.scrollTo(0,y); // �����������

}