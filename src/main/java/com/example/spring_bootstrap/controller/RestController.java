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
    public ResponseEntity<List<User>> showAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping(value="/admin/allRoles")
    public ResponseEntity<List<Role>> showAllRoles() {
        return ResponseEntity.ok().body(roleService.getAllRoles());
    }

    @GetMapping("/admin/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(userService.getUser(id));
    }

    @PutMapping(value = "/admin/edit")
    public ResponseEntity<User> editUser(@RequestBody User user) {
        userService.editUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping(value = "/admin/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        userService.removeUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/admin/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/auth")
    public ResponseEntity<User> getUserPage(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(user);
    }

}
