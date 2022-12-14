## Reporting Web Applicaiton

This is a reporting component of DataCenter Consolidation Web Application, which was developed using Open Source Technologies. Reports are developed using [Eclipse BIRT Repord Designer]. And the designed report will be deployed to [Tomcat Application Server] which hosts the BIRT Reporting Engine as a Web application.


### Installation

  - Download and Install [Tomcat Application Server version 8] for your platform
  - Copy ReportsWebApp/birt folder from the repository which in BIRT viewer web application into webapps directory
  - Start Tomcat server go to http://localhost:8080 to make sure it is working
  - Develop Reports in BIRT Report Designer and after testing deploy(copy) them to ReportsWebApp/birt folder to integrate with BIRT viewer

##### NOTE
Make sure Tomcat server is running in order for Report to be invoked via the links on the main Node web application.

   [Eclipse BIRT Repord Designer]: http://www.eclipse.org/birt/about/designer.php
   [Tomcat Application Server version 8]: http://tomcat.apache.org/download-80.cgi


### TO DOs
- Use BIRT designer to create data visualzation reports and perform analytics on collected datacenter data
- To make more reports and charts more interactive and responsive (HTML5) consider upgrading to [OpenText iHub] analytics platform which is based on open source BIRT and use [OpenText Analytics BIRT Designer] (free) to desing your responsive reports.

[OpenText iHub]: http://birt.actuate.com/products/ihub
[OpenText Analytics BIRT Designer]: http://birt.actuate.com/products/analytics-designers#birtdesigneranchor
