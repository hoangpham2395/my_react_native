import strings from "../../assets/strings";
import statusCodes from "../statusCodes";

async function callApi(url, params, isAuth = false) {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (isAuth) {
        let token = '';
        headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authentication': token,
        };
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
    }).then((response) =>
        response.json()
    ).then((json) => {
        return json;
    }).catch((error) => {
        console.error(error);
        return {
            status: statusCodes.MULTIPLE_CHOICES,
            message: strings.system_error,
        };
    });
    return response;
}

export default {
    callApi,
}