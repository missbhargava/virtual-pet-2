var dog, dogi ;
var happyDog, happyDogi;
var database;
var foodS;
var foodStock;
var feedPet;
var addFood;
var fedTime;
var lastFed;
var foodObj
function preload()
{
  dogi = loadImage("images/Dog.png");
  happyDogi = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodObj = new Food()

  dog = createSprite(250,400);
  dog.addImage(dogi);
  dog.scale = 0.15;

  // happyDog = createSprite()
  // happyDog = addImage(happyDogi);
  // happyDogi.scale = 1

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedPet = createButton("Feed The Dog")
  feedPet.position(500,50);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(600,50);
  addFood.mousePressed(AddFood);

}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fill("white");
  text("FOOD REMAINING: " + foodS, 170,290);

  
  // fill("white");
  // text("Press UP Arrow To Feed The Dog", 170,350);

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed===0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed: "+ lastFed + "AM",350,30)
  }

  foodObj.updateFoodStock(foodS)
  drawSprites();

}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1
  }
   database.ref('/').update({
     Food: x
   })
}

function readStock (data){
  foodS = data.val();
  //foodObj.updatefoodStock(foodS)
  // dog.x = dogPosition.x
}

function AddFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDogi);
  if(foodS >= 1){
    foodS = foodS - 1
  }

  //foodObj.updateFoodStock(foodObj.getFoodStock()- 1);
  database.ref('/').update({
    Food : foodS,
    feedTime:hour()
  })
}

