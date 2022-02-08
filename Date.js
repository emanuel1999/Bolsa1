const sequelize = require('./database/db');
const Character = require('./database/model/Character');
const Gender =require('./database/model/Gender');
const { create } = require('./database/model/Movie');
const Movie = require('./database/model/Movie');
require('./database/associations');


// Gender
const gender = [
    { name: "adventure", image: "adventure.jpg" },
    { name: "comedy", image: "comedy.jpg" },
    { name: "horror", image: "horro.jpg" },
    { name: "drama", image: "drama.jpg" },
    { name: "mistery", image: "mistery.jpg" },
    { name: "fantasy", image: "fantasy.jpg" },
    { name: "sciencie fiction", image: "sciencief.jpg" },
    { name: "thriller", image: "thriller.jpg" }
]  
//Movie


sequelize.sync({ force: false }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    //gender.forEach(gender => Gender.create(gender));
    
}).then( async () => {
  let movie1 = await Movie.create(
    {
      title: "Encanto",
      date: "2021-11-24",
      qualification: 3,
      image: "encanto.jpg",
      gender_id: 1,
      characters:[
        {image:"pedro.png",name:"pedrito",weight:121,age:21,history: "en un mundo de fantasias"},
        {image:"ema.png",name:"jorge",weight:122,age:22,history: "en un mundo de kaka"},
      ]
    },{ include:"characters"}
    
  );
  let char1= await Character.create({
    image:"pedro.png",name:"pedrito",weight:121,age:21,history: "en un mundo de fantasias"
  })
  let char2= await Character.create({
    image:"pedro.png",name:"juanse",weight:121,age:21,history: "en un mundo de laostea"
  })
  let movie2= await Movie.create(
    {title: "Encanto",
      date: "2021-11-24",
      qualification: 3,
      image: "encanto.jpg",
      gender_id: 4}
  )
  movie2.addCharacters([char1,char2])
  /*const char1= await Character.create(
    {
      image:"encanto.png",
      name:"ema",
      age:21,
      weight:121,
      history:"en un lugar feliz",
      movies:[
        {
          title: "Encanto",
          date: "2021-11-24",
          qualification: 3,
          image: "encanto.jpg",
          gender_id: "1",
        }
      ]
    },{
      include:"movies"
    }
  )*/

    }).catch(err=>{
      console.log(err);
    })