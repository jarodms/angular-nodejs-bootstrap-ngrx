const express = require('express');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
    helmet({
        noCache: true
    })
);
app.use(
    hsts({
        maxAge: 15552000 // 180 days in seconds
    })
);

// Get all ToDo's
app.get('/api/todos', (req, res) => {
    var options = {
        url: 'http://localhost:3000/todos',
        method: 'GET',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (req.query.id && req.query.id.length > 0) {
        options.url = options.url + "?id=" + req.query.id;
    }

    request(options, (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

// TODO: Dropdown!
app.get('/api/category', (req, res) => {
    request('http://localhost:3000/category', (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

// Add ToDo
app.post('/api/todo', [
    check('title').isLength({ min: 2 }).withMessage('Must be at least 2 chars long'),
    check('description').isLength({ min: 2 }).withMessage('Must be at least 2 chars long'),
], (req, res) => {
    console.log('SERVER ToDo add: ' + req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var options = {
        url: 'http://localhost:3000/todos',
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: req.body
    };

    request.post(options, (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });

});

// Update Todo
app.put('/api/todo', [
    check('title').isLength({ min: 2 }).withMessage('Must be at least 2 chars long'),
    check('description').isLength({ min: 2 }).withMessage('Must be at least 2 chars long'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var options = {
        url: 'http://localhost:3000/todos/' + req.body.id,
        method: 'PUT',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: req.body
    };

    request.put(options, (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});

// Delete Todo
app.delete('/api/todo/:id', (req, res) => {
    var options = {
        url: 'http://localhost:3000/todos/' + req.params.id,
        method: 'DELETE',
    };

    request.delete(options, (err, response, body) => {
        if (response.statusCode <= 500) {
            res.send(body);
        }
    });
});
/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});*/

app.listen('8000', () => {
    console.log('ToDo server starting!');
});