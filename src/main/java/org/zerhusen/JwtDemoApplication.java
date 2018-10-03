package org.zerhusen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class JwtDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtDemoApplication.class, args);
    }


    /** L'implémentation de WebMvcConfigurer permet de configurer le back office spring pour qu’il autorise les requêtes provenant de la couche javascript,
        c’est à dire de l’url myccah.claurier.com.
        Résultat de l'implémentation de WebMvcConfigurer :
        le serveur indique le paramètre Access-Control-Allow-Origin au client ReactJS qui tente d'accéder aux ressources du serveur

        Configuration de contrôle de requêtes envoyées par le serveur (à confirmer)
     */

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://myccah.claurier.com");
            }
        };
    }
}
