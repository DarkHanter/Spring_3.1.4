package com.example.spring_bootstrap.controller;

import com.example.spring_bootstrap.model.Role;
import com.example.spring_bootstrap.model.User;
import com.example.spring_bootstrap.service.RoleService;
import com.example.spring_bootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public RestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value="/admin/allUsers")
    public List<User> showAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value="/admin/allRoles")
    public List<Role> showAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/admin/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") int id) {
        //return userService.getUser(id);
        return ResponseEntity.ok().body(userService.getUser(id));
    }

//    @PutMapping(value = "/admin/edit")
//    public User editUser(@RequestBody User user) {
//        userService.editUser(user);
//        return user;
//    }

    @PutMapping(value = "/admin/edit")
    public void editUser(@RequestBody User user) {
        userService.editUser(user);
    }

//    @DeleteMapping(value = "/admin/delete/{id}")
//    public ResponseEntity<User> deleteUser(@PathVariable("id") int id) {
//        userService.removeUser(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @DeleteMapping(value = "/admin/delete/{id}")
    public void deleteUser(@PathVariable("id") int id) {
        userService.removeUser(id);
    }

    @PostMapping(value = "/admin/add")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
        //return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/admin/auth")
    public ResponseEntity<User> getUserPage(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(user);
    }

}
