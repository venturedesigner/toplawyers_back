# toplawyers_back

# T&M Solutions
T&M solutions is an API that serve a industrial machines and tools maintenances management app
# Installation
You have to install all dependencies of this api, just write this on your CLI or BASH ```$npm i``` 
# Usage
This API doesn't serve a front-end at the moment, but you can try all it's routes by using postman
## EndPoints
## User
| METHOD |ENDPOINT|TOKEN|DESCRIPTION|RETURNS|
|--------|--------|-----|-----------|-------|
|POST|auth/signup|No|ASBAT can signup|a user token|
|POST|auth/login|No|ASBAT can log in|a user token|
|POST|/profiles/:idProfile|Yes|ASBAT can update your profile|Updated profile|
|GET|/profiles|No|ASBAT can view profiles|a list of profiles|
|GET|/profiles/current|Yes|ASBAT can view your profile|profile|
|POST|/profiles/current|Yes|ASBAT can update your profile |the updated user|
|POST|/users/update|Yes|ASBAT can update your user|Updated user|
## Signup user(POST)
```/user``` /n
Example:
data
```
{
    "firstname": "Juan",
    "lastname": "Pérez",
    "password": "1234567Aa",
    "email": "juan@gmail.com"
}
```
response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJKdWFuIiwibGFzdG5hbWUiOiJQw6lyZXoiLCJ1c2VybmFtZSI6IlE1RTRlS0NKIiwiaWQiOiI2MGU3MTNjOTM3OGY2NjAwMTVjNzdhZGMiLCJlbWFpbCI6Imp1YW5AZ21haWwuY29tIiwidHlwZW9mdXNlciI6IlVzZXIiLCJpYXQiOjE2MjU3NTY2MTcsImV4cCI6MTYyNTkyOTQxN30.qTtMLoqp7vNvH41ocRSvh2tNiemUQ3d0BQW_ac5o-8s",
    "firstname": "Juan",
    "lastname": "Pérez",
    "username": "Q5E4eKCJ",
    "id": "60e713c9378f660015c77adc",
    "email": "juan@gmail.com",
    "typeofuser": "User"
}
```
