=>  Fusion entre le projet java https://github.com/szerhusenBC/jwt-spring-security-demo et le projet React react-redux-registration-username-example-master

https://github.com/szerhusenBC/jwt-spring-security-demo fonctionne avec le seveur Apache qui tourne

http://myccah.claurier.com/ semble pointer vers http://myccah.claurier.com:10080/login

Actuellement seul le projet React marche via l'URL http://myccah.claurier.com/

=> **bug actuel**
Access-Control-Allow-Origin

Failed to load http://localhost:8000/auth: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. 
Origin 'http://myccah.claurier.com' is therefore not allowed access. 
The response had HTTP status code 401. 
If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

En somme, une ressource de mon serveur demande à ce que le client soit authentifié mais il ne devrait pas. 

**=>  Try one of the following logins**
    admin & admin
    user & password
    disabled & password

=>  **Etude des projets**

A) Projet java

https://github.com/szerhusenBC/jwt-spring-security-demo

avant apparition de la page d'accueil
    couche java =>  classe WebSecurityConfig,           méthode  configure(HttpSecurity httpSecurity) 
                                            ,           méthode  configure(WebSecurity web)
                                                            valeur de la variable authenticationPath="/auth" avec serveur Apache qui tourne
lancement de la page d'accueil                                            
                    classe JwtAuthorizationTokenFilter, méthode protected void doFilterInternal
                        messages:   couldn't find bearer string, will ignore the header
                                    checking authentication for user 'null'
                                    processing authentication for 'http://localhost:8080/js/libs/jwt-decode.min.js'
                                    processing authentication for 'http://localhost:8080/js/client.js'
                                    couldn't find bearer string, will ignore the header
                                    
                    classe JwtAuthorizationTokenFilter, méthode protected void doFilterInternal
                        messages:   checking authentication for user 'null' 
                                    couldn't find bearer string, will ignore the header
                                    checking authentication for user 'null'  
                                    HikariPool-1 - Thread starvation or clock leap detected (housekeeper delta=1m907ms781µs722ns).
                                    processing authentication for 'http://localhost:8080/favicon.ico'
                    classe JwtAuthorizationTokenFilter, méthode protected void doFilterInternal
                                    couldn't find bearer string, will ignore the header
                                    checking authentication for user 'null'
                                    HikariPool-1 - Thread starvation or clock leap detected (housekeeper delta=1m21s372ms888µs540ns).
                          
après apparition de la page d'accueil et clic sur le bouton Login
    couche javascript   =>  doLogin(loginData) {loginData = {username: "user", password: "password"}
    couche java =>  classe JwtAuthorizationTokenFilter, méthode     protected void doFilterInternal
                        messsages :     processing authentication for 'http://localhost:8080/auth'        
                                        HikariPool-1 - Thread starvation or clock leap detected (housekeeper delta=47s204ms333µs389ns).
                                        couldn't find bearer string, will ignore the header
                                        checking authentication for user 'null'
                                        
                    classe AuthenticationRestController, méthode    createAuthenticationToken       , URL /auth
                                                                    authenticate            µµµµµ    
    couche javascript   =>  success: de doLogin(loginData)  data = {token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxN…RaBIM-iabSrSU6xV_MkiiWuVj4_KoCA03znqvEv7EwmEla6MA"}, textStatus = "success"
                            showUserInformation()                                                   , URL /user
    couche java =>  classe  JwtAuthorizationTokenFilter, méthode    protected void doFilterInternal
                            UserRestController                      getAuthenticatedUser            , URL /user
    couche javascript   =>  success:  de  showUserInformation()     data = {username: "user", firstname: "user", lastname: "user", email: "enabled@user.com", authorities: Array(1), …}, textStatus = "success", 

B) Projet javascript

LoginPage.jsx               - handleSubmit
                            - login(username, password) {username = "test", password = "test" }
user.actions.js             - login(username, password)
authentication.reducer.js   - authentication()  action = {type: "USERS_LOGIN_REQUEST", user: {username: "test"}
users.reducer.js            - users(state = {}, action)
user.service.js             - login(username, password)  {username = "test", password = "test"}
                            -  handleResponse(response)  {  response = {ok: true}}
                            text = "{"id":1,"username":"test","firstName":"aaaa","lastName":"aaaa","token":"fake-jwt-token"}"
                            return data :{
                                firstName: "aaaa"
                                id: 1
                                lastName: "aaaa"
                                token: "fake-jwt-token"
                                username: "test"
                                }
authentication.reducer.js   - authentication()  action = {type: "USERS_LOGIN_SUCCESS", user:firstName: "aaaa"
                                                                                            id: 1
                                                                                            lastName: "aaaa"
                                                                                            token: "fake-jwt-token"
                                                                                            username: "test"        }
users.reducer.js            - users(state = {}, action = {type: "USERS_LOGIN_SUCCESS", user:firstName: "aaaa"
                                                                                            id: 1
                                                                                            lastName: "aaaa"
                                                                                            token: "fake-jwt-token"
                                                                                            username: "test"        }                                                                                            
authentication.reducer.js   - authentication()  action = { type: "ALERT_CLEAR"}                           
users.reducer.js            - users(state = {}, action ={ type: "ALERT_CLEAR"}  
user.service.js             - getAll() 
authentication.reducer.js   - authentication()  action = {type:"USERS_GETALL_REQUEST"}
users.reducer.js            - users(state = {}, state = {items: 0:
                                                                firstName: "aaaa"
                                                                id: 1
                                                                lastName: "aaaa"
                                                                password: "test"
                                                                username: "test" , action = {type: "USERS_GETALL_REQUEST"}  }
user.service.js             - getAll()      requestOptions:
                                            headers:
                                            Authorization: "Bearer fake-jwt-token"
                                            method: "GET"                           , URL :/users
                            -  handleResponse(response)  {  response = {ok: true}}
authentication.reducer.js   - authentication()  action = {type: "USERS_GETALL_SUCCESS"
                                                            users: Array(1)
                                                            0:
                                                            firstName: "aaaa"
                                                            id: 1
                                                            lastName: "aaaa"
                                                            password: "test"
                                                            username: "test"  }
users.reducer.js            - users(            action = {type: "USERS_GETALL_SUCCESS"
                                                          users: Array(1)
                                                           0:
                                                           firstName: "aaaa"
                                                           id: 1
                                                           lastName: "aaaa"
                                                           password: "test"
                                                           username: "test"  }                                                       
                                                            
                                                            
