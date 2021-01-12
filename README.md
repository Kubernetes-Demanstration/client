# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## where is current repository located in ? mark as red border following

graph TD;
  User-.make a request by.->Brower;
  Developer --git commit --> Github;
  Github --github action  -->Ingress-Nginx;
  Ingress-Nginx--triggle build --> jenkisn;
  Brower -- over network --> Ingress-Nginx;
  Ingress-Nginx--> clientService;
  subgraph  kubernetes cluster
  Ingress-Nginx --> APIService;

  clientService--> angularAppDeployment;
  style angularAppDeployment fill:#FFF200,stroke:#FF0000,stroke-width:4px,fill-opacity:0.5;
  APIService -->.netCoreWebAPIDepoyment;
  .netCoreWebAPIDepoyment--> mssqlDbs;
  .netCoreWebAPIDepoyment--> redisCache;
   jenkisn --rolling-update  --> angularAppDeployment;
  jenkisn -- rolling-update  --> .netCoreWebAPIDepoyment;
  end;
