const express = require('express')
const multer = require('multer')
const { Router } = express

const PORT = 8080

const app = express()
const productos = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let productsArray = [
    {
        "title": 'lavadora',
        "price": 2990,
        "thumbnail": 'http://www.google.cl',
        "id": 1
    },
    {
        "title": 'perro',
        "price": 5990,
        "thumbnail": 'http://www.google.cl',
        "id": 2
    }
]

let id = productsArray.length + 1

app.get('/', function(req,res,next){
    res.send(productsArray)
})

app.get('/:id', function(req,res,next){
    

    if (productsArray.find(archivo => archivo.id == req.params.id) == null) {
        res.send({ error : 'producto no encontrado' })
    } else {        
    res.send(productsArray.find(archivo => archivo.id == req.params.id))
    }

   
})

app.post('/', function(req,res,next){
    const productAdd = req.body
    productsArray.push({...productAdd, "id": id})
    id++
    res.send(productsArray)
})

app.put('/:id', function(req,res,next){
        
    productsArray = arrayRemove(productsArray, req.params.id);
    const productAdd = req.body
    productsArray.push({...productAdd, "id": req.params.id})
    res.send(productsArray)
})


app.delete('/:id', function(req,res,next){
        
    productsArray = arrayRemove(productsArray, req.params.id);
    res.send(productsArray)
})


app.use('/api/productos', productos)

app.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`)
})

app.use('/static', express.static('public'))

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele.id != value; 
    });
}

