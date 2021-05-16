# Hamdard
Final Year Project - Kaavish -  Project Files (CS Class of 2021)


## Web App:

**Requirements:**
- Mongodb
- Angular
- Nodejs

**Run the following commands in order:**

Type and run this command to run the backend database first

    nodemon server.js

Then on another cmd, change directory

    cd angular-src

Install packages before running (important)

    npm install

Run the angular source 

     ng serve

**_You have to register for a new account and login to access the dashboard and get weekly whatsapp messages**_

--------------------------------------------------------------

## RASA (for the chatbot widget to work)

**Requirements:**

- RASA open source

**Open cmd and run the following commands in order:**

Install latest model

    pip install ur_model-0.0.0.tar.gz

Train the model

    python -m rasa train

Run server

    rasa run -m models --enable-api --cors "*" --debug
    
Open another cmd and run

    rasa run actions
    
