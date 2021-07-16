import axios from "axios";
import httpstatus from "http-status-codes";

const connection = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 60 * 1000,
});

connection.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response) {
            if (error.response.status === httpstatus.NOT_FOUND)
                error.message =  "Recurso não encontrado.";
            else if (error.response.status === httpstatus.FORBIDDEN) {
                if (error.response.data && error.response.data.message)
                    error.message = error.response.data.message
                else
                    error.message = "Não foi possível acessar o recurso solicitado.";
            }
            else if (error.response.data && error.response.data.message)
                error.message =  error.response.data.message;
            else
                error.message =  "Erro na operação solicitada.";
        }
        else if (error.message && error.message == "Network Error")
            error.message = "Não foi possível acessar o servidor.";
        else
            error.message = "Erro na operação solicitada.";

        return Promise.reject(error);
    }
);

export default connection;
