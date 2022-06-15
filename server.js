const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'star-wars';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cors())

let recipes = {
    'Unknown': {
        'id': 0,
        'name': 'Unknown',
        'mealType': 'Unknown',
        'mainIngredientCategory': 'Unknown',
        'personalPreference': 0,
        'Ingredients':{
            'Unknown': 0
        },
        'Unknown':{
            'Unknown': 'Unknown'
        }
    },
    'housefries': {
        'id': 1,
        'name': 'houseFries',
        'mealType': 'Breakfast',
        'mainIngredientCategory': 'Potatoes',
        'personalPreference': 6,
        'Ingredients':{
            'Potatoes': '4lbs.',
            'chiliPowder': '1tsp.',
            'onionPowder': '1tb.',
            'garlicPowder': '1tb.',
            'smokedPaprika': '1tb.',
            'cayenePowder': '1/2tsp.',
            'cumin': '1tsp.',
            'oregano': '1tsp.',
            'flour': '1/4cup'
        },
        'Instructions':{
            'step1': 'Wash, peel, wash, dry, and then cube the potatoes',
            'step2': 'Immerse in water to soak for 5-10 minutes',
            'step3': 'Strain, then dry the potatoes',
            'step4': 'Heat up a neutral oil up for deep frying',
            'step5': 'Mix the potatoes with the flour and seasonings',    
            'step6': 'Fry in batches to desired crunch, a golden brown, thin crust suffices. Let cool on a wire rack under some paper napkins',
            'step7': 'Enjoy!'
        }
    },
    'macsauce': {
        'id': 2,
        'name': 'macsauce',
        'mealType': 'Dinner',
        'mainIngredientCategory': 'Pasta',
        'personalPreference': 7,
        'Ingredients':{
            'butter': '4lbs.',
            'flour': '1tsp.',
            'unsweetenedMilk': '1tb.',
            'nutritionalYeast': '1tb.',
            'turmeric': '1tb.',
            'Cheese': '1/2tsp.',
            'Salt ': '1tsp.',
            'Pepper': '1tsp.'
        },
        'Instructions':{
            'step1': 'Melt butter',
            'step2': 'Add flour slowly, whisk; cook for a minute or two',
            'step3': 'Add milk slowly, whisk',
            'step4': 'Add nutritional yeast, turmeric, and other sspices to taste.',
            'step5': 'Get the sauce to slowly bubble, simmer',    
            'step6': 'Pour in 8oz. cheese, whisk',
            'step7': 'Pour over macaroni, then bake, or eat right away. Either way, enjoy!'
        }
    },
    'creamcheese': {
        'id': 3,
        'name': 'creamcheese',
        'mealType': 'breakfast',
        'mealTypeAlt': 'sauces', 
        'mainIngredientCategory': 'Cashews',
        'personalPreference': 6,
        'Ingredients':{
            'cashews': '1cp.',
            'coconutCream': '150g.',
            'lacticAcid': '1tsp.',
            'salt ': '1/2tsp.'
        },
        'Instructions':{
            'step1': 'Pour boiling water over the cashews in a bowl and let sit for twenty minutes',
            'step2': 'In a blender, add coconut cream, lactic acid, salt after the cashews. Blend until creamy.',
            'step3': 'Put into fridge overnight',
            'step4': 'Enjoy!!'
        }
    },
    'tofuScramble': {
        'id': 4,
        'name': 'tofuScramble',
        'mealType': 'breakfast',
        'mealTypeAlt': '', 
        'mainIngredientCategory': 'tofu',
        'personalPreference': 8,
        'Ingredients':{
            'tofuExtraFirm': '16oz.',
            'milk': '1/2cp.',
            'turmeric': '1/2tsp.',
            'blackSalt ': '1/2tsp.',
            'chickenBroth': '1/4tsp.',
            'kappacarragennan': '1/2tsp.',
            'mushroomPowderOrNutrionalYeast': '1tsp.',
            'oliveOil': '1tb.'
        },
        'Instructions':{
            'step1': 'Press and drain tofu for about 20 minutes.',
            'step2': 'Get 2 bowls, one tofu bowl and another for the blend',
            'step3': 'In the blend bowl add milk, turmeric, salt, chicken broth, and kappa.',
            'step4': 'In tofu bowl add tofu and mash with a potato masher.',
            'step5': 'IN tofu bowl add turmeric',
            'step6': 'Mix bowls then add mushroom powder or nutritional yeast.',
            'step7': 'Heat frying pan with olive oil and fry up tofu mixture, let rest for 10 minutes to fluff up.',
            'step8': 'Melt cheese on top and enjoy!!'
        }
    }

}

app.get('/',(request, response)=>{
    db.collection('recipes').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})
app.get('/api/', (request, response) => {
    response.json(recipes)
})
app.get('/api/:dish', (request, response) => {
    const recipesName = request.params.dish.toLowerCase()
    if (recipes[recipesName]){
        response.json(recipes[recipesName])
    } else {
        response.json(recipes['Unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
}) 