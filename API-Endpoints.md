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

### Create Department
