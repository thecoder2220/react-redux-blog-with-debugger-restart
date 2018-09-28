Fusion entre le projet java https://github.com/szerhusenBC/jwt-spring-security-demo et le projet React react-redux-registration-username-example-master

Actuellement seul le projet React marche via l'URL http://myccah.claurier.com/
http://localhost:8080 ne marche plus

objectif : répliquer le fonctionnement de react-redux-blog-with-debugger soit :

dans users.js  =>  
export function signInUser(formValues) {
  debugger;
  const request = axios.post(`/auth/login`, formValues);
