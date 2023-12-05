<%if NORMAL_WEBFORM then%>
	<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta charset="utf-8">


		<!-- DEDICATED FOR MOBILE VERSION -->
		<meta name="viewport" content="initial-scale=1,maximum-scale=2,user-scalable=no">
		<meta name="format-detection" content="telephone=yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<!-- // DEDICATED FOR MOBILE VERSION -->


		<!-- ######################## MODERN LICENSE GEN ######################### -->
		<link href="JQUERY/jquery-ui.css" rel="stylesheet">
		<script src="JQUERY/external/jquery/jquery.js"></script>
		<script src="JQUERY/jquery-ui.js"></script>
		<script src="JQUERY/json2.js"></script>
		<script src="JQUERY/MD5.js"></script>
		<script>
			//@@@@@@@@@@@@@@@@@@@@@@@@ Global vars
			var softArr
			var dbName = 'dsoft', isOnline = false, boolStore = typeof (Storage) !== 'undefined'

			//-- dynamically update from server on demand
			function serverUpdate_callback(data) { isOnline = true; implementSoftArr(data); }

			// @@@@@@@@@@@@@@@@@@@@@@@ IMPLEMENT THE SOFT_LIST ARRAY
			function implementSoftArr(softList) {
				if (isOnline && !softList) { return } //-- !softList => pageLoad implementation && isOnline=serverImplemented already.

				//-- update storage support status + online status
				if (!boolStore) { $('#noStageSupport').show(); }; if (!isOnline) { $('#noInternet').show(); } else { $('#justUpdated').show().fadeOut(2000); }

				//-- load data from server. If no internet connection, use the db from localStorage of HTML5. Else update the storage
				softList = softList || (boolStore ? localStorage.getItem(dbName) : '') || JSON.stringify([]);
				try { softArr = JSON.parse(softList) } catch (e) { alert('Error when JSON.parse saved_softList: \n' + softList); return; }
				if (boolStore && softArr && softArr.length) { localStorage.setItem(dbName, softList) }

				//== implement autocomplete to client search
				var suggestArr = [];
				for (var i = 0; i < softArr.length; i++) {
					var dummy = []; for (var prop in softArr[i]) { dummy.push(softArr[i][prop]) }
					suggestArr.push(dummy.join(' :: '))
				}

				var Ctl = $('#soft_edition'); if (Ctl.data('autocomplete')) { Ctl.removeData('autocomplete').autocomplete("destroy") } //-- remove all autocomplete bound b4 re-bind autocomplete
				Ctl.autocomplete({ source: suggestArr }).focus();
			}

			//@@@@@@@@@@@@@@@@@@@@@@@@ ON BODY LOADED
			$(function () {
				implementSoftArr();

				//-- auto recognize the soft_folder
				$('#soft_edition').on('keyup autocompletechange', function () {
					var t = $(this).val(); var s = t.split(' :: ')[0].toUpperCase()
					if (s.indexOf('LUUTRU_') == 0) { $('#soft_folder').val(s); }
				})

			})


			// @@@@@@@@@@@@@@@@ GEN KEY !
			function genKey(isBatchKey) {
				//-- gen the correct key
				var Soft_Folder = $('#soft_folder').val().replace(/\s/gi, '');
				var PC_Code = $('#pc_code').val();
				var CD_Key = MD5(String(Soft_Folder + PC_Code.replace(/[^a-z0-9]/gi, '')).toLowerCase()).substring(0, 16).replace(/[^a-z0-9]/gi, '').toUpperCase()
				var CD_KeyX = ""
				for (var i = 0; i <= 3; i++) { CD_KeyX += CD_Key.substr(i * 4, 4) + (i == 3 ? "" : "-") }
				if (!isBatchKey) {
					$('#cd_key').val('Ma CDKey cua quy khach la: ' + CD_KeyX + '. Quy khach vui long ghi lai de su dung lau dai.');
				} else {
					return CD_KeyX;
				}
			}


			//========= gen batch CDKey
			function batchCDKey() {
				var K = $('#cd_key'), newKey = genKey(true);
				var m = K.val().replace(/(^\s)|(\s$)/g, '') || 'Ma CDKey cua quy khach la: . Quy khach vui long ghi lai de su dung lau dai.'
				var pos = m.search(/\.\sQuy\s/); if (!pos) { return }
				m = m.substr(0, pos) + '[' + $('#soft_folder').val().replace('LUUTRU_', '') + '=' + newKey + '] -- ' + m.substr(pos, m.length - pos);
				K.val(m);
			}


			//-- pre-compose the cdkey-SMS to send.
			function sendSMS() { location = 'sms://?body=' + encodeURIComponent($('#cd_key').val()); }

			// @@@@@@@@@@@@@@@@@ UPDATE THE SOFT_EDITION
			function showUpdateForm() { $('#updateForm').show(); }


			// @@@@@@@@@@@@@@@@@  Check the PCCode & Auto detect PC_Code
			function handlePCCode() {
				var pc = $('#pc_code'); var x = pc.val().replace(/([^a-z0-9])(\1)+/gi, '$1'); pc.val(x)

				//-- auto detect the cdkey string & the (may be) included soft-folder.
				//-- check if 16 characters are consecutive w'out any delimiter (1234567890abcdef)
				var M = x.match(/(^|[^a-z0-9])[a-f0-9]{16}($|[^a-z0-9])/gi)
				if (M) {
					var pcCode = M[0].replace(/(^[^a-z0-9])|([^a-z0-9]$)/gi, '').toUpperCase()
					var pArr = pcCode.split(''); pArr.splice(4, 0, '-'); pArr.splice(9, 0, '-'); pArr.splice(14, 0, '-');
					pc.val(pArr.join(''));
				} else { //-- check if we got a modern PC-Code which has soft_folder at the start. (G123-1234-5678-90ab-cdef)
					var M = x.match(/(^|[^a-z0-9])G\d+([^a-z0-9])([a-f0-9]{4}\2){3}[a-f0-9]{4}($|[^a-z0-9])/gi)
					if (M) {
						var mixedCode = M[0].replace(/(^[^a-z0-9])|([^a-z0-9]$)/gi, '')
						var t = mixedCode.search(/[^a-z0-9]/gi); var delimiter = mixedCode.substr(t, 1)
						var soft_folder = 'LUUTRU_' + mixedCode.substr(0, t).toUpperCase();
						$('#soft_folder').val(soft_folder);
						pc.val(mixedCode.substr(t + 1, 19).toUpperCase());

					} else { //-- check if we got a 4 groups of 4 chars separated by 3 delimiter (1234-5678-90ab-cdef)
						var M = x.match(/(^|[^a-z0-9])[a-f0-9]{4}([^a-z0-9])([a-f0-9]{4}\2){2}[a-f0-9]{4}($|[^a-z0-9])/gi)
						if (M) { pc.val(M[0].replace(/(^[^a-z0-9])|([^a-z0-9]$)/gi, '')) } else {
							pc.addClass('invalid_pc_code'); return
						}
					}
				}
				pc.removeClass('invalid_pc_code').val(pc.val().replace(/[^a-z0-9]/gi, '-'))
			}

			//-- increase soft_folder incase of batch cdkey
			function increaseSoftFolder() {
				var S = $('#soft_folder'), p = S.val().toUpperCase().replace('LUUTRU_G', '');
				var n = p == '' ? 0 : parseInt(p, 10); S.val('LUUTRU_G' + (n + 1))
			}

		</script>
		<!-- // ###################### MODERN LICENSE GEN ######################## -->


		<style>
			body {
				margin: 0;
				padding: 0;
			}

			button {
				display: block;
				float: left;
				font-weight: bold;
				font: 11px tahoma;
			}

			div {
				font: 11px Tahoma;
			}

			input[type="text"] {
				color: #36c;
				text-align: center;
				border: 1px solid #36c;
				background: #ffc;
			}

			input {
				width: 300px;
				height: 30px;
				font: 13px Arial;
				font-weight: bold;
				margin-top: 10px;
			}

			textarea {
				margin-top: 10px;
				width: 300px;
				height: 100px;
				padding: 10px;
				font: 13px Arial;
				font-weight: bold;
				color: #36c;
				border: 1px solid #36c;
				background: #ffc;
			}

			hr {
				width: 300px;
			}

			ul.ui-autocomplete>li {
				background: #36c;
				opacity: 0.94;
				border-bottom: 1px solid #fff;
				color: #fff;
				font: 12px tahoma;
				font-weight: bold;
				padding: 4px;
			}

			/* for more styling, change the file /jquery-ui.css in the part for "ui-state-focus" */
			input.invalid_pc_code {
				box-shadow: 0px 0px 5px #c00;
				background: #FFE8FA;
			}
		</style>
	</head>


	<body>
		<!-- <b style="font-size:6px;"> 9464-760F-62FA-DFD4 </b> <br> -->
		<b style="font-size:12px;"> 9e6c f7a9 a393 1e14 </b> <br>

		<!-- //////// STATUS OF STORAGE SUPPORT & INTERNET //////// -->
		<style>
			#status>button {
				display: none;
				border: 0px;
				position: absolute;
				top: 0;
				left: 0;
				color: #fff;
				width: 120px;
				height: 20px;
				line-height: 20px;
			}
		</style>
		<div id="status" style="position:absolute; top:0; left:0">
			<button id="noStageSupport" style="background:#666; left:120px;"> No webStorage </button>
			<button id="noInternet" style="background:#000;"> OFFLINE </button>
			<button id="justUpdated" style="background:green;"> JUST UPDATED ! </button>
		</div>

		<!-- //////// STATUS OF STORAGE SUPPORT & INTERNET //////// -->



		<!-- //////// THE MAIN FORM //////// -->
		<div style="width:300px; overflow:visible; margin-left:30px; margin-top:20px;">
			<h1> KEY GENERATOR </h1>

			<b> CLIENT/SOFT_EDITION FIND &nbsp; |
				<span onclick="$('#soft_edition').val('')"
					style="text-decoration:underline; color:#c00; cursor:pointer;">Clear</span>
			</b><br>
			<textarea id="soft_edition" style="height:55px; padding:4px; overflow:hidden;"></textarea><br><br>

			<b> SOFT_FOLDER </b><br>
			<input type="text" id="soft_folder" value="LUUTRU_G" style="width:250px;" />
			<input onclick="increaseSoftFolder()" type="button" style="width:40px; color:green;" value="&#8657;" />
			<br><br>

			<b> PC CODE |
				<span onclick="$('#pc_code').val('')"
					style="text-decoration:underline; color:#c00; cursor:pointer;">Clear</span>
			</b><br>
			<input type="text" id="pc_code" style="width:250px;" />
			<input onclick="handlePCCode()" type="button" style="width:40px; color:green;" value="&#10003" /> <br><br>

			<input value="Send SMS" onclick="sendSMS();" type="button" style="width:120px; float:left;">
			<input value="Gen CDKey Only" id="genkey" onclick="genKey()" type="button"
				style="width:170px; float:left; margin-left:10px;">
			<br>

			<br><br><br><br>

			<b> CDKey | <span onclick="$('#cd_key').val('')"
					style="text-decoration:underline; color:#c00; cursor:pointer;">Clear</span> </b><br>
			<textarea id="cd_key"> </textarea> <br>

			<input value="Gen batch-CDKey" onclick="batchCDKey()" type="button"
				style="width:140px; margin-top:10px; margin-bottom:10px;">

			<br>
			<hr>
			<hr><br>

			<button onclick="$('#updateForm').show()">Update softEdition List</button>

		</div>
		<!-- //////// THE MAIN FORM //////// -->




		<!-- //////// UPDATE FORM ////////// -->
		<script>
			function softSummit_CallBack() { $('#u_status').show().fadeOut(2000); }
			function updateSoftList() {
				if (!confirm("Are you sure?")) { return }
				var newSoft = {
					soft_folder: $('#u_soft_folder').val(),
					customer_name: $('#u_customer_name').val(),
					release_date: $('#u_release_date').val(),
					version: $('#u_version').val()
				}
				var data = JSON.stringify(newSoft);
				data = encodeURIComponent(data);
				data = data.replace(/\%/g, '_percent_');
				var myUrl = "https://luutruhoanggia.com/dClientList/Index.asp?mode=updateSoftList&data=" + data
				$.ajax({ url: myUrl, dataType: 'jsonp' })
			}
		</script>
		<style>
			sup {
				color: #c00;
			}
		</style>

		<div id="updateForm"
			style="position:absolute; top:0; left:0; left z-index:100; width:100%; height:100%; background:#fff; display:none;">
			<div style="width:300px; overflow:visible; margin-left:30px; margin-top:20px;">
				<h1> UPDATE SOFTLIST <span id="u_status"
						style="display:none; font:11px tahoma; background:green; color:#fff;"> Summitted! </span> </h1>

				<b> CUSTOMER NAME <sup>(*)</sup> (eg: P.TNMT huyện A) </b><br>
				<input type="text" id="u_customer_name" value="" /><br><br>

				<b> SOFT_EDITION <sup>(*)</sup> (eg: LUUTRU_G345) </b><br>
				<input type="text" id="u_soft_folder" value="LUUTRU_G" /><br><br>

				<b> RELEASE DATE (eg: 20/2/2020) </b><br>
				<input type="text" id="u_release_date" /><br><br>

				<b> VERSION (eg: V6.8)</b><br>
				<input type="text" id="u_version" /><br><br><br>

				<input type="button" id="u_submit" onclick="updateSoftList()" value="Submit to server"><br>

				<br>
				<hr>
				<hr><br>
				<button onclick="$('#updateForm').hide()">Return to keyGenerator</button>
			</div>
		</div>
		<!-- //////// UPDATE FORM ////////// -->




		<!-- load data via external js to avoid $.get's error of cross-domain-XMLHTTPRequest 
			we put it at the end of page to prevent the slow internet make the whole page stay "loading.." -->
		<script src="https://luutruhoanggia.com/dClientList/Index.asp?mode=jsAPI"></script>


	</body>

	</html>
	<%end if%>