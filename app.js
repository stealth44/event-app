const express = require ('express')
const exphbs = require ('express-handlebars')
const bodyParser = require ('body-parser')
const Handlebars = require ('handlebars')
const models = require ('./db/models')
const methodOverride= require('method-override')
const {allowInsecurePrototypeAccess} = require ('@handlebars/allow-prototype-access')
const app = express()

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))






app.post('/events', (req, res)=>{
  models.Event.create(req.body).then(event =>{
    res.redirect(`/events/${event.id}`)
   }).catch(e =>{
    console.log(e)
   })
})

//INDEX
app.get('/', (req, res)=>{
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then( (events) =>{
    res.render('events-index', { events: events })
  }).catch((e)=>{
    console.log(e)
  })
    
})


//EDIT
app.get('/events/:id/edit', (req, res)=>{
    models.Event.findByPk(req.params.id).then((event)=>{
      res.render('events-edit', {event:event})
    }).catch((e)=>{
      console.log(e)
    })
})




  // NEW
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})
  

 

//show
app.get('/events/:id', (req, res) => {
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

app.put('/events/:id', (req, res)=>{
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
app.delete('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.destroy()
    res.redirect(`/`)
  }).catch((err) => {
    console.log(err)
  })
})

const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

