 let Constants = {
  api: 'https://rise.mpiwg-berlin.mpg.de/api/',
}
export default Constants;

export let http = function(info){
  return new Promise((resolve, reject) => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if(info.token) headers['rise-api-token'] = info.token;
    
    fetch(Constants.api + info.url, {
      method: info.route,
      headers: headers
    })
    .then(result => result.json())
    .then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  })
}