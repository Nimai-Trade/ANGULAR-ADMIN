// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

//DEV SERVER
//BASE_API_URL: 'http://136.232.244.190:8081/nimaiAdminApi/'

 //PROD SERVER
//BASE_API_URL: 'https://prod.360tf.trade/nimaiAdminApiUat/'

 //UAT SERVER
BASE_API_URL: 'https://uat.360tf.trade/nimaiAdminApiUat/'
//BASE_API_URL:'http://Nimai-Prd-LB-1296056161.ap-south-1.elb.amazonaws.com/nimaiAdminApiUat/'

//BASE_API_URL: 'https://prod.nimaitrade.com/nimaiAdminApiUat/'
//BASE_API_URL: 'http://nimai-pilot-lb-468660897.me-south-1.elb.amazonaws.com/nimaiAdminApiUat/',
//BASE_API_URL: 'https://uat.nimaitrade.com/nimaiAdminApiUat/'
// BASE_API_URL: 'http://localhost:8080/',
//BASE_API_URL: 'http://203.115.123.93:8080/nimaiAdminApi/'
//BASE_API_URL: 'http://203.115.123.93:9090/nimaiAdminApiUat/'
};
 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
