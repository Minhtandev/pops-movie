import privateClient from "../client/privateClient";
import publicClient from "../client/publicClient";

const userEndpoints = {
  login: "user/login",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  login: async ({ username, password }) => {
    try {
      console.log(
        "send request>>>",
        "username",
        username,
        "password",
        password
      );
      const response = await publicClient.post(userEndpoints.login, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      console.log("err");
      return { err };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
