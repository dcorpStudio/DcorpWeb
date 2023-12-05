<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
	a {text-decoration:none}
	.black_link {color:#000000;}
	.black_link:hover {color:#cc0000;}

	.Normal_Image {border:1px solid #000000}
	.Focus_Image {border:3px solid #aa0000}
</style>

<script>
	var NImage_Focus = null;

	function NImage_Effect(Obj){
		var Q = Obj.getElementsByTagName('img');
		if (Q){
			for (var i=0;i<Q.length;i++){
				Q[i].onmouseover = function(){this.className='Focus_Image'}
				Q[i].onmouseout = function(){ if (this!=NImage_Focus){this.className='Normal_Image'}}
				Q[i].onclick = function(){
					NImage_Focus = this;
					var T = this.parentNode.parentNode.parentNode.getElementsByTagName('img')
					for (var j=0;j<T.length;j++){ T[j].className='Normal_Image' }
					this.className='Focus_Image';}
			}
		}
	}

	function NImage_Add(Name){
		window.open ( '<%=Global_Var("NImage_Path")%>/insert_pic.asp?Name='+Name,'upload_image',
					'toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200' ) }

	function NImage_Del(){ if (NImage_Focus && confirm('Bạn muốn xóa hình ảnh này ?')){
			var T = NImage_Focus.parentNode; T.parentNode.removeChild(T)} }

	function NImage_Left(){ 	var P = NImage_Focus;
		if (P){	var Q = P.parentNode.parentNode.getElementsByTagName('img');
			for (var i=0;i<Q.length;i++){
				if (Q[i]==P && i>0){ var S = P.src; P.src = Q[i-1].src ; Q[i-1].src=S;
									 P.className = 'Normal_Image'; Q[i-1].className='Focus_Image'
									 NImage_Focus = Q[i-1]; break; }
			}
		}
	}

	function NImage_Right(){ var P = NImage_Focus;
		if (P){	var Q = P.parentNode.parentNode.getElementsByTagName('img');
			for (var i=0;i<Q.length;i++){
				if (Q[i]==P && i<Q.length-1){ var S = P.src; P.src = Q[i+1].src ; Q[i+1].src=S;
											  P.className = 'Normal_Image'; Q[i+1].className='Focus_Image'
											  NImage_Focus = Q[i+1]; break; }
			}
		}
	}
</script>

