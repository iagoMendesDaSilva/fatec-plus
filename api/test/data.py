from models.job import *
from models.new import *
from models.user import *
from models.course import *
from models.benefit import *
from models.project import *
from models.language import *
from models.formation import *
from models.notification import *
from models.experience import *
from models.subscription import *
from models.requirement import *
from models.socialNetwork import *
from app.applications import database, serializer, app
database.create_all()

aluno = User(token=None,image=None,city=None,birth_date=None,road=None,recovery=None,phone=None,district=None,studying=None,version_app=None,description=None,recovery_time=None,number_address=None,job=False,name="iago",internship=False,password="123",onesignal_playerID=None,email="iago_m@.com",username="iago123")

professor = User(token=None,image=None,city=None,birth_date=None,road=None,recovery=None,phone=None,district=None,studying=None,version_app=None,description=None,recovery_time=None,number_address=None,job=False,name="iagso",internship=False,password="123",onesignal_playerID=None,email="iago_m@.com45",username="iago12345")

empresa = User(token=None,image=None,city=None,birth_date=None,road=None,recovery=None,phone=None,district=None,studying=None,version_app=None,description=None,recovery_time=None,number_address=None,job=False,name="iag5o",internship=False,password="123",onesignal_playerID=None,email="iago_m@.com5",username="iago1235")

job = Job(date=None,description=None,job=False,active=False,name="trabalho",internship=False,receive_by_email=True, companies=empresa)

project = Project(url=None,description=None,name='projeto',projects=aluno)

project_teacher = Project(url=None,description=None,name='projeto',projects=professor)

sub = Subscription(subscriptions=aluno, vacancies=job, indications=professor)

database.session.add(aluno)
database.session.add(professor)
database.session.add(empresa)
database.session.add(job)
database.session.add(project)
database.session.add(project_teacher)
database.session.add(sub)
database.session.commit()

inscricao = Subscription.query.filter_by(id=1).first()
print(inscricao.subscriptions.name)
print(inscricao.vacancies.name)
print(inscricao.indications.name)
print(inscricao.vacancies.companies.name)