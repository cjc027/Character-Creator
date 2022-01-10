const Character = require('../models/character');

module.exports = {
    index,
    new: newCharacter,
    create
};

function index(req, res){
    if (req.user) {
        Character.find({userId: req.user._id}, function(err, characterDocs){
            res.render('characters/index', {
                title: 'My Characters',
                characters: characterDocs
            });
        });
    } else {
        res.redirect('/');
    };
};

function newCharacter(req, res){
    if (req.user) {
        res.render('characters/new', {
            title: 'New Character'
        });
    } else {
        res.redirect('/');
    };
};

function create(req, res){
    console.log(req.body);

    if (req.body.subrace === 'Empty'){
        if (req.body.race === 'Dwarf'){
            req.body.subrace = 'Mountain Dwarf'
        } else if (req.body.race === 'Elf'){
            req.body.subrace = 'Wood Elf'
        } else if (req.body.race === 'Halfling'){
            req.body.subrace = 'Lightfoot'
        } else if (req.body.race === 'Gnome'){
            req.body.subrace = 'Rock Gnome'
        }
    } else {
        req.body.subrace = ''
    };

    const newCharacter = {
        name: req.body.name,
        userId: req.user._id,
        race: req.body.race,
        subrace: req.body.subrace,
        class: req.body.class,
        alignment: req.body.alignment,
        characteristics: req.body.characteristics,
        background: req.body.background
    };

    Character.create(newCharacter, function(err, characterDoc){
        console.log(characterDoc);
        res.redirect(`/characters`);
    });
}