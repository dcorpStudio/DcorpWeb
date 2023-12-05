//--- this file is used for DBOM's foreign form checking

//-- bind event for the reset button to clear error
$('.reset').die('click').live('click',function(){ var F=$(this).parents('.JForm:first,.DBOMForm:first'); F.hideErr(); F.find('input,select,textarea').val(''); })


//== list of casting Function
var JCast={
	toInt	:	function(x){ return (/^\d{1,11}$/).test(x)?parseInt(x):false },
	toFloat	:	function(x){ return ((/^-?\d+(\.\d+)?$/).test(x) && x.length<24 && x.length>0 )?parseFloat(x):false },
	toDate	:	function(x){ x=new Date(x); return isNaN(x)?x:false; },
	toEmail	:	function(x){ return (/^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i).test(x)? x : false }
}

//== function to check data against checkrule
function DataCheck(x,C){
	eval('C={'+(C||'')+'}'); var castFunc = JCast[C.castFunc];	//-- evaluate the checkrule : C & ErrMsgObj : E

	//--start checking
	if (x==''){ return C.notNull?['notNull']:true }	//--check notNull
	if (C.minLen!=null && x.length<C.minLen){ return ['minLen'] }	//-- check minLen
	if (C.maxLen!=null && x.length>C.maxLen){ return ['maxLen'] }	//-- check maxLen
	if (castFunc){ x=castFunc(x); if(x===false){return ['castFunc']}; }	//-- check dataType & cast x to correct Type
	if (C.minVal!=null && x<castFunc(C.minVal)){ return ['minVal'] }	//--check min value
	if (C.minVal!=null && x>castFunc(C.maxVal)){ return ['maxVal'] }	//--check max value
	return true
}
//-- example
//alert( DataCheck('abc@yahoo.com,abc',"minLen:10, castFunc:'toEmail', notNull:1") )

$.fn.check = function(){ return DataCheck( $(this).val(), $(this).attr('alt') ) }




/*--- SPECIAL NOTE : HOW TO INTERGRATE A FASHIONED FORM
1/ We don't use <form> tag to cover a form, use "div" instead
	- Div's attribute named "alt" will hold the form action

	<div class="JForm" alt="SVA.asp?act=smth">
		.... (input) .....
	</div>


2/ Input,textarea,select... must be in format :


		<i class="formErr"></i>
		<input name="username"	alt="notNull:1,minLen:1,maxLen:100"	 rel="Vui lòng điền tên bạn">
		...
		<i class="formErr" rel="username"></i>


		while :  "alt"=Condition to check, "rel"=error message to display when data is invalid
		element to be errMessage-container must have class "formErr" & stand right before the input,,, to specify it's the errSpan for some certain input, it must have rel="input_name"
---*/



//-- global function to show the form err-msg (use this function for control only)
$.fn.RaiseErr = function(x){
	var A=$(this); var F=A.parents('.JForm:first,.DBOMForm:first'); var eSpan = $('.formErr[rel="'+A.attr('name')+'"]',F);
	if(!eSpan.length){ eSpan=$('*:lt('+ $('*',F).index(A) +')',F).filter('.formErr:last') }; eSpan.html(x||A.attr('rel')).show()
}

//-- hide previous err msg b4 show new ones (this func use for the form only)
$.fn.hideErr = function(){ $('.formErr',this).hide(); }

//-- check if form is OK (no error-msg is showing) or not (this func is for form element only)
$.fn.formReady = function(){ return $(this).find('.formErr:visible').length?false:true; }


//-- bind event submit for div with class JForm & DForm
$('.JForm').live('XSubmit',function(e,callBackFunc,B4Func){ e.stopPropagation();
	var F=$(this); F.hideErr();	//-- clear previous err msg

	//-- check data & raise error message
	$('input[type!="submit"],textarea,select', F).each(function(){
		if ($(this).check() != true){ $(this).RaiseErr(); valid=0; }
	})

	;(B4Func||F.data('B4Func')||parseInt)();

	if (F.formReady()){	//--(if no error is showing in the form) submit & get result
		/***/ F.Processing_Mask();
		callBackFunc = callBackFunc || F.data('callBackFunc') || function(x){JForm_Handle_Result(F,x); F.Processing_Done(); }
		$.post( F.attr('alt'), F.find('input,select,textarea').serialize(), callBackFunc )
	}
})

$('.JForm input,.DBOMForm input').live('keypress',function(e){ if(e.keyCode == 13){ $(this).parents('.JForm:first,.DBOMForm:first').trigger('XSubmit') }})
$('.JForm .submit,.DBOMForm .submit').live('click',function(){ $(this).parents('.JForm:first,.DBOMForm:first').trigger('XSubmit') })


//--common function to handle the callback function when SVA return result.
//-- including : hide previous messgae, show failed or success message & clear all form input if success.
function JForm_Handle_Result(F,x){	//-- F = form JQ-Object
	$('.success_msg,.failed_msg',F).hide()
	if(x.indexOf('success:')==0){
	if(x.length>8){ $('.success_msg',F).html(x.substring(8,x.length)) } 
		$('.success_msg',F).show(); if (F.attr('rel')=='done-reset'){ F.find('input,textarea,select').val('') }
	}else if(x.indexOf('failed:')==0){
		if(x.length>7){ $('.failed_msg',F).html(x.substring(7,x.length)) } 
		$('.failed_msg',F).show()
	}else{	//-- disconnected to server or server error
		$('.failed_msg',F).html('Đường truyền tới máy chủ gặp sự cố. Vui lòng thử lại sau.').show()
	}
}







