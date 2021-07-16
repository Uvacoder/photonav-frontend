import connection from "@/resources/connection";

const api = {
    listFolder: folder => connection.get("folder" + (encodeURI(folder) ?? "")),
    getPhoto: photo => process.env.VUE_APP_API + "photo" + encodeURI(photo),
}

export default api;
