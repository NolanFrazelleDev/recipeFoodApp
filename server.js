const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

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

}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
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