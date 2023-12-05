<%// the component to check user posted data
//-- the process is : checkNull -> check(minVal-maxVal) -> castFunc(check Type) -> check(maxVal-minVal)

//== list of casting Function
var JCast={
	toInt	:	function(x){ return (/^\d{1,11}$/).test(x)?parseInt(x):false },
	toFloat	:	function(x){ return ((/^-?\d+(\.\d+)?$/).test(x) && x.length<24 && x.length>0 )?parseFloat(x):false },
	toDate	:	function(x){ x=new Date(x); return isNaN(x)?x:false; },
	toEmail	:	function(x){ return (/^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i).test(x)? x : false }
}

//== function to check data against checkrule
String.prototype.Check = function(C){
	var castFunc = JCast[C.castFunc]; var x=this;

	//--start checking
	if (x==''){ return C.notNull?['notNull']:true }	//--check notNull
	if (C.minLen!=null && x.length<C.minLen){ return ['minLen'] }	//-- check minLen
	if (C.maxLen!=null && x.length>C.maxLen){ return ['maxLen'] }	//-- check maxLen
	if (castFunc){ x=castFunc(x); if(x===false){return ['castFunc']}; }	//-- check dataType & cast x to correct Type
	if (C.minVal!=null && x<castFunc(C.minVal)){ return ['minVal'] }	//--check min value
	if (C.minVal!=null && x>castFunc(C.maxVal)){ return ['maxVal'] }	//--check max value
	return true
}
//example : R( '1234'.Check({castFunc:'toInt',minVal:2000}) )

//--- implement check function for array of requested element in format : [ {name:FieldName, minLen:1, maxLen:100}, {name:FieldName2, minLen:2, maxLen:200}, ... ]
Array.prototype.CheckRQ = function(){
	var A=this; for(var i=0;i<A.l();i++){
		var x=A[i].name.RQ(); if(x.Check(A[i])!==true){ return false }else{ A[i]=x }
	}; return true;
}
%>


