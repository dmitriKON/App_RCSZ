import { requestUrl } from './urls';
import axios from 'axios';


export const get_product_by_name = async(jwt, name) => {
   try {
      if (name == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}api/good/${name}`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_product_by_name', err.message);
      alert(err.message)
   }
}

export const update_product = async(jwt, body) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      await axios.post(`${requestUrl}api/good/${body.name}`, body, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
          alert(`${body.name} has been updated.`)
      });
   } catch (err) {
      console.log('ERROR update_product', err.message);
      alert(err.message)
   }
}

export const get_all_products = async(jwt) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}api/good`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      });
      console.log(response.data.result)
      return response.data.result;
   } catch (err) {
      console.log('ERROR get_product_by_name', err.message);
      alert(err.message)
   }
}

export const get_all_groups = async(jwt) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}api/group`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      });
      console.log(response.data.result)
      return response.data.result;
   } catch (err) {
      console.log('ERROR get_product_by_name', err.message);
      alert(err.message)
   }
}

export const delete_product = async(jwt, name) => {
   try {
      if (name == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.delete(`${requestUrl}api/good/${name}`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
          alert(`${name} has been deleted.`)
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR delete_product', err.message);
      alert(err.message)
   }
}

export const create_product = async(jwt, body) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      await axios.put(`${requestUrl}api/good`, body, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
          alert(`${body.name} has been created.`)
      });
   } catch (err) {
      console.log('ERROR create_product', err.message);
      alert(err.message)
   }
}

export const update_group = async(jwt, body) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      await axios.post(`${requestUrl}api/group/${body.name}`, body, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
         alert(`${body.name} has been updated.`)
      });
   } catch (err) {
      console.log('ERROR update_group', err.message);
      alert(err.message)
   }
}

export const delete_group = async(jwt, name) => {
   try {
      if (jwt == undefined || name == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.delete(`${requestUrl}api/group/${name}`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
          alert(`${name} has been deleted.`)
      });
      console.log(response)
      return response;
   } catch (err) {
      console.log('ERROR delete_group', err.message);
      alert(err.message)
   }
}

export const create_group = async(jwt, body) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      await axios.put(`${requestUrl}api/group`, body, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      })
      .then(() => {
          alert(`${body.name} has been created.`)
      });
   } catch (err) {
      console.log('ERROR create_group', err.message);
      alert(err.message)
   }
}