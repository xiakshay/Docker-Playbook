
After write 3 files of docker run below command on same path
```
docker compose up --build -d
```


To connect with sql use below command
```
docker exec -it oracle-counter-db sqlplus counter_app/"CounterPass123"@//localhost:1521/FREEPDB1
```





```
change the path for others

cd C:\Users\aksha\OneDrive\Desktop\Docker\project2\jenkins  

docker compose down

docker compose build --no-cache jenkins

docker compose up -d

```




```
exec was not working then 
> docker exec -u root jenkins sh -c "apt-get update && apt-get install -y docker-cli"
```
```
docker exec jenkins docker --version
docker exec jenkins docker version
```
try upper one to validate 
