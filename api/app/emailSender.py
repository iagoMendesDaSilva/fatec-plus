import shutil
import smtplib
import os, datetime
from email import encoders
from reportlab.pdfgen import canvas
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
 

class Email:
    def __init__(self):
        self.path = str(os.getcwd())+"/"
        self.sender = os.getenv("FATEC_PLUS_EMAIL")
        self.password = os.getenv("FATEC_PLUS_PASSWORD")
    
    def send_recovery(self, user, code):
        path = self.path+'src/html/recovery.html'
        path_temp = self.path+'src/html/recovery_'+str(user.id)+'.html'
        shutil.copyfile(path, path_temp)
        self.change_HTML(user.name, str(code), path_temp)
        msg = self.create_msg("Recuperação de senha", user.email)
        with open(path_temp, 'r') as file:
            html = file.read()
        file.close()
        msg.attach(MIMEText(html, 'html'))
        self.send(msg)
        os.remove(path_temp)

    def change_HTML(self, name, code, path):
        with open(path, 'r') as file :
            filedata = file.read()
            filedata = filedata.replace("$name", name)
            filedata = filedata.replace("$code",  code)
            filedata = filedata.replace("$email", self.sender)
        file.close()
        with open(path, 'w') as file:
            file.write(filedata)
        file.close()

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
        age = str(datetime.date.today().year - user.birth_date.year)
        resume = canvas.Canvas(self.path+"src/resumes/"+str(user.id)+".pdf", bottomup=0, )
        resume.setFont("Helvetica-Bold", 28)
        resume.drawString(50,100, user.name)
        resume.line(50,110,500,110)
        resume.setFont("Helvetica", 16)
        resume.drawString(50,150, "Idade: "+age+" anos")
        resume.drawString(50,180, "Email: "+user.email)
        resume.drawString(50,210, "Telefone: "+user.phone)
        resume.drawString(50,240, "Endereço: R. "+user.road+", "+user.number_address)
        resume.drawString(50,270, "Cidade: "+user.city+"-"+user.state)
        location_text = 270

        if(user.description != None):
            resume.setFont("Helvetica-Bold", 16)
            resume.drawString(50,320, "Descrição")
            resume.setFont("Helvetica", 16)
            location_text = 350 
            text: user.description
            for x in range(1 , int(len(text)/60)):
                location_text += 30
                resume.drawString(50,location_text,text[x*60 - 60:x*60])

        if(len(user.experiences)>0):
            location_text += 50
            resume.setFont("Helvetica-Bold", 16)
            resume.drawString(50,location_text, "Experiências")
            for experience in user.experiences:
                start = experience.start_year.strftime("%d/%m/%Y")
                time = "Desde "+ start
                if(experience.end_year != None):
                    end =experience.end_year.strftime("%d/%m/%Y")
                    time = start+" até "+end
                text = "• " + experience.job+" | "+experience.company+" | "+time
                for x in range(1 , int(len(text)/60)):
                    location_text += 30
                    resume.drawString(50,location_text,text[x*60 - 60:x*60])

        if(len(user.formations)>0):
            location_text += 50
            resume.setFont("Helvetica-Bold", 16)
            resume.drawString(50,location_text, "Formações")
            for formation in user.formations:
                start = formation.start_year.strftime("%d/%m/%Y")
                time = "Desde "+ start
                text = None
                if(formation.end_year != None):
                    end =formation.end_year.strftime("%d/%m/%Y")
                    time = start+" até "+end
                    text ="• " + formation.title+" - "+formation.subtitle+" | "+time
                if formation.workload != None:
                    text += " | "+formation.workload.strftime("%H")+"h"
                resume.setFont("Helvetica", 16)
                for x in range(1 , int(len(text)/60)):
                    location_text += 30
                    resume.drawString(50,location_text,text[x*60 - 60:x*60])

        if(len(user.languages)>0):
            location_text += 50
            resume.setFont("Helvetica-Bold", 16)
            resume.drawString(50,location_text, "Idiomas")
            for language in user.languages:
                resume.setFont("Helvetica", 16)
                text = "• " + language.language+" | "+language.level
                for x in range(1 , int(len(text)/60)):
                    location_text += 30
                    resume.drawString(50,location_text,text[x*60 - 60:x*60])

        resume.save()

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