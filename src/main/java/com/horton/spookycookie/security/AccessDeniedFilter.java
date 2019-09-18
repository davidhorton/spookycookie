package com.horton.spookycookie.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.NestedServletException;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * If they're unauthorized and the request is a normal page, do the redirect. If it's an ajax call, return a forbidden status code.
 *
 * @author David Horton
 * Date:   8/8/19
 */
public class AccessDeniedFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {

            if (e instanceof AccessDeniedException || e instanceof NestedServletException && ((NestedServletException) e).getRootCause() instanceof AccessDeniedException) {

                HttpServletRequest rq = (HttpServletRequest) request;
                HttpServletResponse rs = (HttpServletResponse) response;

                if (isAjax(rq)) {
                    rs.sendError(HttpStatus.FORBIDDEN.value());
                } else {
                    rs.sendRedirect("/login");
                }
            }
            else {
                throw new IOException(e);
            }
        }
    }

    private Boolean isAjax(HttpServletRequest request) {
        return request.getRequestURI() != null && (request.getRequestURI().contains("api"));
    }
}
