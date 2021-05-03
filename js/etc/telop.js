//
// from http://www.phoenix-c.or.jp/~s-moon/sub421.htm
//

var msg=new Array();
msg[0]="五十歩ヒャッホオオオオ！";
msg[1]="ごはんですよはごはんじゃないですよ";
msg[2]="パンはパンでも奴はとんでもないものをルパンルパーン";
msg[3]="さっき買った納豆に混ぜるな危険って書いてあった";
msg[4]="カーナビの音声が児玉清だったので電柱に車がアタックチャンス";
msg[5]="扇風機動かしたら家が発進した";
msg[6]="影武者 ｢ははは、馬鹿めそっちは本物だ！｣ ";
msg[7]="オール電化だけど電気止められた";
msg[8]="男は中身 （※ただしイケメンに限る）";
msg[9]="俺がやらなきゃ誰 か やる";
msg[10]="立つ鳥後は任せた";
msg[11]="能ある鷹はさっさとタカ飛び";
msg[12]="アクセスの多いページを更新すると誰も閲覧しなくなる";
msg[13]="「できるわけがない」と主張する者は、それをやっている者の邪魔をすべきではない";
msg[14]="打ち負かされる事自体は、何も恥じるべき事ではない。打ち負かされたまま、立ち上がろうとせずにいる事が恥ずぺき事なのである";
msg[15]="人は才能の前では頭を下げないが、努力の前では頭を下げるものである";
msg[16]="賢者は真理を発見して喜び、凡人は誤りを発見して喜ぶ";
msg[17]="立てば芍薬、座れば牡丹、歩く姿はｶﾘﾌﾗﾜ――――(ﾟ∀ﾟ)―――!!!!!!!";
msg[18]="シーフードドリアのシーフーってなんだ？";
msg[19]="サザエさんに出てくるタイコーバさんって";
msg[20]="キーパーってナイスセーブしたあとなんで怒るの？";
msg[21]="蓮舫「EXILEってこんなに沢山いりませんよね？」";
msg[22]="聖徳太子「ごめん、もっかい言ってくんない？」";
msg[23]="「へいパス！パスくれ！パスパス！パース！……ナイッシュー」";
msg[24]="中身入りと思って持ち上げ、空だった時のヤカンの持ち上がり方は異常";
msg[25]="大さじはお玉じゃねえ";

var pos=0;
var direction=1;
var text=msg[0];
var msgCnt=0;
var delay=60;		// 動くスピード.
var bdelay=6000;	// 戻りのディレイ.

//ブラウザ判別 --ここから --
myOP = window.opera;            // OP
myN6 = document.getElementById; // N6
myIE = document.all;            // IE
myN4 = document.layers;         // N4
if      (myOP) myBR="O6"; // ブラウザは OP6以上.
else if (myIE) myBR="I4"; // ブラウザは IE4以上.
else if (myN6) myBR="N6"; // ブラウザは NS6以上.
else if (myN4) myBR="N4"; // ブラウザは NN4.
else           myBR="";   // ブラウザは 分からん.
//ブラウザ判別 --ここまで --

function ticker()
{
	// 必要なら、ここでmsgをシャッフル.
	if( msgCnt == 0 )
	{
		msgCnt++;

		var i = msg.length;
		while( i )
		{
			var j = Math.floor(Math.random()*i);
			var k = msg[--i];
			msg[i] = msg[j];
			msg[j] = k;
		}
		// 表示するテキストを設定.
		text=msg[0];
	}
	
	var telopOut='<font size=+1><font color=silver>コピペ&nbsp;</font>[&nbsp;<font color=silver>'+text.substring(0, pos)+'</font>&nbsp;]</font>';
	if (myBR == "N4")			//NN4
	{
		document.tickStr.document.open();
		document.tickStr.document.write(telopOut);
		document.tickStr.document.close();
	}
	else if(myBR == "IE4")		//IE4以上.
	{
		document.all("tickStr").innerHTML=telopOut;
	}
	else						//それ以外.
	{
		document.getElementById("tickStr").innerHTML=telopOut;
	}
	
	pos += direction;

	if(pos > text.length)			// go back
	{
		direction = -direction;		//change direction
		setTimeout('ticker()', bdelay);
	}
	else
	{
		if(pos < 0)				// new message
		{
			//次のテキスト.
			if( msgCnt < msg.length )
			{
				text = msg[msgCnt];
				msgCnt++;
			}
			// 配列を超えていたら、カウンタをクリアして、次の呼び出しでシャッフルを実行させる.
			else
			{
				msgCnt = 0;
			}
			direction = -direction;	//change direction
		}
		setTimeout('ticker()', delay);
	}
}


//<div id="tickStr" style="LEFT: 100px; POSITION: absolute; TOP: 90px" align="center"></div>
