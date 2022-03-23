package com.example.spring_bootstrap.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, name = "role")
    private String role;

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<User> user;

    public Role(Long id, String role) {
        this.id = id;
        this.role = role;
    }

    public Role(String name) {
        this.role = name;
    }

    public Role() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + getRole();
    }

    @Override
    public String toString() {
        return getRole();
    }
}
