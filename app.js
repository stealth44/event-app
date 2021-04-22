const express = require ('express')
const exphbs = require ('express-handlebars')
const bodyParser = require ('body-parser')
const Handlebars = require ('handlebars')
const models = require ('./db/models')
const {allowInsecurePrototypeAccess} = require ('@handlebars/allow-prototype-access')
const app = express()

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))






app.post('/events', (req, res)=>{
  models.Event.create(req.body).then(event =>{
    res.redirect(`/events/${event.id}`)
   }).catch(e =>{
    console.log(e)
   })
})


app.get('/', (req, res)=>{
  models.Event.findAll().then( (events) =>{
    res.render('events-index', { events: events })
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

  // INDEX
  app.get('/events', (req, res) => {
    res.render('events-index', { events: events });
  })




const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

