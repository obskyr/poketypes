/*

    ###############################################
    ##                                           ##
    ## TABLE OF CONTENTS:                        ##
    ##   0 - Type assets                         ##
    ##       0.0 - List of types                 ##
    ##       0.1 - Object with type advantages      ##
    ##       0.2 - Object with type defenses     ##
    ##   1 - Useful fuctions                     ##
    ##       1.0 - List + object returns         ##
    ##       1.1 - Return functions              ##
    ##                                           ##
    ###############################################
    
    ...Yes, there is a table of contents. I wrote this code ages ago, okay?
    This is actually a port of pokehelp.py, which you can find on my GitHub!

    0     TYPE ASSETS

    0.0   LIST OF TYPES
*/

// Help functions for later

function toTitleCase(s) {
    return s.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
};
function multiplyArray(arr) {
    result = 1;
    for (var i = 0; i < arr.length; i++) {
        result *= arr[i]
        if (arr[i] === 0) {
            break;
        };
    };
    return result;
};

// ---


var typel = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
var typellc = [];
for (var i = 0; i < typel.length; i++){
    typellc.push(typel[i].toLowerCase());
}

// 0.1   OBJECT WITH TYPE ADVANTAGES
    
typeobj = {
    'Normal':   { // NorTD
        2.0: [],
        1.0: typel.slice(0, 12).concat(typel.slice(14, 16), ['Fairy']),
        0.5: ['Rock', 'Steel'],
        0.0: ['Ghost']
    },
    'Fire':     { // FirTD
        2.0: ['Grass', 'Ice', 'Bug', 'Steel'],
        1.0: ['Normal', 'Electric'].concat(typel.slice(6, 11), ['Ghost', 'Dark', 'Fairy']),
        0.5: ['Fire', 'Water', 'Rock', 'Dragon'],
        0.0: []
    },
    'Water':    { // WatTD
        2.0: ['Fire', 'Ground', 'Rock'],
        1.0: ['Normal', 'Electric', 'Ice', 'Fighting', 'Poison', 'Flying', 'Psychic', 'Bug', 'Ghost', 'Steel', 'Fairy'],
        0.5: ['Water', 'Grass', 'Dragon'],
        0.0: []
    },
    'Electric': { // EleTD
        2.0: ['Water', 'Flying'],
        1.0: ['Normal', 'Fire', 'Ice', 'Fighting', 'Poison', 'Psychic','Bug', 'Rock', 'Ghost', 'Dark', 'Steel', 'Fairy'],
        0.5: ['Electric', 'Grass', 'Dragon'],
        0.0: ['Ground']
    },
    'Grass':    { // GraTD
        2.0: ['Water', 'Ground','Rock'],
        1.0: ['Normal', 'Electric', 'Ice', 'Fighting', 'Psychic', 'Ghost', 'Dark', 'Fairy'],
        0.5: ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
        0.0: []
    },
    'Ice':      { // IceTD
        2.0: ['Grass', 'Ground', 'Flying', 'Dragon'],
        1.0: ['Normal', 'Electric', 'Fighting', 'Poison', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Fairy'],
        0.5: ['Fire', 'Water', 'Ice', 'Steel'],
        0.0: []
    },
    'Fighting': { // FigTD
        2.0: ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
        1.0: ['Fire', 'Water', 'Electric', 'Grass', 'Fighting', 'Ground', 'Dragon'],
        0.5: ['Poison', 'Flying', 'Psychic', 'Bug', 'Fairy'],
        0.0: ['Ghost'],
    },
    'Poison':   { // PoiTD
        2.0: ['Grass', 'Fairy'],
        1.0: ['Normal', 'Fire', 'Water', 'Electric', 'Ice', 'Fighting', 'Flying', 'Psychic', 'Bug', 'Dragon', 'Dark',],
        0.5: ['Poison', 'Ground', 'Rock', 'Ghost'],
        0.0: ['Steel'],
    },
    'Ground':   { // GroTD
        2.0: ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'],
        1.0: ['Normal', 'Water', 'Ice', 'Fighting', 'Ground', 'Psychic', 'Ghost', 'Dragon', 'Dark'],
        0.5: ['Grass', 'Bug'],
        0.0: ['Flying'],
    },
    'Flying':   { // FlyTD
        2.0: ['Grass', 'Fighting', 'Bug'],
        1.0: ['Normal', 'Fire', 'Water', 'Ice', 'Poison', 'Ground', 'Flying', 'Psychic', 'Ghost', 'Dragon', 'Dark', 'Fairy'],
        0.5: ['Electric', 'Rock', 'Steel'],
        0.0: [],
    },
    'Psychic':  { // PsyTD
        2.0: ['Fighting', 'Poison'],
        1.0: typel.slice(0, 6).concat(['Ground', 'Flying', 'Bug', 'Rock', 'Ghost', 'Dragon','Fairy']),
        0.5: ['Psychic', 'Steel'],
        0.0: ['Dark'],
    },
    'Bug':      { // BugTD
        2.0: ['Grass', 'Psychic', 'Dark'],
        1.0: ['Normal', 'Water', 'Electric', 'Ice', 'Ground', 'Bug', 'Rock', 'Dragon'],
        0.5: ['Fire', 'Fighting', 'Poison', 'Flying', 'Ghost', 'Steel', 'Fairy'],
        0.0: [],
    },
    'Rock':     { // RocTD
        2.0: ['Fire', 'Ice', 'Flying', 'Bug'],
        1.0: ['Normal', 'Water', 'Electric', 'Grass', 'Poison', 'Psychic', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Fairy'],
        0.5: ['Fighting', 'Ground', 'Steel'],
        0.0: [],
    },
    'Ghost':    { // GhoTD
        2.0: ['Psychic', 'Ghost'],
        1.0: typel.slice(1, 10).concat(['Bug', 'Rock', 'Dragon', 'Steel', 'Fairy',]),
        0.5: ['Dark'],
        0.0: ['Normal'],
    },
    'Dragon':   { // DraTD
        2.0: ['Dragon'],
        1.0: typel.slice(0, 14).concat(['Dark']),
        0.5: ['Steel'],
        0.0: ['Fairy'],
    },
    'Dark':     { // DarTD
        2.0: ['Psychic', 'Ghost'],
        1.0: typel.slice(0, 6).concat(['Poison', 'Ground', 'Flying', 'Bug', 'Rock', 'Dragon', 'Steel']),
        0.5: ['Fighting', 'Dark', 'Fairy'],
        0.0: [],
    },
    'Steel':    { // SteTD
        2.0: ['Ice', 'Rock', 'Fairy'],
        1.0: ['Normal', 'Grass'].concat(typel.slice(6, 12), ['Ghost', 'Dragon', 'Dark']),
        0.5: ['Fire', 'Water', 'Electric', 'Steel'],
        0.0: [],
    },
    'Fairy':    { // FaiTD
        2.0: ['Fighting', 'Dragon', 'Dark'],
        1.0: ['Normal', 'Water', 'Electric', 'Grass', 'Ice', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Fairy'],
        0.5: ['Fire', 'Poison', 'Steel'],
        0.0: [],
    },
};

//    0.2   OBJECT WITH TYPE DEFENSES

var typedefobj = { // It's out of order, but it's an object, so IT DOESN'T MATTER! HA-HO!
    'Ghost': {
        0.5: ['Poison', 'Bug'],
        1.0: ['Electric', 'Fire', 'Psychic', 'Flying', 'Ice', 'Dragon', 'Water', 'Steel', 'Rock', 'Fairy', 'Grass', 'Ground'],
        2.0: ['Ghost', 'Dark'],
        0.0: ['Normal', 'Fighting']
        },
    'Dark': {
        0.5: ['Ghost', 'Dark'],
        1.0: ['Poison', 'Electric', 'Normal', 'Fire', 'Flying', 'Ice', 'Dragon', 'Steel', 'Rock', 'Grass', 'Ground', 'Water'],
        2.0: ['Fighting', 'Fairy', 'Bug'],
        0.0: ['Psychic']
        },
    'Poison': {
        0.5: ['Poison', 'Fighting', 'Fairy', 'Grass', 'Bug'],
        1.0: ['Ghost', 'Dark', 'Electric', 'Normal', 'Fire', 'Flying', 'Ice', 'Dragon', 'Water', 'Steel', 'Rock'],
        2.0: ['Psychic', 'Ground'],
        0.0: []
        },
    'Electric': {
        0.5: ['Electric', 'Flying', 'Steel'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Normal', 'Fire', 'Psychic', 'Ice', 'Dragon', 'Water', 'Fighting', 'Rock', 'Fairy', 'Grass', 'Bug'],
        2.0: ['Ground'],
        0.0: []
        },
    'Normal': {
        0.5: [],
        1.0: ['Dark', 'Poison', 'Electric', 'Normal', 'Fire', 'Psychic', 'Flying', 'Ice', 'Dragon', 'Water', 'Steel', 'Rock', 'Fairy', 'Grass', 'Bug', 'Ground'],
        2.0: ['Fighting'],
        0.0: ['Ghost']
        },
    'Fire': {
        0.5: ['Fire', 'Ice', 'Steel', 'Fairy', 'Grass', 'Bug'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Electric', 'Normal', 'Psychic', 'Flying', 'Dragon', 'Fighting'],
        2.0: ['Water', 'Rock', 'Ground'],
        0.0: []
        },
    'Psychic': {
        0.5: ['Psychic', 'Fighting'],
        1.0: ['Poison', 'Electric', 'Normal', 'Fire', 'Flying', 'Ice', 'Dragon', 'Water', 'Steel', 'Rock', 'Fairy', 'Grass', 'Ground'],
        2.0: ['Ghost', 'Dark', 'Bug'],
        0.0: []
        },
    'Flying': {
        0.5: ['Fighting', 'Grass', 'Bug'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Normal', 'Fire', 'Psychic', 'Flying', 'Dragon', 'Water', 'Steel', 'Fairy'],
        2.0: ['Electric', 'Ice', 'Rock'],
        0.0: ['Ground']
        },
    'Ice': {
        0.5: ['Ice'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Electric', 'Normal', 'Psychic', 'Flying', 'Dragon', 'Water', 'Fairy', 'Grass', 'Bug', 'Ground'],
        2.0: ['Fire', 'Fighting', 'Steel', 'Rock'],
        0.0: []
        },
    'Dragon': {
        0.5: ['Electric', 'Fire', 'Water', 'Grass'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Normal', 'Psychic', 'Flying', 'Fighting', 'Steel', 'Rock', 'Bug', 'Ground'],
        2.0: ['Ice', 'Dragon', 'Fairy'],
        0.0: []
        },
    'Water': {
        0.5: ['Fire', 'Ice', 'Water', 'Steel'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Normal', 'Psychic', 'Flying', 'Dragon', 'Fighting', 'Rock', 'Fairy', 'Bug', 'Ground'],
        2.0: ['Electric', 'Grass'],
        0.0: []
        },
    'Fighting': {
        0.5: ['Dark', 'Rock', 'Bug'],
        1.0: ['Ghost', 'Poison', 'Electric', 'Normal', 'Fire', 'Ice', 'Dragon', 'Water', 'Fighting', 'Steel', 'Grass', 'Ground'],
        2.0: ['Psychic', 'Flying', 'Fairy'],
        0.0: []
        },
    'Steel': {
        0.5: ['Normal', 'Psychic', 'Flying', 'Ice', 'Dragon', 'Steel', 'Rock', 'Fairy', 'Grass', 'Bug'],
        1.0: ['Electric', 'Water', 'Ghost', 'Dark'],
        2.0: ['Fire', 'Fighting', 'Ground'],
        0.0: ['Poison']
        },
    'Rock': {
        0.5: ['Poison', 'Normal', 'Fire', 'Flying'],
        1.0: ['Ghost', 'Dark', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Rock', 'Fairy', 'Bug'],
        2.0: ['Water', 'Fighting', 'Steel', 'Grass', 'Ground'],
        0.0: []
        },
    'Fairy': {
        0.5: ['Dark', 'Fighting', 'Bug'],
        1.0: ['Ghost', 'Electric', 'Normal', 'Fire', 'Psychic', 'Flying', 'Ice', 'Water', 'Rock', 'Fairy', 'Grass'],
        2.0: ['Poison', 'Steel'],
        0.0: ['Dragon']
        },
    'Grass': {
        0.5: ['Electric', 'Water', 'Grass', 'Ground'],
        1.0: ['Ghost', 'Dark', 'Normal', 'Psychic', 'Dragon', 'Fighting', 'Steel', 'Rock', 'Fairy'],
        2.0: ['Poison', 'Fire', 'Flying', 'Ice', 'Bug'],
        0.0: []
        },
    'Bug': {
        0.5: ['Fighting', 'Grass', 'Ground'],
        1.0: ['Ghost', 'Dark', 'Poison', 'Electric', 'Normal', 'Psychic', 'Ice', 'Dragon', 'Water', 'Steel', 'Fairy', 'Bug'],
        2.0: ['Fire', 'Rock', 'Flying'],
        0.0: []
        },
    'Ground': {
        0.5: ['Poison', 'Rock'],
        1.0: ['Ghost', 'Dark', 'Normal', 'Fire', 'Psychic', 'Flying', 'Dragon', 'Fighting', 'Steel', 'Fairy', 'Bug', 'Ground'],
        2.0: ['Ice', 'Water', 'Grass'],
        0.0: ['Electric']
        }
};

var effectivityTexts = {
    6.0: "super effective",
    4.0: "super effective",
    3.0: "super effective",
    2.0: "super effective",
    1.5: "normal damage",
    1.0: "normal damage",
    0.75: "not very effective",
    0.5: "not very effective",
    0.375: "not very effective",
    0.25: "not very effective",
    0: "no effect"
};

//    1     USEFUL FUNCTIONS

//    1.0   LIST + DICTIONARY RETURNS

function typeadv(typec){
    /* Returns 4 lists about the type typec. */
    var x = typeobj[toTitleCase(typec)];
    return [x[2.0], x[1.0], x[0.5], x[0.0]];
}
function typedef(typec){
    /* Returns 4 lists about the type typec. */
    var x = typedefobj[toTitleCase(typec)];
    return [x[2.0], x[1.0], x[0.5], x[0.0]];
}
function typed(typec, td) {
    /* Returns 4 lists about the type typec, from dictionary td. */
    td = typeof td !== 'undefined' ? td : typeobj;
    var x = td[toTitleCase(typec)];
    return [x[2.0], x[1.0], x[0.5], x[0.0]];
}

// The D functions mostly save some typing.
function typeadvD(typec) {
    /* Returns a dict about the type typec. */
    var x = typeobj[toTitleCase(typec)];
    return x;
}
function typedefD(typec) {
    /* Returns a dict about the type typec. */
    var x = typedefobj[toTitleCase(typec)];
    return x;
}
function typedD(typec, td) {
    /* Returns a dict about the type typec, from dictionary td. */
    td = typeof td !== 'undefined' ? td : typedefobj;
    var x = td[toTitleCase(typec)];
    return x;
}

// 1.2   RETURN FUNCTIONS

function typegen(typelist) {
    /* Generates a random type. */
    typelist = typeof typelist !== 'undefined' ? typelist : typel;
    return randomChoice(typelist);
}

function attackEffectivity(atype, dtypes, STAB) {
    /* Returns the attack effectivity of atype against the types in the array dtypes, with optional STAB. */    
    dtypes = typeof dtypes !== 'string' ? dtypes : [dtypes];
    STAB = typeof STAB !== 'undefined' ? STAB : 1.0;
    atype = toTitleCase(atype);
    dtypes = dtypes.map(function(v) {return toTitleCase(v)});
    dtypes = dtypes.filter(function(val, index, self) { // Check for duplicates.
        return self.indexOf(val) === index && val.length;
    });
    
    effects = [];
    
    for (var i = 0; i < dtypes.length; i++) { // Puts all of the effects atype has on the respective types in dtypes in the effects array.
        for (var effect in typedefD(dtypes[i])) {
            if (typedefD(dtypes[i]).hasOwnProperty(effect)) {
                var curDefObj = typedefD(dtypes[i]);
                var curDefArr = curDefObj[effect];
                if (curDefArr.indexOf(atype) > -1) {
                    effects.push(effect);
                    break;
                };
            };
        };
    };
    
    return multiplyArray(effects) * STAB;
}
