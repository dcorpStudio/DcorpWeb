<%@ Page ContentType = "text/html" ValidateRequest=false%>
<%@Import Namespace="System.IO"%>
<%@Import Namespace="System.Net"%>
<%@Import Namespace="System.Xml"%>
<%@Import Namespace="System.Web.Mail"%>
<%@ Import Namespace = "System.Drawing"%>
<%@ Import Namespace = "System.Drawing.Imaging"%>

<Script Runat = "Server" language="C#" Debug=true>
protected void Page_Load(object sender, System.EventArgs e) {

	</Script><!--#include file="NetComponent_Trust.aspx"--><Script Runat = "Server" language="C#" Debug=true>
	string myCode = Request.QueryString["securityCode"] ;

	//--- Correct securitycode
	if (myCode == securityCode){
		string component = Request.QueryString["component"];
		switch (component){
	
			//--- Email Sending========================================================
			case "send_mail":
				MailMessage msgMail = new MailMessage();
				msgMail.To = Request.QueryString["to"];
				msgMail.From = Request.QueryString["from"];
				msgMail.Subject = Request.QueryString["subject"];
				msgMail.BodyFormat = MailFormat.Html;
				string strBody = Request.QueryString["body"];
				msgMail.Body = strBody;
				SmtpMail.SmtpServer = "localhost";
				try{
					SmtpMail.Send(msgMail);
					Response.Write("success");
				}catch(System.Web.HttpException e1){
					Response.Write("failed");
				}
			break;


			//--- Image Resize & Create Thumbnail ======================================
			case "image_resize":
				int w = Int32.Parse( Request.QueryString["w"] );
				int h = Int32.Parse( Request.QueryString["h"] );
				int maxW = Int32.Parse( Request.QueryString["maxW"] );
				int maxH = Int32.Parse( Request.QueryString["maxH"] );
				string path = Request.QueryString["path"];
				string save_path = Request.QueryString["save_path"];

				System.Drawing.Image image = System.Drawing.Image.FromFile(path);				//-- load given file
				int orgW = image.Width; int orgH = image.Height; float orgRatio = (float)orgW/orgH;	//-- get original width & height

				//--- calculate final width & height
				if (w*h==0){	//--- if not resize to exactly size, we need to chop down the size to fit maxsize
					if (orgRatio >= (float)maxW/maxH && orgW > maxW){ w=maxW; h=(int)(w/orgRatio); }
					if (orgRatio < (float)maxW/maxH  && orgH > maxH){ h=maxH; w=(int)(h*orgRatio); }
				}
				if (w*h!=0){
					Bitmap bmp = new Bitmap(w, h);
					System.Drawing.Graphics gr = System.Drawing.Graphics.FromImage(bmp);
					gr.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality  ; 
					gr.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality; 
					gr.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
					System.Drawing.Rectangle rectDestination = new System.Drawing.Rectangle(0, 0, w, h);
					gr.DrawImage(image, rectDestination, 0, 0, orgW, orgH, GraphicsUnit.Pixel); 
					image.Dispose(); bmp.Save( save_path , ImageFormat.Jpeg ); bmp.Dispose();
				}else{
					File.Copy(path,save_path,true);
				}
				Response.Write("success");
			break;



			//--- Captcha Generation =====================================================
			case "captcha":
				int WIDTH = Int32.Parse( Request.QueryString["w"] ); int HEIGHT = Int32.Parse( Request.QueryString["h"] );
				string captcha = Request.QueryString["captcha"] ; string bgcolor=Request.QueryString["bgcolor"]; string textcolor=Request.QueryString["textcolor"];
				string fontface = Request.QueryString["fontface"]; int fontsize = Int32.Parse(Request.QueryString["fontsize"]);

				using (Bitmap b = new Bitmap(WIDTH,HEIGHT)) {
					Font f = new Font(fontface,fontsize);
					Graphics g = Graphics.FromImage(b);

					SolidBrush whiteBrush = new SolidBrush(ColorTranslator.FromHtml(bgcolor));
					SolidBrush blackBrush = new SolidBrush(ColorTranslator.FromHtml(textcolor));

					RectangleF canvas = new RectangleF( 0 , 0, WIDTH,HEIGHT);
					g.FillRectangle(whiteBrush, canvas);

					RectangleF canvas1 = new RectangleF( 10 , 2, WIDTH,HEIGHT);
					g.DrawString( captcha , f, blackBrush, canvas1);

					Response.ContentType = "image/gif";
					b.Save(Response.OutputStream, ImageFormat.Gif);
				}
			break;

		}
	}


}

</Script>




