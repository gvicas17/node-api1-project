const express = require('express')

const server = express()

const user = require('./user')

server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

server.get('/api/users', (req, res) => {
    user.findAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({message: 'The users information could not be retrieved'})
    })
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    user.findById(id)
    .then(users => {
      if(!users){
          res.status(404).json({message: 'The user with the specified ID does not exist'})
      } else {
          res.status(200).json(users)
      }
})
.catch(error => {
   res.status(500).json({message: 'The user information could not be retrieved'})       
})
})

server.post('/api/users', async (req, res) => {
    const User = req.body
    if(!User.name || !User.bio){
        res.status(400).json({message: 'Please provide name and bio for the user'})
    } else {
        try{
            const newlyCreated = await user.create(User)
            res.status(201).json(newlyCreated)
        }catch(error) {
            res.status(500).json({message: 'There was an error while saving the user to the database'})
        }
    } 
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    user.delete(id)
    .then(deleted => {
        if (!deleted) {
            res.status(404).json({ message: 'The user with the spcified ID does not exist'})
        } else {
            res.status(200).json(deleted)
        }
    })
    .catch(error => {
        res.status(500).json({message: 'The user could not be removed'})
    })
})
server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id
    const changes = req.body
    if(!changes.name || changes.bio){
        res.status(400).json({ message: 'The user with the specifed ID does not exist'})
    } else {
        try{
            const updated = await user.update(id, changes)
            if(!updated){
                res.status(404).json({message: 'The user with the spcified ID does not exist'})
            }else{
                res.status(200).json(updated)
            }
        }  catch(error){
            res.status(500).json({message: 'The user information could not be modified'})
        }
    }
})

module.exports = server