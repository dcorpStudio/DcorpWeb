<script language="VBScript" runat="server">

'----Ham` tra ve` cac ki tu Chr() trong VB
function VBLineBreak(x)
	Dim i
	for i=0 to x
		VBLineBreak = VBLineBreak & chr(13) & chr(10) & " "
	next
end function


'----Ham` tra ve` thoi gian day du hien tai duoi dang : mode = 0|false|''|undefined|null --->  dd/mm/yyyy hh:nn:ss
'----mode = 1|true|... ---->  mm/dd/yyyy hh:nn:ss
'----D la thoi` gian cho truoc (neu co)

function VBFullTime(mode,D)
	if not isDate(D) then
		D=Now()
	end if
	if mode=1 then
		VBFullTime = Month(D) & "/" & Day(D) & "/" & Year(D) & " " & Hour(D) & ":" & Minute(D) & ":" & Second(D)
	else
		VBFullTime = Day(D) & "/" & Month(D) & "/" & Year(D) & " " & Hour(D) & ":" & Minute(D) & ":" & Second(D)
	end if
end function


	'----Ham` lay IP cua may kahch hang`
	function ClientIP()
		client_IP = Request.ServerVariables("HTTP_X_FORWARDED_FOR")
		If client_IP="" Then client_IP = Request.ServerVariables("REMOTE_ADDR")  end if
		ClientIP = Client_IP
	end function


	'----Ham` tao Captcha, yeu cau` co ASPJPEG.
	'Parameter l (L) is the length of needed captchar string
	Function Captcha(l, Session_Name)
		if Session_Name="" then Session_Name="captcha_code"
		Dim a(), b(), c, d, e, g, n
		g="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z"
		d=Split(g,",")
		Redim a(l-1) : Redim b(l-1) : c=0 : Randomize
		Do Until c=l : n=Int(Rnd*Ubound(d)) : b(c)=n : a(c)=d(n) : c=c+1 : Loop
		e=Join(a,"") : Session(Session_Name)=e

		'----Prepare binary file for Jpeg to open
		Dim S, MultiByte, S_Arr
		S = "71.73.70.56.57.97.10.0.10.0.128.0.0.255.255.255.0.0.0.33.249.4.1.0.0.0.0.44.0.0.0.0.10.0.10.0.0.2.8.132.143.169.203.237.15.99.43.0.59"
		S_Arr = Split(S,".")
	    For i=0 To Ubound(S_Arr, 1)
	       MultiByte = MultiByte & ChrB(S_Arr(i))
	    Next

		Set Jpeg = Server.CreateObject("Persits.Jpeg")
		Jpeg.OpenBinary(MultiByte)

		Jpeg.Width = Int(l*30 + 40)
		Jpeg.Height = 40
		Jpeg.Canvas.Font.Color = &Hff6600
		Jpeg.Canvas.Font.Family = "verdana"
		Jpeg.Canvas.Font.Size = 40
		Jpeg.Canvas.Font.Bold = true
		Jpeg.Canvas.Pen.Color = &H000000
		Jpeg.Canvas.Pen.Width = 0
		Jpeg.Canvas.Brush.Solid = false
		Jpeg.Canvas.Font.Quality = 0

		Start_Angle = 10 : x=5 :  y=5
		For i=1 to Len(e)
			Jpeg.Canvas.Font.Rotation = Start_Angle
			Start_Angle = Start_Angle + 10
			Jpeg.Canvas.PrintText x, y , Mid(e, i, 1)
			x=x+30
		Next
		Jpeg.SendBinary
		Set Jpeg = Nothing
	End Function


	'--------------Ham` gui Mail
	function Send_Mail(FromEmail, ToEmail, CCEmail, Title, Body)
		Dim  myMail, Confi
		if Title = "" then Title = "Email g&#7917;i t&#7915; website"
		if FromEmail = "" then FromEmail = Global_Var("Default_Email")
		if ToEmail = "" then ToEmail = Global_Var("Admin_Email")
		if CCEmail = "" then CCEmail = Global_Var("Admin_CC_Email")

		Set myMail=CreateObject("CDO.Message")

			Set objConfig = Server.CreateObject("CDO.Configuration")
			Set Confi = objConfig.Fields
			Confi("http://schemas.microsoft.com/cdo/configuration/sendusing") = 1
			Confi("http://schemas.microsoft.com/cdo/configuration/smtpserverpickupdirectory") = "C:\inetpub\mailroot\pickup"
			Confi.Update
			Set myMail.Configuration = objConfig

		myMail.Subject = Title
		myMail.From = FromEmail

		myMail.To = ToEmail
		if CCEMail <> "" then
			myMail.cc = CCEmail
		end if

		myMail.HTMLBody = Body

'		Response.Write myMail.HTMLBody

		myMail.Send
		set myMail=nothing
	end function


	'-------------Ham` tra ve` 1 VBString danh` cho viec luu cac String vao` Session
	function VBString(Str)
		VBString = Str
	end function

	'--------------Ham` Trim dung cho JScript
	function VBTrim(Str)
		if Str <> "" then
			VBTrim = Trim(Str)
		else
			VBTrim = ""
		end if
	end function

	'--------------Ham` tra ve` ngay thang (Now) trong VB
	function VBNow()
		VBNow = CStr(Now())
	end function

	'--------------Ham` ghi Cookie len may' khach. Tham so' thoi` gian tinh' bang` phut
	function VBCookie( CName , CVal , AddTime )
		Response.Cookies(CName) = CVal
		Response.Cookies(CName).Expires = DateAdd( "n" , AddTime , Now() )
	end function


	'--------------Ham` format_USD
	function VBFormat_USD(a)
		VBFormat_USD = FormatNumber(a , 2)
	end function

	'--------------Ham` format_number
	function VBFormat_Money(a)
		a = Replace(a,".","")
		a = Replace(a,",","")
		a = Replace(a," ","")
		if isNumeric(a) then
			VBFormat_Money = FormatNumber(a , 0)
		else
			VBFormat_Money = a
		end if
	end function

	'-----ham` tra ve` Request de kiem tra trong JScript
	function VBRequest(x)
		if (Request(x)<>"") then
			VBRequest = Request(x)
		else
			VBRequest = ""
		end if
	end function

	'-------ham` tra ve` 1 chuoi` VB rong~
	function VBNull()
		VBNull = ""
	end function

	'-----ham` tra ve` Session trong VBScript de kiem tra voi' JScript (Neu' la' truc tiep tu` JScript thi` ko the kiem tra)
	function VBSession(x)
		VBSession = Session(x)
	end function

	'-----Ham` tra ve` cac gia tri Request Server Variable
	function VBRefer()
		VBRefer = Request.ServerVariables("HTTP_REFERER")
	end function

	'-----Ham` tra ve` cac gia tri Request Server Variable
	function VBQuery()
		VBQuery = Request.ServerVariables("QUERY_STRING")
	end function

	'----Ham` tra ve` ngay thang lay tu` CSDL (tra ve dang dd/mm/yy)
	function VBDate(A)
		if isDate(A) then
			VBDate = Day(A) & "/" & Month(A) & "/" & Year(A)
		end if
	end function

	'----Ham` tra ve` ngay thang theo kieu Anh lay tu` CSDL (tra ve dang mm/dd/yy)
	function VBEDate(A)
		if isDate(A) then
			VBEDate = Month(A) & "/" & Day(A) & "/" & Year(A)
		end if
	end function


	'----Ham` DateAdd
	function VBDateAdd(A,B,C)
		VBDateAdd = DateAdd(A,B,C)
	end function


	'----Ham` tra ve` thoi gian lay tu` CSDL
	function VBTime(A)
		if isDate(A) then
			VBTime = Hour(A) & "h" & Minute(A) & "' " & Day(A) & "/" & Month(A) & "/" & Year(A)
		end if
	end function

	function isDateTime(A)
		if isDate(A) then
			isDateTime = true
		else
			isDateTime = false
		end if
	end function
</script>



