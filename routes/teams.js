var express = require('express');
var router = express.Router();
const passport = require('passport');

// add reusable middleware function to inject it in our handlers below that need authorization
function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Add GET for index
router.get('/', (req, res, next) => {
   

    Team.find((err, teams) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('teams/index', {  title: 'Teams', 
            dataset: teams,
            user : req.user });
        }
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
    Team.find((err, teams) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('teams/index', { 
                title: 'Teams', 
                dataset: teams,
                user : req.user
            });
        }
    })
});



router.get('/add', IsLoggedIn, function(req, res, next) {
    res.render('teams/add', { 
        title: 'Express',
        user : req.user
    });
  });

  const Team = require('../models/team');

  router.post('/add', IsLoggedIn, function(req, res, next) {
    
    Team.create({
        teamname: req.body.teamname,
        teamcoach: req.body.teamcoach,
        teamleague: req.body.teamleague
    }, (err, newTeam) => {
        if (err) {
            console.log(err);
        }
        else {
            // We can show a successful message by redirecting them to index
            res.redirect('/teams');
        }
    });
});

// GET handler for Delete operations
// :_id is a placeholder for naming whatever is after the / in the path
router.get('/delete/:_id', (req, res, next) => {
    // call remove method and pass id as a json object
    Team.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/teams')
        }
    })
});
  

router.get('/edit/:_id',IsLoggedIn, (req, res, next) => {


    Team.findById(req.params._id, (err, project) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('teams/edit', {
                title: 'Edit a Team',
                team: Team,
                user : req.user 
            });
        }
    })

});

// POST handler for Edit operations
router.post('/edit/:_id',IsLoggedIn, (req,res,next) => {
    // find project based on ID
    // try updating with form values
    // redirect to /Projects
    Team.findOneAndUpdate({_id: req.params._id}, {
        teamname: req.body.teamname,
        teamcoach: req.body.teamcoach,
        teamleague: req.body.teamleague

    }, (err, updatedTeam) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/teams');
        }
    });
});


module.exports = router;
