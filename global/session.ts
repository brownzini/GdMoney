// Nookies
import nookies from 'nookies';

export default {
    token: (nookies.get().TOKEN !== undefined) 
              ? JSON.parse(nookies.get().TOKEN)[0].token 
              : null,
};