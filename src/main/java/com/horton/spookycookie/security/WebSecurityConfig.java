package com.horton.spookycookie.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

/**
 * @author David Horton
 * Date:   9/18/19
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .addFilterBefore(new AccessDeniedFilter(), FilterSecurityInterceptor.class)
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/quiz/**").permitAll()
                .antMatchers("/api/admin/**").permitAll()
                .antMatchers("/admin").permitAll()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/performLogin")
                .failureUrl("/loginFailed")
                .defaultSuccessUrl("/admin", true)
                .permitAll()
        ;
    }

    @SuppressWarnings("deprecation") //I could give you my reasons for this but then I'd have to kill you
    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("admin")
                        .password("scarybiscuit")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }

}
