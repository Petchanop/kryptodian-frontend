import axios from "axios";

/**
 * Logs out a service account with the specified access token.
 * @param access_token The access token of the service account to log out.
 * @throws An error if the logout request fails with a status code other than 401.
 */
export async function serviceLogout(access_token: string) {
  const headers = {
    Authorization: "Bearer " + access_token,
  };
  const url = process.env.BACKEND_URL + "/api/v1/auth/logout/";
  try {
    const r = await axios.post(url, {}, { headers: headers });
  } catch (e: any) {
    if (e.response.status === 401) {
      console.log("serviceLogout: 401");
    } else {
      throw e;
    }
  }
}
