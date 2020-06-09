import constants from "../../libraries/constants/constants";
import ListApi from "./ListApi";
import BaseApi from "./BaseApi";

async function SignIn(params) {
    let apiParams = {

    };
    let url = constants.DOMAIN_API + ListApi.sign_in;

    let response = await BaseApi.callApi(url, apiParams);
    return response;
}

export default {
    SignIn,
}