const axios=require('axios');
axios.get('https://2019ncov.asia/api/cdr', {headers: {'Access-Control-Allow-Origin': '*'},
}).then(res=>{
  console.log(res);
}).catch()
