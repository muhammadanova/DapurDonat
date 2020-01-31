function convertIDR(str){
  let strPrice = String(str)
  let resultPrice = ''
  for(let j = 0; j < strPrice.length; j++){
    if((strPrice.length - j) % 3 === 0 && j !== 0){
      resultPrice += '.' + strPrice[j]
    }else{
      resultPrice += strPrice[j]
    }
  }
  return `Rp. ${resultPrice}`
}