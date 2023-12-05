	//-----Cac Ham` Tao ra effect de chuyen banner.
	//-----CHU Y: CAC HIEU UNG NAY` KHA NANG NEN CHI CO THE CHAY TREN FIREFOX. IE se bi giat


	var CurrentX = 0
	var Run_Effect = "FadeS()" 		//----Hieu ung se duoc eval

	function Square_Effect(Obj){
		Get('Spots').style.display='none'
		if (!IE || false){
			var P = getPageCoords(Obj)

			// tao ra square
			var N = document.createElement('div'); var M = N.style;  M.opacity=1 ; M.filter= 'alpha(opacity=100)'
				M.position='absolute'; M.backgroundColor='#ffffff'; M.width=52; M.height=53; M.zIndex=150
				M.top = P.y ; M.left= P.x;

			//---------Sap xep cac square len tren Obj
			for (var i=0;i<15;i++){
				for (var j=0;j<7;j++){
					N.id = 'Q_' +i+ '_' +j
					M.top = (P.y + j*50) + 'px' ;	document.body.appendChild(N.cloneNode(false));
					}
				M.left = (P.x + i*50) + 'px'
			}
			eval(Run_Effect)
		}
	}


	//------Ham` Fade out tung` Square mot
	var Fade = function(id){
		var Obj = Get(id);
		var X = Obj.style.opacity
		Obj.style.opacity = X - 0.25
		Obj.style.filter = 'alpha(opacity='+ (X*100) +')'

		//------Hieu ung thu nho Square_cell
		/*if (X>0){
			Obj.style.width = parseInt(75*X)
			Obj.style.height = parseInt(70*X) }  */

		if (X!=0){
			var t = setTimeout( "Fade('"+id+"')",50);
		}else{
			Obj.style.display='none'
			clearTimeout(t)
		}
	}


//=====================================Cac ham` Fade trinh` dien~
	//Ham` Fade out 1 nhom square theo chieu` ngang tu` trai sang phai
	function FadeX(){
		var Q = CurrentX
			for (var i=0;i<5;i++){
			Fade('Q_' + Q + '_' + i )
		}

		CurrentX+=1

		if (CurrentX < 9){
			var T = setTimeout('FadeX()' , 100)
		}else{
			clearTimeout(T)
			CurrentX = 0
			Get('Spots').style.display='inline'
		}
	}


	//Ham` Fade out 1 nhom square theo duong cheo' :  trai--> phai / tren --> duoi
	function FadeS(){
		var M = CurrentX

		//---so' 14 la` lay' 15-1 , la` ra so' duong` cheo' trong 1 ma tran 10 x 5
		for (var j=0;j<=M;j++){
			var x = j%15 ; var y = (M - j)%7
			Fade('Q_' + x + '_' + y )
		}

		CurrentX+=1

		if (CurrentX < 21){	var T = setTimeout('FadeS()' , 90)
		}else{
			clearTimeout(T)
			CurrentX = 0
			Get('Spots').style.display='inline'
		}
	}