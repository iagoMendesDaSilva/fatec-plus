import os
import smtplib
from email import encoders
from app.resume import resume
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
 

class Email:
    def __init__(self):
        self.path = str(os.getcwd())+"/"
        self.sender = os.getenv("FATEC_PLUS_EMAIL")
        self.password = os.getenv("FATEC_PLUS_PASSWORD")

    def create_msg(self, subject,receiver ):
        msg = MIMEMultipart()
        msg['To'] = receiver
        msg['Subject'] = subject
        msg['From'] = self.sender
        return msg

    def send(self, msg):
            server = smtplib.SMTP('smtp.gmail.com: 587')
            server.starttls()
            server.login(msg['From'], self.password)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()
    
    def send_recovery(self, user, code):
        path = self.path+'src/html/recovery.html'
        html = self.change_HTML(user.name, str(code), path)
        msg = self.create_msg("Recuperação de senha", user.email)
        msg.attach(MIMEText(html, 'html'))
        self.send(msg)

    def change_HTML(self, name, code, path):
        with open(path, 'r') as file :
            filedata = file.read()
            filedata = filedata.replace("username", name)
            filedata = filedata.replace("email", self.sender)
            filedata = filedata.replace("verification_code",  code)
        return filedata

    def send_resume(self, user, job):
            resume.create_resume(user)
            filename = str(user.id)+".pdf"
            msg = self.create_msg(job.subject_email, job.jobs.email)
            text = MIMEText("Olá.\n"+user.name+" se inscreveu na vaga " +job.name+". Para mais informações acesse o aplicativo Fatec +.\n\nEste é um e-mail automático. Por favor, não responda este e-mail.")
            part = MIMEBase('application', "octet-stream")
            part.set_payload(open(self.path+"src/resumes/"+filename, "rb").read())
            encoders.encode_base64(part)
            part.add_header(f'Content-Disposition', 'attachment; filename=' +user.name+'_Curriculo.pdf')
            msg.attach(part)
            msg.attach(text)
            self.send(msg)
            os.remove(self.path+"src/resumes/"+filename)

emailSender = Email()