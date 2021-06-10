import smtplib
import os, datetime
from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
 

class Email:
    def __init__(self):
        self.code = "$code"
        self.name = "$name"
        self.path = str(os.getcwd())+"/"
        self.sender = os.getenv("FATEC_PLUS_EMAIL")
        self.server = smtplib.SMTP('smtp.gmail.com: 587')
        self.password = os.getenv("FATEC_PLUS_PASSWORD")
    
    def change_HTML(self, name, code, path):
        with open(path, 'r') as file :
            filedata = file.read()
            filedata = filedata.replace(self.name, name)
            filedata = filedata.replace(self.code,  code)
        file.close()

        with open(path, 'w') as file:
            file.write(filedata)
        file.close()
        self.name=name
        self.code=code

    def send(self, msg):
        self.server.starttls()
        self.server.login(msg['From'], self.password)
        self.server.sendmail(msg['From'], msg['To'], msg.as_string())
        self.server.quit()

    def create_msg(self, subject,receiver ):
        msg = MIMEMultipart()
        msg['To'] = receiver
        msg['Subject'] = subject
        msg['From'] = self.sender
        return msg

    def create_resume(self, user ):
        year = datetime.date.today().year
        age = str(year - user.birth_date.year)
        main_text = user.name+"\n\nIdade: "+age+" anos\nEmail: "+user.email+"\nTelefone: "+user.phone+"\nEndereço: R. "+user.road+", "+user.number_address+"\nCidade: "+user.city+"-"+user.state+"\nCursando: "+user.studying+"\n\n"

        if(user.description != None):
            main_text +="Descrição\n"+user.description+"\n\n"

        if(len(user.experiences)>0):
            main_text +="Experiências\n"
            for experience in user.experiences:
                start = experience.start_year.strftime("%d/%m/%Y")
                time = "Desde "+ start
                if(experience.end_year != None):
                    end =experience.end_year.strftime("%d/%m/%Y")
                    time = start+" até "+end
                main_text += "• " + experience.job+" | "+experience.company+" | "+time+"\n"

        if(len(user.formations)>0):
            main_text +="\nFormações\n"
            for formation in user.formations:
                start = formation.start_year.strftime("%d/%m/%Y")
                time = "Desde "+ start
                if(formation.end_year != None):
                    end =formation.end_year.strftime("%d/%m/%Y")
                    time = start+" até "+end
                main_text += "• " + formation.title+" - "+formation.subtitle+" | "+time
                if formation.workload != None:
                    main_text += " | "+formation.workload.strftime("%H")+" h"
                main_text += "\n"

        if(len(user.languages)>0):
            main_text +="\nLínguas\n"
            for language in user.languages:
                main_text += "• " + language.language+" | "+language.level+"\n"

        file = open(self.path+"src/resumes/"+str(user.id)+".doc", "w")
        file.write(main_text)
        file.close()

    def send_recovery(self, receiver, name, code):
        path = self.path+'src/html/recovery.html'
        self.change_HTML(name, code, path)
        msg = self.create_msg("Recovery Password", receiver)
        with open(path, 'r') as file:
            html = file.read()
        file.close()
        msg.attach(MIMEText(html, 'html'))
        self.send(msg)

    def send_resume(self, user, job):
        self.create_resume(user)
        filename = str(user.id)+".doc"
        msg = self.create_msg(job.subject_email, job.jobs.email)
        text = MIMEText("Olá.\n"+user.name+" se inscreveu na vaga " +job.name+". Para mais informações acesse o aplicativo Fatec +.\n\nEste é um e-mail automático. Por favor, não responda este e-mail.")
        part = MIMEBase('application', "octet-stream")
        part.set_payload(open(self.path+"src/resumes/"+filename, "rb").read())
        encoders.encode_base64(part)
        part.add_header(f'Content-Disposition', 'attachment; filename=' +user.name+'_Curriculo.doc')
        msg.attach(part)
        msg.attach(text)
        self.send(msg)
        os.remove(self.path+"src/resumes/"+filename)

emailSender = Email()