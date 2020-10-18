# API Endpoints

**Base URL**
 - *On localhost =>* http://localhost:3001/
 - *On production server  =>* Your Server URL

## Authentication Endpoints

### Administrator SignUp
*Endpoint:*   `baseURL/auth/administrator/signup`  
  *Request Type:* **POST**
  
*Expected data in JSON:* 

    {
    	"name": "Shashank Biplav",
    	"email": "Biplavshashank7@gmail.com",
    	"password": "Qwerty@123"
    }

*Returned Data:*

    {
    	"message": "Admin Created",
    	"userId": "5f89643b0bcf7f04706b9d37"
    }

 ### Administrator Login
*Endpoint:*   `baseURL/auth/administrator/login`  
  *Request Type:* **POST**
  
*Expected data in JSON:* 

    {
    	"email": "Biplavshashank7@gmail.com",
    	"password": "Qwerty@123"
    }

*Returned Data:*

      {
    	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpcGxhdnNoYXNoYW5rN0BnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjg5NjQzYjBiY2Y3ZjA0NzA2YjlkMzciLCJpYXQiOjE2MDI4NDAxMjQsImV4cCI6MTYwMjkyNjUyNH0.5jckCvRb20g6Axdejcr_6sGX-dZCOd8Dcb5PejBRYKs",
    	"userId": "5f89643b0bcf7f04706b9d37"
    }

 ### Get OTP to reset password
*Endpoint:*   `baseURL/auth/administrator/get-otp`  
  *Request Type:* **POST**
  
*Expected data in JSON:* 

    {
    	"email": "Biplavshashank7@gmail.com"
    }

*Returned Data:*

    {
    	"message": "OTP sent!",
    	"result": {
    		"messageId": "<202010161128.28725722723@smtp-relay.mailin.fr>"
    	}
    }

### Reset Password
*Endpoint:*   `baseURL/auth/administrator/get-otp`  
*Request Type:* **POST**
*Expected data in JSON:* 
  

      {
        	"email": "Biplavshashank7@gmail.com",
        	"otp": "61251",
        	"password": "Yuio@123"
      }

*Returned Data:*

    {
    	"message": "Password Updated!",
    	"result": {
    		"_id": "5f89643b0bcf7f04706b9d37",
    		"email": "biplavshashank7@gmail.com",
    		"password": 				"$2a$12$g0ME9qg..6jxU8kdc1q.iuFMpPmYp2bvdDXn3lPwETEoN3nVnpCM6",
    		"name": "Shashank Biplav",
    		"__v": 0
    	}
    }

## Administrator Endpoints
Here Auth token is a bearer token that has to be set in the authorization header. You will get auth token from Admin Login endpoint.
All the ADMIN endpoints required an Auth Bearer token. Be sure to send a valid token on every required admin accessible endpoint.

Example: `"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJpcGxhdnNoYXNoYW5rN0BnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjg5NjQzYjBiY2Y3ZjA0NzA2YjlkMzciLCJpYXQiOjE2MDI4NDU5OTksImV4cCI6MTYwMjkzMjM5OX0.lf5BBFt8d7Tl3oIFa87LGUTDhS1D69ryA2kAj35F53E"`

### Create Department
*Endpoint:*   `baseURL/admin/create-department`  
*Request Type:* **POST**
***Authorization Header is required!***
*Expected data in JSON:* 

    {
    	"name": "Developers"
    }
*Returned Data:*

    {
    	"message": "Department created successfully",
    	"result": {
    		"employees": [],
    		"_id": "5f897d3e2b28f606a8a2f215",
    		"name": "Developers",
    		"__v": 0
    	}
    }

### Create Employee
*Endpoint:*   `baseURL/admin/create-employee`  
*Request Type:* **POST**
***Authorization Header is required!***
*Expected data in JSON:* 

    {
    	"name": "Developers"
    	"email": "test@test.com",
		"age": 25
    }
*Returned Data:*

    {
        "message": "Employee added to database successfully",
    	"result": {
    		"departments": [],
    		"_id": "5f89801800822c06cb0c8703",
    		"name": "test",
    		"email": "test@test.com",
    		"age": 25,
    		"dateOfJoining": "2020-10-16T11:12:24.485Z",
    		"createdAt": "2020-10-16T11:12:24.491Z",
    		"updatedAt": "2020-10-16T11:12:24.491Z",
    		"__v": 0
    	}
    }

### Create Manager
*Endpoint:*   `baseURL/admin/create-manager`  
*Request Type:* **POST**
***Authorization Header is required!***
*Expected data in JSON:* 

    {
    	"name": "Test manager"
    	"email": "manager@test.com",
		"age": 28
    }
*Returned Data:*

    {
        "message": "Manager added to database successfully",
    	"result": {
    		"employees": [],
		    "_id": "5f898388810eff07321db99f",
		    "name": "Test manager",
		    "email": "manager@test.com",
		    "age": 28,
		    "dateOfJoining": "2020-10-16T11:27:04.192Z",
		    "createdAt": "2020-10-16T11:27:04.197Z",
		    "updatedAt": "2020-10-16T11:27:04.197Z",
		    "__v": 0
    	}
    }

### Update Employee
*Endpoint:*   `baseURL/admin/update-employee/:employeeId`  
*Request Type:* **POST**
***Authorization Header is required!***
*Expected data will be in **form-data** because image cannot be passed in JSON:* 

    name:Shashank
    email:shashank@gmail.com
    age:25
    gender:MALE
    currentPosition:Developer
    salary:125000
    manager:5f898388810eff07321db99f
    status:ACTIVE
    image: Shashank.jpg (file)

*Returned Data:*


    {
	    "message": "Employee edited successfully",
	    "result": {
		    "departments": [],
		    "_id": "5f89801800822c06cb0c8703",
		    "name": "Shashank",
		    "email": "shashank@gmail.com",
		    "age": 25,
		    "dateOfJoining": "2020-10-16T11:12:24.485Z",
		    "createdAt": "2020-10-16T11:12:24.491Z",
		    "updatedAt": "2020-10-16T11:39:53.746Z",
		    "__v": 0,
		    "gender": "MALE",
		    "currentPosition": "Developer",
		    "salary": 125000,
		    "manager": "5f898388810eff07321db99f",
		    "status": "ACTIVE",
		    "profileImageUrl": "images/2020-10-16T11:39:53.543Z-Shashank.jpg"
	    }
    }

### Update Manager
*Endpoint:*   `baseURL/admin/update-manager/:managerId`  
*Request Type:* **PUT**
***Authorization Header is required!***
*Expected data will be in **form-data** because image cannot be passed in JSON:* 

    name:Manager1
    email:test@test.com
    age:25
    gender:MALE
    currentPosition:SENIOR MANAGER
    salary:130000
    departmentId:5f897d3e2b28f606a8a2f215
    status:ACTIVE
    image: Shashank.jpg (file)

*Returned Data:*

    {
	    "message": "Manager edited successfully",
	    "result": {
		    "employees": [],
		    "_id": "5f898388810eff07321db99f",
		    "name": "Manager1",
		    "email": "test@test.com",
		    "age": 25,
		    "dateOfJoining": "2020-10-16T11:27:04.192Z",
			"createdAt": "2020-10-16T11:27:04.197Z",
			"updatedAt": "2020-10-17T12:03:39.478Z",
			"__v": 0,
			"gender": "MALE",
			"currentPosition": "SENIOR MANAGER",
			"salary": 130000,
			"department": "5f897d3e2b28f606a8a2f215",
			"status": "ACTIVE"
	    }
    }

### Assign Manager to Employee
*Endpoint:*   `baseURL/admin/assign-manager/:employeeId`  
*Request Type:* **PUT**
***Authorization Header is required!***
*Expected data in JSON:*  

    {
    	"managerId": "5f898388810eff07321db99f"
    }

*Returned Data:*

     {
    	"message": "New manager Manager1 assigned to Shashank successfully",
    	"result": {
    		"departments": [],
    		"_id": "5f89801800822c06cb0c8703",
    		"name": "Shashank",
    		"email": "shashank@gmail.com",
    		"age": 25,
    		"dateOfJoining": "2020-10-16T11:12:24.485Z",
    		"createdAt": "2020-10-16T11:12:24.491Z",
    		"updatedAt": "2020-10-16T11:39:53.746Z",
    		"__v": 0,
    		"currentPosition": "Developer",
    		"gender": "MALE",
    		"manager": "5f898388810eff07321db99f",
    		"profileImageUrl": "images/2020-10-16T11:39:53.543Z-Shashank.jpg",
    		"salary": 125000,
    		"status": "ACTIVE"
    		}
    }

### Assign New Department to Employee
*Endpoint:*   `baseURL/admin/assign-employee-new-department/5f89801800822c06cb0c8703`  
*Request Type:* **PUT**
***Authorization Header is required!***
*Expected data in JSON:* 

    {
    	"departmentId": "5f8bd69cf262b5105c1c4aeb"
    }

*Returned Data:*

    {
    	"message": "New department Testers assigned to Shashank successfully",
    	"result": {
    		"departments": [
    			{
    				"employees": [],
    				"_id": "5f8bd69cf262b5105c1c4aeb",
    				"name": "Testers",
    				"__v": 0,
    				"manager": "5f898388810eff07321db99f"
    			}
    		],
    		"_id": "5f89801800822c06cb0c8703",
    		"name": "Shashank",
    		"email": "shashank@gmail.com"
    		"age": 25,
    		"dateOfJoining": "2020-10-16T11:12:24.485Z",
    		"createdAt": "2020-10-16T11:12:24.491Z",
    		"updatedAt": "2020-10-18T05:46:58.708Z",
    		"__v": 1,
    		"currentPosition": "Developer",
    		"gender": "MALE",
    		"manager": "5f898388810eff07321db99f",
    		"profileImageUrl": "images/2020-10-16T11:39:53.543Z-Shashank.jpg",
    		"salary": 125000,
    		"status": "ACTIVE"
    	}
    }
