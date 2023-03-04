### websocket API draft

- Request
  

    Address: ws://localhost:8888

    DataType: Array<String>
    
    First argument is command between FE and BE, second is request data
  
    Command type(not only this): data
  
    Example:  ["data","l"]


- Response
  

    DataType:    `Array<String>`

    First argument is command between FE and BE, second is response data

    Command type(not only this): data | exit | error | resize

    Example:  ["data","Last login: Sat Mar  4 13:23:02 2023 from 127.0.0.1\r\r\n"]

  
Usage: 

    1. `npm install`

    2. change username and password with your computer

    3. run: node server.js
