new =  New(title="title", message="message", versionApp="1.1.1",type="type")
notification =  Notification(title="title", message="message")

user =  User(name="name",username="username",password="password",email="email",phone="phone",address=None,birthDate=None,studying=None,job=False,internship=False,occupation_area=None,description=None,category="category",image=None,token=None,recovery=None,recoveryTime=None,versionApp=None,onesignal_playerID=None)

job =  Job(name="name", date=None,job=False,internship=True,active=True,category="category",receiveByEmail=True,description=None,id_company=1,id_job=1)

project =  Project(name="name", url="url",description=None,id_user=1)
course =  Course(name="name", duration=3,id_internship_coordinator=1)
experience =  Experience(job="experience", company="company",startYear="2018-06-01", endYear=None, id_user=1)
formation =  Formation(title="title", subtitle="subtitle",startYear="2018-06-01", endYear=None, workload="12:00:00", id_user=1)
language =  Language(language="language", level="medium", id_user=1)
socialNetwork =  SocialNetwork(name="name", url="url", id_user=1)

requirement =  Requirement(name="name",level="medium",mandatory=True,description=None,id_job=1)
benefit =  Benefit(name="name",description=None,id_job=1)