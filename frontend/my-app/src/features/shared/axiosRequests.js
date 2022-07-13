import { requestUrl } from './urls';
import axios from 'axios';

export const get_objects_sorted_by = async(jwt, table_name, parameter_col) => {
    try {
       if ((jwt == undefined) || (table_name == undefined) || (parameter_col == undefined)) {
          alert("Specify all parameters, please")
       }
       const response = await axios.get(`${requestUrl}get_objects_sorted_by`, {
          params: {
             table_name : table_name,
             parameter_col: parameter_col
          },
          headers: {
             Authorization: `Bearer ${jwt}`,
          }
       });
       console.log(response.data)
       return response.data;
    } catch (err) {
       console.log('ERROR get_objects_sorted_by', err.message);
    }
 }

 export const search_product_by_name = async(jwt, product_name) => {
   try {
      if ((jwt == undefined) || (product_name == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}search_product_by_name`, {
         params: {
            product_name : product_name,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR search_product_by_name', err.message);
   }
}

export const search_products_by_category = async(jwt, category_number) => {
   try {
      if ((jwt == undefined) || (category_number == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}search_products_by_category`, {
         params: {
            category_number : category_number,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR search_products_by_category', err.message);
   }
}

export const get_product_info_by_upc = async(jwt, upc) => {
   try {
      if ((jwt == undefined) || (upc == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_product_info_by_upc`, {
         params: {
            upc : upc,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_product_info_by_upc', err.message);
   }
}

export const get_prom_or_non_prom_product = async(jwt, promotional, order_by_name) => {
   try {
      if ((jwt == undefined) || (promotional == undefined) || (order_by_name == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_prom_or_non_prom_product`, {
         params: {
            promotional : promotional,
            order_by_name: order_by_name,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_prom_or_non_prom_product', err.message);
   }
}

export const get_customer_by_surname = async(jwt, cust_surname) => {
   try {
      if ((jwt == undefined) || (cust_surname == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_customer_by_surname`, {
         params: {
            cust_surname : cust_surname,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_customer_by_surname', err.message);
   }
}

export const update_customer = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.patch(`${requestUrl}update_customer`, body, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR update_customer', err.message);
   }
}

export const add_customer = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.post(`${requestUrl}add_customer`, body, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR add_customer', err.message);
   }
}

export const get_check_info = async(jwt, check_number) => {
   try {
      if ((jwt == undefined) || (check_number == undefined) ) {
         alert("Specify all parameters, please")
      }
      console.log('get_check_info', check_number)
      const response = await axios.get(`${requestUrl}get_check_info`, {
         params: {
            check_number : check_number,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_check_info', err.message);
   }
}

export const get_today_checks = async(jwt) => {
   try {
      if ((jwt == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_today_checks`, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_today_checks', err.message);
   }
}

export const get_checks_for_time_period = async(jwt, time_start, time_end) => {
   try {
      console.log('params', time_start, time_end)
      if ((jwt == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
         alert('params', time_start, time_end)
      }
      const response = await axios.get(`${requestUrl}get_checks_for_time_period`, {
         params: {
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_checks_for_time_period', err.message);
   }
}

export const sell_products = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      console.log('sell_product body', body)
      const response = await axios.post(`${requestUrl}sell_products`, body, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR sell_products', err.message);
   }
}

export const get_products_by_category = async(jwt, category_number) => {
   try {
      if ((jwt == undefined) || (category_number == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_products_by_category`, {
         params: {
            category_number : category_number,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_products_by_category', err.message);
   }
}

export const get_store_products_by_upc = async(jwt, upc) => {
   try {
      if ((jwt == undefined) || (upc == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_store_products_by_upc`, {
         params: {
            upc : upc,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_store_products_by_upc', err.message);
   }
}

export const add_object = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.post(`${requestUrl}add_object`, body, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR add_object', err.message);
   }
}

export const update_object = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.patch(`${requestUrl}update_object`, body, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR update_object', err.message);
   }
}

export const delete_object = async(jwt, body) => {
   try {
      if ((jwt == undefined) || (body == undefined) ) {
         alert("Specify all parameters, please")
      }
      const response = await axios.delete(`${requestUrl}delete_object`, {
         headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'application/json'
         },
         data: body
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR delete_object', err.message);
   }
}

export const get_n_of_sold_product = async(jwt, upc, time_start, time_end) => {
   try {
      if ((jwt == undefined) || (upc == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_n_of_sold_product`, {
         params: {
            UPC : upc,
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_n_of_sold_product', err.message);
   }
}

export const get_customer_info = async(jwt, percentage) => {
   try {
      if ((jwt == undefined) || (percentage == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_customer_info`, {
         params: {
            percentage : percentage,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_customer_info', err.message);
   }
}

export const get_employee_info = async(jwt, empl_surname) => {
   try {
      if ((jwt == undefined) || (empl_surname == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_employee_info`, {
         params: {
            empl_surname : empl_surname,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_employee_info', err.message);
   }
}

export const get_cashier_checks_info = async(jwt, cashier_id, time_start, time_end) => {
   try {
      if ((jwt == undefined) || (cashier_id == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_cashier_checks_info`, {
         params: {
            cashier_id : cashier_id,
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_cashier_checks_info', err.message);
   }
}

export const get_all_checks_info = async(jwt, time_start, time_end) => {
   try {
      if ((jwt == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_all_checks_info`, {
         params: {
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_all_checks_info', err.message);
   }
}

export const get_cashier_checks_sum = async(jwt, cashier_id, time_start, time_end) => {
   try {
      if ((jwt == undefined) || (cashier_id == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_cashier_checks_sum`, {
         params: {
            cashier_id : cashier_id,
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_cashier_checks_sum', err.message);
   }
}

export const get_all_checks_sum = async(jwt, time_start, time_end) => {
   try {
      if ((jwt == undefined) || (time_start == undefined) || (time_end == undefined)) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_all_checks_sum`, {
         params: {
            time_start : time_start,
            time_end: time_end
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_all_checks_sum', err.message);
   }
}


export const get_number_of_sold_products = async(jwt, category_name) => {
   // Fedor Zhydok, zapyt 1
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}number_of_sold_products`, {
         params: {
            category_name : category_name,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_number_of_sold_products', err.message);
   }
}

export const get_all_cashiers_who_sold_each_product_in_the_store = async(jwt) => {
   // Fedor Zhydok, zapyt 2
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_cashiers_who_sold_each_product_in_the_store`, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_all_cashiers_who_sold_each_product_in_the_store', err.message);
   }
}

export const get_number_of_categories_for_a_customer = async(jwt, card_number) => {
   // Biloverbenko Illia, zapyt 1
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_number_of_categories_for_a_customer`, {
         params: {
            card_number : card_number,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_number_of_categories_for_a_customer', err.message);
   }
}

export const get_products_within_all_checks = async(jwt) => {
   // Biloverbenko Illia, zapyt 2
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_products_within_all_checks`, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_products_within_all_checks', err.message);
   }
}

export const get_number_of_sold_products_for_customer_and_product = async(jwt, card_number) => {
   // Kondratenko Dmytro, zapyt 1
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}number_of_sold_products_for_customer_and_product`, {
         params: {
            card_number : card_number,
         },
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_number_of_sold_products_for_customer_and_product', err.message);
   }
}

export const get_customers_who_were_serviced_by_all_cashiers = async(jwt) => {
   // Kondratenko Dmytro, zapyt 2
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}get_customers_who_were_serviced_by_all_cashiers`, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_customers_who_were_serviced_by_all_cashiers', err.message);
   }
}

export const get_product_by_name = async(jwt, name) => {
   try {
      if (name == undefined) {
         alert("Specify all parameters, please")
      }
      const response = await axios.get(`${requestUrl}api/good/${name}`, {
         headers : {
            Authorization : `Bearer ${jwt}`,
         }
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR get_product_by_name', err.message);
   }
}

export const update_product = async(jwt, body) => {
   try {
      if (jwt == undefined) {
         alert("Specify all parameters, please")
      }
      await axios.post(`${requestUrl}api/good/${body.name}`, body);
   } catch (err) {
      console.log('ERROR update_product', err.message);
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
      });
      console.log(response.data)
      return response.data;
   } catch (err) {
      console.log('ERROR delete_product', err.message);
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
      });
   } catch (err) {
      console.log('ERROR create_product', err.message);
   }
}