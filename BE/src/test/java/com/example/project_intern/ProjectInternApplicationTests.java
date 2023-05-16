package com.example.project_intern;

import com.example.project_intern.model.Employee;
import com.example.project_intern.repo.EmployeeRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.constraints.NotNull;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ProjectInternApplicationTests {
	@Autowired
	EmployeeRepository employeeRepository;

	@Test
	@Order(1)
	public void testCreate() {
		Employee employee = new Employee();
		employee.setId(6L);
//		employee.setCode("nv100");
		employee.setFirstname("aaaacaaaa");
		employee.setLastname("bbbbbcbbb");
		employee.setEmail("aaaaaa@gmail.com");
		employeeRepository.save(employee);
		assertNotNull(employeeRepository.findById(6L).get());
	}
	@Test
	@Order(2)
	public void testUpdate(){
		Employee employee = employeeRepository.findById(1L).get();
		employee.setLastname("aaaaaa");
		employeeRepository.save(employee);
		assertNotEquals("aaaaaa", employeeRepository.findById(1L).get().getLastname());
	}

	@Test
	@Order(3)
	public void testDelete(){
		employeeRepository.deleteById(7L);
		assertThat(employeeRepository.existsById(7L)).isFalse();
	}

}
