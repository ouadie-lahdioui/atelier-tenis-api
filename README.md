# L'Atelier Tennis API

### Tools has been used

- Serverless Framework: To simplify deploying and managing the applications on AWS
- Node.js
- TypeScript
- AWS (ApiGateway, Lambda)
- Jest: Testing framwork
- Eslint To easly identify and fix code quality problemes.
- Prettier Code formatter

## How to use?

1. Clone the repository
2. Install dependecies:
```npm install```
3. Run tests:
   ```npm test```
4. Start the project: ```npm start```

## Usage

This project expose three APi endpoints:
- Task n°1: 
    - GET | http://localhost:3000/dev/players
    - OR POST | http://localhost:3000/2015-03-31/functions/get-players/invocations
- Task n°2:
    - GET | http://localhost:3000/dev/players/{id}
    - OR POST | http://localhost:3000/2015-03-31/functions/get-player-by-id/invocations
- Task n°3:
    - GET | http://localhost:3000/dev/players/stats
    - OR POST | http://localhost:3000/2015-03-31/functions/get-players-stats/invocations

- Task n°4:
    -  To deploy this projet on AWS Cloud, you should execute:```npm deploy ```

## License

This project has **no license at all**!  

Built with ❤️ by **Ouadie LAHDIOUI**.  
Feel free to peek and poke.