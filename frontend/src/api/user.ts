import axios from 'axios';


export const register = async (firstName: string, lastName: string, email: string, phone: string, country: string, dateBirth: string, password: string) => {
    let data = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone": phone,
        "password": password,
        "country": country,
        "dateBirth": dateBirth
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}
