package com.example.spring_bootstrap.controller;

import com.example.spring_bootstrap.model.Role;
import com.example.spring_bootstrap.model.User;

import com.example.spring_bootstrap.service.RoleService;
import com.example.spring_bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Set;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/admin")
    public String adminPage() {
        return "admin";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "login";
    }

    @PostConstruct
    void create() {
        Role roleAdmin = new Role("ADMIN");
        Role roleUser = new Role("USER");
        User user1 = new User("Thomas", "Angelo", 35, "th35@gmail.com", "1234", Set.of(roleAdmin));
        User user2 = new User("Don", "Salieri", 57, "donS@gmail.com", "don", Set.of(roleUser));
        User user3 = new User("Paulie", "Lombardo", 36, "paul@gmail.com", "4321", Set.of(roleUser, roleAdmin));
        checkRole(roleAdmin);
        checkRole(roleUser);
        checkUser(user1);
        checkUser(user2);
        checkUser(user3);
    }

    public void checkUser(User user) {
        if (userService.isEmailAvailable(user.getEmail())) {
            userService.addUser(user);
        } else {
            System.out.println("User with email '" + user.getEmail() + "' already existed");
        }
    }

    public void checkRole(Role role) {
        if (userService.isRoleAvailable(role.getRole())) {
            roleService.save(role);
        } else {
            System.out.println("Role '" + role.getRole() + "' already existed");
        }
    }

}
