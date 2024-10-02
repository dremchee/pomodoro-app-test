import {computed} from 'vue';
export const checkDataNewDay = () => {
 console.log("checkDataNewDay", new Date().toLocaleString("ru-RU").split(",")[0]);
 
 return new Date().toLocaleString("ru-RU").split(",")[0];
}