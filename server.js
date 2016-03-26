'use strict';

var express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    _               = require('underscore'),
    session         = require('express-session');

var app = express();
app.set('views', './views');
app.use(express.static('public'));
app.use(logger('combined'));
app.use(session({
    secret: 'musessions',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2592000000
    }
}));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    { username: 'tumbler', password: 'WBush', first_name: 'George', last_name: 'Bush', primary_email: 'decider@bush2.com' },
    { username: 'eagle', password: 'BlueDress', first_name: 'William', last_name: 'Clinton', primary_email: 'slickwilly@clinton.com' },
    { username: 'renegade', password: 'yeswecan', first_name: 'Barak', last_name: 'Obama', primary_email: 'nearly.done@potus.gov' },
    { username: 'timberwolf', password: 'nobroccoli', first_name: 'George', last_name: 'Bush', primary_email: 'nogonnadoit@bush1.com' },
    { username: 'rawhide', password: 'lovenancy', first_name: 'Ronald', last_name: 'Reagan', primary_email: 'gipper@reagan.com' }
];

var plans = [];


// Handle POST to create a user session
app.post('/v1/session', function(req, res) {
    if (!req.body || !req.body.username || !req.body.password) {
        res.status(400).send({ error: 'username and password required' });
    } else {
        var user = _.findWhere(users, { username: req.body.username.toLowerCase() });
        if (!user || user.password !== req.body.password) {
            if (user) console.log('It the password: ' + user.password + ' vs. ' + req.body.password);
            else console.log('No user found: ' + req.body.username);
            res.status(401).send({ error: 'unauthorized' });
        } else {
            res.status(201).send({
                username:       user.username,
                primary_email:  user.primary_email
            });
        }
    }
});

// Handle POST to create a new user account
app.post('/v1/user', function(req, res) {
    var data = req.body;
    if (!data || !data.username || !data.password || !data.first_name || !data.last_name || !data.primary_email) {
        res.status(400).send({ error: 'username, password, first_name, last_name and primary_email required' });
    } else {
        var user = _.findWhere(users, { username: data.username.toLowerCase() });
        if (user) {
            res.status(400).send({ error: 'username already in use' });
        } else {
            var newUser = _.pick(data, 'username', 'first_name', 'last_name', 'password', 'dob', 'address_street', 'address_city', 'address_state', 'address_zip', 'primary_phone', 'primary_email');
            users.push(newUser);
            res.status(201).send({
                username:       data.username,
                primary_email:  data.primary_email
            });
        }
    }
});

// Handle GET to fetch user information
app.get('/v1/user/:username', function(req, res) {
    var user = _.findWhere(users, { username: req.params.username.toLowerCase() });
    if (!user) {
        res.status(404).send({ error: 'unknown user' });
    } else {
        user = _.pick(user, 'username', 'first_name', 'last_name', 'dob', 'address_street', 'address_city', 'address_state', 'address_zip', 'primary_phone', 'primary_email');
        res.status(200).send(user);
    }
});


app.get('/map', function(req, res) {
    //res.render('map', {});
    res.status(200);
});


app.get('/profile', function(req, res) {
    //res.render('profile', {});
    res.status(200);
});

app.get('/', function(req, res) {
    //res.render('index', {});
    res.status(200);
});

app.get('/login', function(req, res) {
    //res.render('login', {});
    res.status(200);
});

app.get('/signup', function(req, res) {
    //res.render('signup', {});
    res.status(200);
});

// Flight plan fields:
//  1. TYPE as type
//  2. AIRCRAFT IDENTIFICATION as ident
//  3. AIRCRAFT TYPE / SPECIAL EQUIPMENT as special_equip
//  4. TRUE AIRSPEED as true_airspeed
//  5. DEPARTURE POINT as departure
//  6a. DEPARTURE TIME PROPOSED as dept_time_proposed
//  6b. DEPARTURE TIME ACTUAL as dept_time_actual
//  7. CRUISING ALTITUDE as cruise_alt
//  8. ROUTE OF FLIGHT as route
//  9. DESTINATION (Name of airport and city) as dst
//  10. EST. TIME ENROUTE as ete
//  11. REMARKS as remarks
//  12. FUEL ON BOARD as fuel
//  13. ALTERNATE AIRPORT(S) as alt_airports
//  14. PILOT'S NAME, ADDRESS & TELEPHONE NUMBER & AIRCRAFT HOME BASE as name
//  15. NUMBER ABOARD as num_aboard
//  16. COLOR OF AIRCRAFT as color
//  17. DESTINATION CONTACT/TELEPHONE (OPTIONAL) as dst_contact

// Handle POST to create a new flight plan
app.post('/v1/plan', function(req, res) {
    var data = req.body;
    if (!data ||
        !data.type ||
        !data.ident ||
        !data.special_equip ||
        !data.true_airspeed ||
        !data.departure ||
        !data.dept_time_proposed ||
        !data.dept_time_actual ||
        !data.cruise_alt ||
        !data.route ||
        !data.dst ||
        !data.ete ||
        !data.remarks ||
        !data.fuel ||
        !data.alt_airports ||
        !data.name ||
        !data.num_aboard ||
        !data.color ||
        !data.dst_contact) {
        res.status(400).send({ error: 'all form fields required' });
    } else {
        var newPlan = _.pick(data, 'type', 'ident', 'special_equip', 'true_airspeed', 'departure', 'dept_time_proposed', 'dept_time_actual', 'cruise_alt',
            'route', 'dst', 'ete', 'remarks', 'fuel', 'alt_airports', 'name', 'num_aboard', 'color', 'dst_contact');
        newPlan = _.extend(newPlan, { id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) });
        plans.push(newPlan);
        res.status(201).send({
            planid: newPlan.id
        });
    }
});

// Handle GET to fetch flight plan information
app.get('/v1/plan/:id', function(req, res) {
    var plan = _.findWhere(plans, { id: req.params.id.toLowerCase() });
    if (!plan) {
        res.status(404).send({ error: 'unknown flight plan' });
    } else {
        res.status(200).send(plan);
    }
});


var server = app.listen(8080, function () {
    console.log('Example app listening on ' + server.address().port);
});