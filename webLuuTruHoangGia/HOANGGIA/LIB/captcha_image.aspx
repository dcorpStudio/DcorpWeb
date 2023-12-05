<%@ Page ContentType = "image/gif"%>
<%@ Import Namespace = "System.Drawing" %>
<%@ Import Namespace = "System.Drawing.Imaging" %>
<%@ Import Namespace = "System.Security.Cryptography" %>

<Script Runat = "Server" language="C#">

public string MD5Encode(string originalPassword)
{
  //Declarations
  Byte[] originalBytes;
  Byte[] encodedBytes;
  MD5 md5;

  md5 = new MD5CryptoServiceProvider();
  originalBytes = ASCIIEncoding.Default.GetBytes(originalPassword);
  encodedBytes = md5.ComputeHash(originalBytes);

  //Convert encoded bytes back to a 'readable' string
  return BitConverter.ToString(encodedBytes).Replace("-","").ToLower();
}


//----------------The function to convert the code requested to
//----------------a new code, the code is use to displayed in the captcha image

public string Code_2_Captcha(string Code, string Task)
{
	Code = MD5Encode( Code.ToLower() );
	Task = MD5Encode( Task.ToLower() );
	Code = Code.Substring(1,2) + Code.Substring(5,2) + Code.Substring(12,3);
	return MD5Encode( Code + Task );
}


protected void Page_Load(object sender, System.EventArgs e) {

		//-----The number of character to be display in captcha Image
		int captcha_length = 4;

		int WIDTH = 123;
		int HEIGHT = 23;
		string code = Convert.ToString(Request.QueryString["code"]);
		string task = Convert.ToString(Request.QueryString["task"]);

		if ( code == null || task == null){
			code = "a";
			task = "a";
		}

		string captcha = Code_2_Captcha( code, task );
		captcha = captcha.Substring(0, captcha_length).ToLower();

        using (Bitmap b = new Bitmap(WIDTH,HEIGHT)) {

            Font f = new Font("Verdana", 13F);
            Graphics g = Graphics.FromImage(b);

            SolidBrush whiteBrush = new SolidBrush(ColorTranslator.FromHtml("#007B91"));
            SolidBrush blackBrush = new SolidBrush(Color.White);

            RectangleF canvas = new RectangleF( 0 , 0, WIDTH,HEIGHT);
            g.FillRectangle(whiteBrush, canvas);

            RectangleF canvas1 = new RectangleF( 10 , 2, WIDTH,HEIGHT);
            g.DrawString( captcha , f, blackBrush, canvas1);

            Response.ContentType = "image/gif";
            b.Save(Response.OutputStream, ImageFormat.Gif);
        }
    }

</Script>




