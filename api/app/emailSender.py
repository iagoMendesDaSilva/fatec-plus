import smtplib
import os, datetime
from email import encoders
from reportlab.pdfgen import canvas
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
 

class Email:
    def __init__(self):
        self.location_text=0
        self.path = str(os.getcwd())+"/"
        self.sender = os.getenv("FATEC_PLUS_EMAIL")
        self.password = os.getenv("FATEC_PLUS_PASSWORD")
    
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

    def send(self, msg):
            server = smtplib.SMTP('smtp.gmail.com: 587')
            server.starttls()
            server.login(msg['From'], self.password)
            server.sendmail(msg['From'], msg['To'], msg.as_string())
            server.quit()


    def create_msg(self, subject,receiver ):
        msg = MIMEMultipart()
        msg['To'] = receiver
        msg['Subject'] = subject
        msg['From'] = self.sender
        return msg

    def create_resume(self, user ):
        self.lines=0
        age = str(datetime.date.today().year - user.birth_date.year)
        resume = canvas.Canvas(self.path+"src/resumes/"+str(user.id)+".pdf", bottomup=0, )
        resume.setFont("Helvetica-Bold", 28)
        resume.drawString(50,100, user.name)
        resume.line(50,110,500,110)

        self.location_text = 110
        self.add_text(resume,"Idade: "+age+" anos")
        self.add_text(resume, "Email: "+user.email)
        self.add_text(resume, "Telefone: "+user.phone)
        self.add_text(resume, "Endereço: "+user.address)

        if user.description:
            self.add_topic(resume, "Descrição")
            self.add_text(resume, user.description)

        if(len(user.experiences)>0):
            self.add_topic(resume, "Experiências")

            for experience in user.experiences:
                time = self.format_time(experience.start_year, experience.end_year)
                text = "• " + experience.job+" | "+experience.company+" | "+time
                self.add_text(resume, text)

        if(len(user.formations)>0):
            self.add_topic(resume, "Formações")

            for formation in user.formations:
                time = self.format_time(formation.start_year, formation.end_year)
                text ="• " + formation.title
                if formation.subtitle:
                    text +=" - "+formation.subtitle
                text+= " | "+time
                if formation.workload:
                    text += " | "+formation.workload+"h"
                self.add_text(resume, text)

        if(len(user.languages)>0):
            self.add_topic(resume, "Idiomas")
            for language in user.languages:
                text = "• " + language.language+" | "+language.level
                self.add_text(resume, text)

        resume.save()

    def add_text(self, file, text):
        self.verify_page(file)
        file.setFont("Helvetica", 16)
        file.drawString(50, self.location_text, "") 
        text_len = int(len(text)/60)
        if text_len and len(text)!=60:
            for index in range (0, text_len+1):
                self.location_text+=30
                file.drawString(50, self.location_text,text[index*60:(index+1)*60])
        else:
            self.location_text+=40
            file.drawString(50, self.location_text,text)


    def add_topic(self, file, topic):
        self.verify_page(file)
        self.location_text += 15
        file.setFont("Helvetica-Bold", 16)
        file.drawString(50, self.location_text, "") 
        self.location_text += 15
        file.drawString(50, self.location_text, "") 
        self.location_text += 15
        file.drawString(50,self.location_text, topic)

    def verify_page(self, file):
        if self.location_text >= 800:
            file.showPage()
            self.location_text =0

    def format_time(self, start_date, end_date=None):
        start =start_date.strftime("%d/%m/%Y")
        time = "Desde "+ start
        if end_date:
            end =end_date.strftime("%d/%m/%Y")
            time = start+" até "+end
        return time

    def send_resume(self, user, job):
            self.create_resume(user)
            filename = str(user.id)+".pdf"
            msg = self.create_msg(job.subject_email, job.jobs.email)
            text = MIMEText(self.get_text_resume(user, job))
            part = MIMEBase('application', "octet-stream")
            part.set_payload(open(self.path+"src/resumes/"+filename, "rb").read())
            encoders.encode_base64(part)
            part.add_header(f'Content-Disposition', 'attachment; filename=' +user.name+'_Curriculo.pdf')
            msg.attach(part)
            msg.attach(text)
            self.send(msg)
            os.remove(self.path+"src/resumes/"+filename)

    def get_text_resume(self, user, job):
        return "Olá.\n"+user.name+" se inscreveu na vaga " +job.name+". Para mais informações acesse o aplicativo Fatec +.\n\nEste é um e-mail automático. Por favor, não responda este e-mail."

emailSender = Email()