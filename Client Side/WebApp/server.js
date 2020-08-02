const express = require('express');
const path = require('path')
const cors = require('cors')


const app = express();
app.use(express.json({ extended: false }));
app.use(cors())




app.use('/table', require('./routes/table'));

//serve static assets in prod

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server started on port ${PORT}'));