const sequelize = require('./database/db');
const Character = require('./database/model/Character');
const Gender =require('./database/model/Gender');
const Movie = require('./database/model/Movie');
//require('./database/asociations');


// Character
const character = [
    { image: "holapeli", age: 1,name:"aino",weight:12,history:"en un mundo de dolor", },
    { image: "holapeli", age: 2,name:"lcuai",weight:2,history:"roto", },
    { image: "holapeli", age: 3,name:"fernando",weight:40,history:"marvel company", },
    { image: "holapeli", age: 4,name:"emanuel",weight:35,history:"docientos pesos perdidos", },

];

// Gender
const gender = [
    { image: "Foo", name: "Acción"},
    { image: "Foo", name: "Ciencia Ficción"},
    { image: "Foo", name: "Comedia"},
    { image: "Foo", name: "No- Ficción"},
    { image: "Foo", name: "Drama"},
    { image: "Foo", name: "Fantasía"},
    { image: "Foo", name: "Musical"},
    { image: "Foo", name: "Suspense"},
    { image: "Foo", name: "Terror"}
];
//Movie
const movie = [
    { image: "Foo", title: "Señor de los anillos",qualification:2},
    { image: "Foo", title: "Pedro capone",qualification:4},
    { image: "Foo", title: "Iron Man",qualification:3,},
    { image: "Foo", title: "Perro 24",qualification:2},
    { image: "Foo", title: "metralleta",qualification:1},

];

sequelize.sync({ force: false }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    // Rellenar direcciones
    character.forEach(character => Character.create(character));
}).then(() => {
    // Rellenar posts
    movie.forEach(movie => Movie.create(movie));
    
}).then(()=>{
    gender.forEach(gender => Gender.create(gender));
})