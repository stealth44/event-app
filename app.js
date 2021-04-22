const express = require ('express')
const exphbs = require ('express-handlebars')
const bodyParser = require ('body-parser')
const Handlebars = require ('handlebars')
const models = require ('./db/models')
const methodOverride= require('method-override')
const router = new express.Router()
const eventRouter = require ('./routers/eventRouter')
const {allowInsecurePrototypeAccess} = require ('@handlebars/allow-prototype-access')


const app = express()
const port = process.env.PORT || 4000

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(router)
app.use(eventRouter)







app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

