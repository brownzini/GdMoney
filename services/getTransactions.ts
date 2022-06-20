// Services API
import api from "./api";

const getTransactions = async (token:string, id:string | undefined):Promise<string> => {
  let transactions = '';
  if (token !== undefined) {
    await api.get(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(function (response) {
        transactions = response.data.transactions;
    }).catch(error => {
        transactions = 'error';
    })
  }
  return transactions;
}

export default getTransactions;