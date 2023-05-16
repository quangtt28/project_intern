package com.example.project_intern.repo;

import com.example.project_intern.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    Boolean existsByCode(String code);
}
