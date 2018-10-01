=>  Fusion entre le projet java https://github.com/szerhusenBC/jwt-spring-security-demo et le projet React react-redux-registration-username-example-master

Actuellement seul le projet React marche via l'URL http://myccah.claurier.com/
http://localhost:8080 ne marche plus

=>  objectif : répliquer le fonctionnement de react-redux-blog-with-debugger soit :

dans users.js  =>  
...
export function signInUser(formValues) {
  debugger;
  const request = axios.post(`/auth/login`, formValues);
...

doit être ajouté dans le fichier user.service.js
à ce niveau : 
....
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
....

=>  Etude des projets

https://github.com/szerhusenBC/jwt-spring-security-demo

avant apparition de la page d'accueil
    couche java =>  classe JwtAuthorizationTokenFilter, méthode protected void doFilterInternal
après apparition de la page d'accueil et clic sur le bouton Login
    couche javascript   =>  doLogin(loginData) {loginData = {username: "user", password: "password"}
    couche java =>  classe JwtAuthorizationTokenFilter, méthode     protected void doFilterInternal
                    classe AuthenticationRestController, méthode    createAuthenticationToken       , URL /auth
                                                                    authenticate
    couche javascript   =>  success: de doLogin(loginData)  data = {token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxN…RaBIM-iabSrSU6xV_MkiiWuVj4_KoCA03znqvEv7EwmEla6MA"}, textStatus = "success"
                            showUserInformation()                                                   , URL /user
    couche java =>  classe  JwtAuthorizationTokenFilter, méthode    protected void doFilterInternal
                            UserRestController                      getAuthenticatedUser            , URL /user
    couche javascript   =>  success:  de  showUserInformation()     data = {username: "user", firstname: "user", lastname: "user", email: "enabled@user.com", authorities: Array(1), …}, textStatus = "success", 



