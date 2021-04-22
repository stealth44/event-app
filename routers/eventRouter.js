const models = require('../db/models/')
const express = require ('express')
const router = new express.Router()


//Create
router.post('/events', (req, res)=>{
    models.Event.create(req.body).then(event =>{
      res.redirect(`/events/${event.id}`)
     }).catch(e =>{
      console.log(e)
     })
  })
  
  //INDEX
  router.get('/', (req, res)=>{
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then( (events) =>{
      res.render('events-index', { events: events })
    }).catch((e)=>{
      console.log(e)
    })
      
  })
  
  
  //EDIT
  router.get('/events/:id/edit', (req, res)=>{
      models.Event.findByPk(req.params.id).then((event)=>{
        res.render('events-edit', {event:event})
      }).catch((e)=>{
        console.log(e)
      })
  })
  
  
  
  
    // NEW
  router.get('/events/new', (req, res) => {
    res.render('events-new', {});
  })
    
  
   
  
  //show
  router.get('/events/:id', (req, res) => {
    // Search for the event by its id that was passed in via req.params
    models.Event.findByPk(req.params.id).then((event) => {
      // If the id is for a valid event, show it
      res.render('events-show', { event: event })
    }).catch((err) => {
      // if they id was for an event not in our db, log an error
      console.log(err.message);
    })
  })
  
  
  //UPDATE
  
  router.put('/events/:id', (req, res)=>{
    models.Event.findByPk(req.params.id).then((event)=>{
      event.update(req.body).then((event)=>{
      res.render('events-show', {event:event})
      }).catch((e)=>{
        console.log(e.message)
      })
    }).catch((e)=>{
      console.log(e.message)
    })
  })
  
   
  //DELETE
  router.delete('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.destroy()
      res.redirect(`/`)
    }).catch((err) => {
      console.log(err)
    })
  })
  



module.exports = router