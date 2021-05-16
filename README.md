# Hamdard
Final Year Project - Kaavish -  Project Files (CS Class of 2021)


## Web App:

**Requirements:**
- Mongodb
- Angular
- Nodejs

**Run the following commands in order:**

Type and run this command to run the backend database first
   _nodemon server.js_

Then on another cmd, change directory
    _cd angular-src_

Install packages before running
    _npm install_

Run the angular source  
     _ng serve_

**_You have to register for a new account and login to access the dashboard and get weekly whatsapp messages_**_

--------------------------------------------------------------

## RASA (for the chatbot widget to work):

**Requirements:**
-RASA open source

**Open cmd and run the following commands in order:**

Install latest model:
    _pip install ur_model-0.0.0.tar.gz_

Train the model:
   _ python -m rasa train_

Run server:
    _rasa run -m models --enable-api --cors "*" --debug_
