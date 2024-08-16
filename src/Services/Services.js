import request from './ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from './Constants';

// Function to list all persons
export const listAllPersons = async () => {
    return await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.ListAllPersons);
};

// Function to delete a person by UUID
export const deletePerson = async (uuid) => {
    return await request(HttpMethods.delete, HttpHeaders.LuxandHeader, BaseURL.deletePerson, {uuid});
};


// Function to list all rooms
export const listAllRooms = async () => {
    return await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listRooms);
};

// Function to delete a room by UUID
export const deleteRoom = async (uuid) => {
    return await request(HttpMethods.delete, HttpHeaders.LuxandHeader, BaseURL.deleteRoom, {uuid});
};

// Function to check-in using a specific room and photo URL
export const checkIn = async (roomUuid, photoUrl) => {
    const data = { room: roomUuid, photo: photoUrl };
    return await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.CheckIn, JSON.stringify(data));
};
