import  Strings from '../../constants/strings';
import { Executor } from '../../services/request';

export default  [
    {
        title: "Aluno(a)",
        type: "Student",
        description: Strings.descriptionStudent,
        img: require("../../assets/img/category_student.png")
    },
    {
        title: "Empresa",
        type: "Company",
        description: Strings.descriptionCompany,
        img: require("../../assets/img/category_company.png")
    },
    {
        title: "Professor(a)",
        type: "Teacher",
        description: Strings.descriptionTeacher,
        img: require("../../assets/img/category_teacher.png")
    }];

export class StorageRegister {

}