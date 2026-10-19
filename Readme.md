
After write 3 files of docker run below command on same path
```
docker compose up --build -d
```


To connect with sql use below command
```
docker exec -it oracle-counter-db sqlplus counter_app/"CounterPass123"@//localhost:1521/FREEPDB1
```



