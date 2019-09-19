package com.horton.spookycookie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author David Horton
 * Date:   9/18/19
 */
@Controller
public class AdminViewController {

    @RequestMapping("admin")
    public String admin() {
        return "forward:/";
    }

    @RequestMapping("login")
    public String login() {
        return "forward:/";
    }

    @RequestMapping("loginFailed")
    public String loginFailed() {
        return "forward:/";
    }
}
