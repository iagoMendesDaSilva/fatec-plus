import os
import smtplib
from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
 

class Email:
    def __init__(self):
        self.name = "$name"
        self.code = "$code"
    
    def change_HTML(self, name, code, html_file):
        with open(html_file, 'r') as file :
            filedata = file.read()
            filedata = filedata.replace(self.name, name)
            filedata = filedata.replace(self.code,  code)
        file.close()

        with open(html_file, 'w') as file:
            file.write(filedata)
        file.close()
        self.name=name
        self.code=code

    def send(self, msg,password):
        server = smtplib.SMTP('smtp.gmail.com: 587')
        server.starttls()
        server.login(msg['From'], password)
        server.sendmail(msg['From'], msg['To'], msg.as_string())
        server.quit()

    def send_recovery(self, receiver, name, code):
        self.change_HTML(name, code, 'recovery.html')
        msg = MIMEMultipart()
        msg['To'] = receiver
        msg['Subject'] = "Recovery Password"
        msg['From'] = os.getenv("FATEC_PLUS_EMAIL")
        password = os.getenv("FATEC_PLUS_PASSWORD")
        with open('recovery.html', 'r') as file:
            html = file.read()
        file.close()
        msg.attach(MIMEText(html, 'html'))
        self.send(msg,password)


emailSender = Email()



# doc
#             part = MIMEBase('application', "octet-stream")
#             part.set_payload(open("pdfTest.doc", "rb").read())
#             encoders.encode_base64(part)
#             part.add_header('Content-Disposition', 'attachment; filename="pdfTest.doc"')
#             msg.attach(part)


