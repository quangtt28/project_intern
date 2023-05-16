package com.example.project_intern.controller;

import com.example.project_intern.exception.ResourceNotFoundException;
import com.example.project_intern.model.Employee;
import com.example.project_intern.payload.response.MessageResponse;
import com.example.project_intern.repo.EmployeeRepository;
import com.example.project_intern.security.services.ReportService;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
  @Autowired
  EmployeeRepository employeeRepository;

  @Autowired
  ReportService reportService;

  @GetMapping("/all")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public List<Employee> getAllEmployee(){
    return employeeRepository.findAll();
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Employee> getEmployeeById(@PathVariable(value = "id") Long employeeId) throws ResourceNotFoundException {
    Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id: " + employeeId));
    return ResponseEntity.ok().body(employee);
  }

  @PostMapping("/insert")
  @PreAuthorize("hasRole('ADMIN')")
  public Employee createEmployee(@Valid @RequestBody Employee employee){
    return employeeRepository.save(employee);
  }
//  public ResponseEntity<?> createEmployee(@Valid @RequestBody Employee employee){
//    if (employeeRepository.existsByCode(employee.getCode())){
//      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Code is already taken!");
//    }
//    Employee createEmployee = employeeRepository.save(employee);
//    return ResponseEntity.ok(createEmployee);
//  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "id") Long employeeId, @RequestBody @Valid Employee employeeDetails) throws ResourceNotFoundException{
    Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id: " + employeeId));

    employee.setEmail(employeeDetails.getEmail());
//    employee.setCode(employeeDetails.getCode());
    employee.setFirstname(employeeDetails.getFirstname());
    employee.setLastname(employeeDetails.getLastname());
    Employee updateEmployee = employeeRepository.save(employee);
    return ResponseEntity.ok(updateEmployee);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteEmployee(@PathVariable(value = "id") Long employeeId) throws ResourceNotFoundException {
    Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id: " + employeeId));
    employeeRepository.delete(employee);
    Map<String, Boolean> response = new HashMap<>();
    response.put("Deleted!", Boolean.TRUE);
    return ResponseEntity.ok(response);
  }

  // jasper report
  @GetMapping(path = "/report/{month}/{year}")
  public void export(HttpServletResponse response, @PathVariable Integer month, @PathVariable Integer year) throws IOException, JRException, SQLException{
    JasperPrint print = null;
    response.setContentType("application/pdf");
    response.setHeader("Content-Disposition", String.format("attachment; filename = employees.pdf"));

    OutputStream outputStream = response.getOutputStream();
    print = reportService.exportReport(month, year);
    JasperExportManager.exportReportToPdfStream(print, outputStream);
  }
}
