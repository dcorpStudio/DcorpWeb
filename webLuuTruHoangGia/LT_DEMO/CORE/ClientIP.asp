<%//-- this file will replace the Global.asa in managing Sesssion by ClientIP & client lastActiveTime
var x=RQA('client'); if(x==''){ var APP_NEW_APPLICATION=1; x='ip:0,last_active:1'.newJStr(); }
var sTimeout = Session.Timeout*60; var d=new Date();

//-- build the list of expired IP, while remove the IP from list
var APP_EXPIRED_IP = []; IP_Pending = [];
var A = x.toArr(); for (A.i=0;A.i<A.l();A.i++){
	var clientDate= new Date(A.x('last_active'));
	if (clientDate.add('s',sTimeout) < d){
		APP_EXPIRED_IP.push(A.x('ip')); A.splice(A.i,1); A.i--;
	}
}


//-- detect new IP, renew this (old) IP by delete it & re add it;
var IP=	getIP(); if (A.Exist('ip',IP)==-1){ var APP_NEW_IP=1 }
A.Del('ip', IP).Add( [IP,d.toStd()] )	//-- add ip to list (has checkexist)


//-- get the stat for visitor counter
var APP_ONLINE = A.l();


//-- re assign list to Application
A.toStr().toApp('client');




// auto delete  /TemUpload  folder
/* Unnecessary in En part
if (APP_NEW_APPLICATION){
	var F=FSO(); F.DeleteFile( ABSPath(Global.x('tem_upload_folder'))+'\\*.*' ); F=null;
}
*/

%>


