# nextJs opemJiraSimul App

para correr la app localmente se nececita la base de datos

- El -d signfica **detached**

```
docker-compose up -d
```

- url mongo local:

```
 mongodb://localhost:27017
```

# para cinfigurar variables de entorno:

Renombrar el archivo **.env.template** a **.env** y completar

# llenar la db con info de pruebas

llamar a: 'http://localhost/3000/api/seed'
