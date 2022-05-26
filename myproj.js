const express=require('express')
const res = require('express/lib/response')

const mysql=require('mysql2')

const app=express()

// Create a connex=ction to mysql server

const db=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'gourav',
    database:'nodeandsql'
})


// Connect
db.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log('Mysql connected..')
})


app.get('/createdb',(req,res)=>{
    let sql="CREATE DATABASE nodesql"
    db.query(sql,(err,result)=>{
        if(err)  throw err
    //  console.log(err)
     else
        res.send('Database created..')
    })
})


app.get('/createpoststable',(req,res)=>{
    let sql='CREATE TABLE posts(id int,title VARCHAR(255),body VARCHAR(255) PRIMARY KEY)'

    db.query(sql,(err)=>{
        if(err)
        console.log(err)
        else
        res.send('Table created..')
    })
})


app.get('/addrow',(req,res)=>{
    let sql='INSERT INTO posts(id,title,body) VALUES (1,"First post","HELLO EVERYBODY, THIS IS MY FIRST POST HERE")'

    db.query(sql,(err)=>{
        if(err)
        console.log(err)
        else
        res.send('New row created..')
    })
})


app.get('/getallposts',(req,res)=>{
    let sql='SELECT * FROM posts'

    let query=db.query(sql,(err,results)=>{
        if(err)
        console.log(err)
        else
        {
        res.send(results)
        console.log(results[0])
        }
    })
   
})

app.get('/getpost/:id',(req,res)=>{
    let sql='SELECT * FROM posts WHERE id= ${req.params.id}'

    let query=db.query(sql,(err)=>{
        if(err)
        console.log(err)
        else
        res.send('REQUIRED POST ..')
        
    })
    console.log(res)
})


app.listen(process.env.PORT||1234,()=>{
    console.log('Server started at port 1234')
})