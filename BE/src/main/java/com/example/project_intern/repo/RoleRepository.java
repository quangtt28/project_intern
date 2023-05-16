package com.example.project_intern.repo;

import java.util.Optional;

import com.example.project_intern.model.ERole;
import com.example.project_intern.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
