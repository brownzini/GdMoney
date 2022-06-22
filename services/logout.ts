// Services API
import Router from "next/router";
import api from "./api";

const logout = async (token:string) => {
    if (token !== undefined) {
      await api.post("/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
      })
      .then(function (response) {
         Router.push("/landingpage");
      }).catch(error => {
         error;
      })
    }
}

export default logout;