
const express = require(`express`)//get,post we use now
const cors = require(`cors`)
const http = require(`http`) // url


 

let app = express()
app.use(cors())
app.use(express.json())



 app.use('/api/days', require('./routes/day'))
 app.use('/api/hours', require('./routes/hours'))
 app.use('/api/medical', require('./routes/medicalFile'))
 app.use('/api/reviews', require('./routes/reviews'))
 app.use('/api/users', require('./routes/users'))




const PORT = process.env.PORT || 5000
process.setMaxListeners(100)


const server = http.createServer(app)
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })
