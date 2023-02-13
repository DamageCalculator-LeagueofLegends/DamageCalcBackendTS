# DamageCalculatorBackend

## Clone this repository and run the following commands:

<br>

### Install all dependencies:

<br>

```shell
npm i
```

---

<br>

### Run the server:

<br>

```shell
npm run execute
```

Everytime you change something in the code you will have to rerun npm run execute

Now that the server is running you can make REST API calls at the following route:
- http://loocalhost/api/champs -> gets a list of all avavaible **champions** in from of a JSON
- http://loocalhost/api/items -> gets a list of all avaiable **items** in form of a JSON
- http://loocalhost/api/damage -> requires a body based on the interface FrontendData and returns a JSON that contains the damage dealt
