# Hamdard

### Abstract:
Hamdard is a contextual AI assistant built on RASA framework and deployed on a
web application. It acts as a personal companion to pregnant women, making use
of Natural Language Processing (NLP) to answer their maternity related questions
in the Urdu language, predicting complications through Bayesian predictive modeling, as well as providing psychological and emotional assistance. Hence, Hamdard
aims at providing women multiple levels of support throughout their nine-months of
pregnancy.

### Team:
- Behjet Ansari - ba04090@st.habib.edu.pk
- Eraj Rizwan - er03984@st.habib.edu.pk
- Maham Zehra - mz04027@st.habib.edu.pk
- Shiza Khalidi - sk03870@st.habib.edu.pk

### Supervisor
* Dr. Syeda Saleha Raza, 
Assistant Professor - Computer Science,
Dhanani School of Science and Engineering,
Habib University

#### Web Application Files Link:

    https://drive.google.com/file/d/1aiQ9pUxfPt0vQYUM7EaV-7rOKfcSemls/view?usp=sharing


#### RASA Files Link:
    
    https://1drv.ms/u/s!As8NM9zLPIheg1MJLByVKfIoxTja?e=neaVHw

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

**_You have to register for a new account and login to access the dashboard and get weekly whatsapp messages_**

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
    
