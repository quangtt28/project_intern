package com.example.project_intern.security;

import com.example.project_intern.security.jwt.AuthEntryPointJwt;
import com.example.project_intern.security.jwt.JwtAuthenticationFilter;
import com.example.project_intern.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public JwtAuthenticationFilter authenticationJwtTokenFilter() {
    return new JwtAuthenticationFilter();
  }
  
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    // Tìm kiếm thông tin người dùng trong cơ sở dữ liệu và kiểm tra mật khẩu được cung cấp có khớp với mật khẩu được lưu trữ hay không
    // Nếu thông tin đăng nhập hợp lệ, DaoAuthenticationProvider sẽ tạo một Authentication đại diện cho người dùng đã đăng nhập thành công, và Spring Security sẽ cấp cho người dùng quyền truy cập vào tài nguyên được bảo vệ.
      DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder());
      return authProvider;
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
  
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors() // giới hạn truy cập tài nguyên từ một trang web khác
            .and().csrf().disable()
        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and() // cấu hình xử lí ngoại lệ của xác thực
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and() // server sẽ ko lưu trữ thông tin phiên liên quan đến người dùng sau khi xác thực
        .authorizeRequests().antMatchers("/api/auth/**").permitAll()
        .antMatchers("/api/employees/**").permitAll()
        .anyRequest().authenticated();
    
    http.authenticationProvider(authenticationProvider());

    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
  }
}
