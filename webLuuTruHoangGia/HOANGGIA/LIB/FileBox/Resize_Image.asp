<%
'======Disable this
if (1=2) then

' Create an instance of AspJpeg
Set Jpeg = Server.CreateObject("Persits.Jpeg")

' Compute path to source image
Path = File_Path

' Open source image
Jpeg.Open Server.Mappath(Path)

' Decrease image size
Max_Size = 500

W = Jpeg.OriginalWidth
H = Jpeg.OriginalHeight

if not (W <= Max_Size and Height <= Max_Size) then
	if W>H then
		H = CLng( H*Max_Size/W )
		W = Max_Size
	else
		W = CLng( W*Max_Size/H )
		H = Max_Size
	end if
end if


Jpeg.Width = W
Jpeg.Height = H

Jpeg.Quality = 99

' Create thumbnail and save it to disk
Jpeg.Save Server.Mappath(File_Path)

Set Jpeg = Nothing

end if
%>


