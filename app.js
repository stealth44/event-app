const express = require ('express')
const exphbs = require ('express-handlebars')
const Handlebars = require ('handlebars')
const {allowInsecurePrototypeAccess} = require ('@handlebars/allow-prototype-access')
const app = express()

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');




const port = process.env.PORT || 4000


app.get('/', (req, res)=>{
    res.render('home', {message: 'Welcome peeps to handlebars!'})
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})

