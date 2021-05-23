from modelsDao import jobDao,dao
from models import User, Job,jobs_schema,job_schema

class JobController:
    def __init__(self):
        pass

    def create(self, current_user, data):
        if  self.can_manipulate(current_user.id):
            job = Job(
            date=data['date'],
            description=data['description'],
            job=data['job'],
            active=data['active'],
            name=data['name'],
            internship=data['internship'],
            receive_by_email=data['receive_by_email'],
            company=current_user.id)
            dao.add(job)
            return True
        return False

    def get(self, id):
        return job_schema.dump(dao.get_by_id(id,Job))

    def get_all(self,limit=None,offset=None):
        return jobs_schema.dump(jobDao.get_all(limit,offset))

    def get_all_by_company(self,id,limit=None,offset=None):
        return jobs_schema.dump(jobDao.get_all_by_company(id,limit,offset))

    def delete(self,current_user,id):
        job  =dao.get_by_id(id,Job)
        if current_user.id == job.company:
            dao.remove(dao.get_by_id(id,Job))
            return True
        return False

    def delete_all(self,current_user):
        return jobDao.delete_all(current_user.id)

    def update(self,current_user,data,id):
        job  =dao.get_by_id(id,Job)
        if current_user.id == job.company and self.can_manipulate(current_user.id):
            jobDao.update_many(id,data,Job)
            return True
        return False

    def can_manipulate(self, user_id):
        company = dao.get_by_id(user_id,User)
        category = company.category.lower()
        if category=='company'  or category=='internship coordinator':
            return True
        else:
            return False

       
jobController = JobController()