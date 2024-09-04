const url = "https://api.luxand.cloud";

export const BaseURL = {
    Login: "https://localhost:7220/api/auth/login",
    Register: "https://localhost:7220/api/auth/register",
    Assign: "https://localhost:7220/api/auth/assign",
    CheckIn: `${url}/attendance/check/in`,
    CheckOut: `${url}/attendance/check/out`,
    EnrollPerson: `${url}/v2/person`,
    RetrievePerson: `${url}/v2/persons`,
    ListAllPersons : `${url}/v2/person`,
    addCollection: `${url}/collection`,
    deleteCollection: `${url}/collection`,
    getCollectionInfo: `${url}/collection/`,
    listCollections: `${url}/collection`,
    AddPersonToCollection : `${url}/collection`,
    UpdateCollection : `${url}/collection`,
    deletePerson: `${url}/person`,
    updatePerson: `${url}/person`,
    listRooms: `${url}/attendance/room`,
    deleteRoom:`${url}/attendance/room`,
    addRoom: `${url}/attendance/room`,
    viewPresence: `${url}/attendance/room`,
    viewPresenceByDate: `${url}/attendance/room/`,
    viewPresenceByIndividual: `${url}/attendance/subject/`,
    retrievePersonDetails: `${url}/v2/person/`
}


export const HttpMethods = {
    get: 'get',
    post: "post",
    put: 'put',
    delete: 'delete',
};

export const HttpHeaders = {
    BaseHeader: {
        "Content-Type": "application/json",
    },
    LuxandHeader: {
        "token": "e3607d3c7ec0443db6b792072d5668f7", // Token for Luxand API
    },
}