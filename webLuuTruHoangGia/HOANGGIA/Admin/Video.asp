<!--#include file="Header.asp"-->

<%

	//-----Xay dung cau SQL them tham so' truyen vao` de co the lam` loi~ cho ttrang search

	var E = '';

	//================================Create all available condition
		//Key_____________________
		var key = VBRequest('key');
		if (key && key != ''){ key=(new String(key)).replace(/\'/g , "''") ;
			var Key_Con = " and (Name like '%" +key+ "%' or Intro like '%" +key+ "%') " }

		//Category , Car_Firm , Car_Name_______________
		var Cat = parseInt(Request('Cat'));
		if (!isNaN(Cat) && Cat > 0){
			var Cat_Con = " and Cat_ID = " + Cat + " "
		}


	//----------Genarate SQL
	var SQL_Con = (Cat_Con||'') + (Key_Con||'')

	SQL = 	" Select * from Video where 1=1 " +SQL_Con+ " Order by Add_Time DESC"
%>


<!--#include file="Video_Core.asp"-->

<!--#include file="Footer.asp"-->


