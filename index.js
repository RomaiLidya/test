var Joi = require('joi');

var express = require('express')
var app = express()
var port = 3800
var bodyParser = require('body-parser');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'memetask'
    },
    debug: true
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    limit: "8mb",
}));


app.get('/', (req, res) => res.send('Hello Meme!'))


app.get('/user', async (req, res ) => {
    try {
        let user = await knex('user');
        res.json(user)
    } catch (e) {
        console.log(e);
    }
})
//Soal Nomor 1.
app.post('/user/register', async (req, res) => {
   var schema={
    username:Joi.string().required(),
    password:Joi.string().required()
   };

   var result = Joi.validate(req.body, schema);
       if (result.error){
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;

    }
    try {
        let username = req.body.username;
        let password = req.body.password;
           
       
       let id = await knex('user').insert({
             "username": username,
            "password": password
            
        
           
        })
        res.json({
            id: id[0],
            username, 
            password
            
          
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})

//soal Nomor 2
app.post('/usertask/assign', async (req, res) => {
    try {
      
        let username = req.body.user_fk;
        let name = req.body.task_fk;

       
      //  let id= await knex('usertask').insert ({
      //  "user_fk": user_fk,
        //"task_fk" :task_fk
      // })
                        
        
        res.json({
            id: id[0],
            username : req.body.user_fk,
            name : req.body.task_fk
            
          
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})


//Soal No 3
app.delete('/usertask/:id', async (req, res) => {
    try {
        let id = req.params.id;
        
        await knex('usertask').where('id', id).del()        
        res.json({
            id,
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
})

//Soal No 4
app.get('/usertask/task/common', async (req, res ) => {
    try {
        let usertask = await knex('usertask');
        res.json(usertask)
    } catch (e) {
        console.log(e);
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))