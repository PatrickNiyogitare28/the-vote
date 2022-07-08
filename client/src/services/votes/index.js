import axios from 'axios';
import API_URL from '../../config/api-url';
import * as SecureStorage from 'expo-secure-store'


export const getAll = async () => {
    return axios.get(API_URL+'/candidates', {
        headers: {
            'Authorization': 'Bearer ' + await _getToken()
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}


const _getToken = async () => {
    return await SecureStorage.getItemAsync('token');
}

export const vote = async (id) => {
    const token = await _getToken()
    return axios.post(API_URL+'/votes/candidate/'+id,{}, {
        headers: {
            'Authorization': 'Bearer '+token
        }
    })
    .then((res) => {
        return res?.data
    }
    )
    .catch((err) => {
        return err?.response?.data;
    }
    )
}

