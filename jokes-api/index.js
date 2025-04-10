const express = require('express')
const app = express()
const jokes = [
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I would tell you a construction joke, but I’m still working on it.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What did the ocean say to the beach? Nothing, it just waved.",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
    "How do you organize a space party? You planet.",
    "What do you call fake spaghetti? An impasta!",
    "Why don’t eggs tell jokes? They’d crack each other up.",
    "I'm on a seafood diet. I see food and I eat it."
  ];
app.get('/jokes', (req, res) => {
    const randomIndex = Math.floor(Math.random() * jokes.length)
    res.json({joke: jokes[randomIndex]})
})
app.get('/', (req, res) => {
    res.send('Welcome to the Random Jokes API! Visit /jokes to get a joke.');
  });
app.listen(3000, () => console.log("the server is running in port 3000"));