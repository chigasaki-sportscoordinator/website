//
// from http://www.phoenix-c.or.jp/~s-moon/sub421.htm
//

var msg=new Array();
msg[0]="�܏\���q���b�z�I�I�I�I�I";
msg[1]="���͂�ł���͂��͂񂶂�Ȃ��ł���";
msg[2]="�p���̓p���ł��z�͂Ƃ�ł��Ȃ����̂����p�����p�[��";
msg[3]="�������������[���ɍ�����Ȋ댯���ď����Ă�����";
msg[4]="�J�[�i�r�̉��������ʐ��������̂œd���ɎԂ��A�^�b�N�`�����X";
msg[5]="��@����������Ƃ����i����";
msg[6]="�e���� ��͂͂́A�n���߂������͖{�����I� ";
msg[7]="�I�[���d�������Ǔd�C�~�߂�ꂽ";
msg[8]="�j�͒��g �i���������C�P�����Ɍ���j";
msg[9]="�������Ȃ���N �� ���";
msg[10]="������͔C����";
msg[11]="�\�����͂������ƃ^�J���";
msg[12]="�A�N�Z�X�̑����y�[�W���X�V����ƒN���{�����Ȃ��Ȃ�";
msg[13]="�u�ł���킯���Ȃ��v�Ǝ咣����҂́A���������Ă���҂̎ז������ׂ��ł͂Ȃ�";
msg[14]="�ł���������鎖���̂́A�����p����ׂ����ł͂Ȃ��B�ł��������ꂽ�܂܁A�����オ�낤�Ƃ����ɂ��鎖���p���؂����Ȃ̂ł���";
msg[15]="�l�͍˔\�̑O�ł͓��������Ȃ����A�w�͂̑O�ł͓�����������̂ł���";
msg[16]="���҂͐^���𔭌����Ċ�сA�}�l�͌��𔭌����Ċ��";
msg[17]="���Ă�䉖�A����Ή��O�A�����p�Ͷ���܁\�\�\�\(߁��)�\�\�\!!!!!!!";
msg[18]="�V�[�t�[�h�h���A�̃V�[�t�[���ĂȂ񂾁H";
msg[19]="�T�U�G����ɏo�Ă���^�C�R�[�o�������";
msg[20]="�L�[�p�[���ăi�C�X�Z�[�u�������ƂȂ�œ{��́H";
msg[21]="�@�u�uEXILE���Ă���Ȃɑ�R����܂����ˁH�v";
msg[22]="�������q�u���߂�A�������������Ă���Ȃ��H�v";
msg[23]="�u�ւ��p�X�I�p�X����I�p�X�p�X�I�p�[�X�I�c�c�i�C�b�V���[�v";
msg[24]="���g����Ǝv���Ď����グ�A�󂾂������̃��J���̎����オ����ُ͈�";
msg[25]="�傳���͂��ʂ���˂�";

var pos=0;
var direction=1;
var text=msg[0];
var msgCnt=0;
var delay=60;		// �����X�s�[�h.
var bdelay=6000;	// �߂�̃f�B���C.

//�u���E�U���� --�������� --
myOP = window.opera;            // OP
myN6 = document.getElementById; // N6
myIE = document.all;            // IE
myN4 = document.layers;         // N4
if      (myOP) myBR="O6"; // �u���E�U�� OP6�ȏ�.
else if (myIE) myBR="I4"; // �u���E�U�� IE4�ȏ�.
else if (myN6) myBR="N6"; // �u���E�U�� NS6�ȏ�.
else if (myN4) myBR="N4"; // �u���E�U�� NN4.
else           myBR="";   // �u���E�U�� �������.
//�u���E�U���� --�����܂� --

function ticker()
{
	// �K�v�Ȃ�A������msg���V���b�t��.
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
		// �\������e�L�X�g��ݒ�.
		text=msg[0];
	}
	
	var telopOut='<font size=+1><font color=silver>�R�s�y&nbsp;</font>[&nbsp;<font color=silver>'+text.substring(0, pos)+'</font>&nbsp;]</font>';
	if (myBR == "N4")			//NN4
	{
		document.tickStr.document.open();
		document.tickStr.document.write(telopOut);
		document.tickStr.document.close();
	}
	else if(myBR == "IE4")		//IE4�ȏ�.
	{
		document.all("tickStr").innerHTML=telopOut;
	}
	else						//����ȊO.
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
			//���̃e�L�X�g.
			if( msgCnt < msg.length )
			{
				text = msg[msgCnt];
				msgCnt++;
			}
			// �z��𒴂��Ă�����A�J�E���^���N���A���āA���̌Ăяo���ŃV���b�t�������s������.
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
