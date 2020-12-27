
import CryptoJS from "crypto-js/crypto-js";


/**
   * AES encryption: string key iv returns base64
 */

export function Encrypt(valor){

 return CryptoJS.AES.encrypt(
    valor,
    "123"
  ).toString();

} 

export function Decrypt(valor){
  var bytes = CryptoJS.AES.decrypt(valor, "123");
  return bytes.toString(CryptoJS.enc.Utf8);
 } 

