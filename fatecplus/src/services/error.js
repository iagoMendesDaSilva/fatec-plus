import { Notification, Storage } from "../services";

export class Error {

    constructor() {
        throw new Error("Can't instantiate to Erro class.")
    }

    static validate(status) {
        switch (status) {
            case 401:
                return "Sessão expirada.";
            case 403:
                return "Sem autorização.";
            case 404:
                return "Não encontrado.";
            default:
                return "Ops! Ocorreu um problema";
        }
    }

    static async logout(navigation) {
        const user = await Storage.getUser()
        Storage.clear();
        Notification.unregister()
        navigation && navigation.replace("Login", { username: user.username, password: user.password })
    }

}