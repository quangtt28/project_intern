package com.example.project_intern.security.services;

import com.example.project_intern.model.Employee;
import com.example.project_intern.model.User;
import com.example.project_intern.repo.EmployeeRepository;
import com.example.project_intern.repo.UserRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    private ResourceLoader resourceLoader;
//    @Autowired
//    UserRepository userRepository;

//    public String exportReport(String reportFormat) throws FileNotFoundException, JRException {
//        String path = "C:\\ABC\\2\\darkweb\\Report";
//        List<Employee> employees = employeeRepository.findAll();
////        List<User> users = userRepository.findAll();
//        // load file and compile it
//        File file = ResourceUtils.getFile("classpath:employees.jrxml");
//        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
//        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
//        Map<String, Object> map = new HashMap<>();
//        map.put("createdBy","Employees");
//        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport,map,dataSource);
//        if (reportFormat.equalsIgnoreCase("html")){
//            JasperExportManager.exportReportToHtmlFile(jasperPrint,path + "\\employees.html");
//        }
//        if (reportFormat.equalsIgnoreCase("pdf")){
//            JasperExportManager.exportReportToPdfFile(jasperPrint,path + "\\employees.pdf");
//        }
//        return "report generated in path" + path;
//
//    }

    public JasperPrint exportReport(Integer month, Integer year) throws IOException, JRException {
        List<Employee> employees = employeeRepository.findAll();
        String period = month + "/" + year;
        String path = resourceLoader.getResource("classpath:employees.jrxml").getURI().getPath();
        JasperReport jasperReport = JasperCompileManager.compileReport(path);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("periodParameter", period);
        JasperPrint print = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        return print;
    }
}
