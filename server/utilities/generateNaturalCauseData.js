
const openai = require('openai');

let responseText;
let userQuestion = "Displacement";
const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            `You are a helpful assistant working for a crowdfunding platform for causes. Your task is to generate a title and a description of a cause based on a reason or a topic. Respond with 12 pairs of title and description. Provide your answer in JSON structure like this {"title": "<The brief title that encapsulates the cause>", "description":"<a 5 to 10 sentence elaboration of the cause such as who it is helping. The peragraph should look like the common description of causes commonly seen in popular crowdsourcing platforms>"}`,
        },
        // *** example start ***
        {
          role: "user",
          content:
            "Provide 12 pairs of title and desc",
        }, 
        {
          role: "assistant",
          content:
            '{"topic": "Premier League location", "question": "Where is the Premier League played?",  "options": {"option1": {"body": "France", "isItCorrect": false}, "option2": {"body": "England", "isItCorrect": true}, "option3": {"body": "Sweden", "isItCorrect": false}}}',
        },
        // *** example end ***
        {
          role: "user",
          content: `Provide 12 pairs of title and description for a cause in a crowdfunding platform whose reason or topic is: ${userQuestion}`,
        },
      ],
    });


    completion.choices[0].forEach(result => {
        responseText = result.message.content;
        console.log(" - ", responseText); // Log the response to the logs
    });


    



/*

    I need this script to save the responses as a line to a file named "responses.tsv".



const openai = require('openai');

let responseText;
let userQuestion = "Displacement";
const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            `You are a helpful assistant working for a crowdfunding platform for causes. Your task is to generate a title and a description of a cause based on a reason or a topic. Respond with 12 pairs of title and description. Provide your answer in JSON structure like this {"title": "<The brief title that encapsulates the cause>", "description":"<a 5 to 10 sentence elaboration of the cause such as who it is helping. The peragraph should look like the common description of causes commonly seen in popular crowdsourcing platforms>"}`,
        },
        {
          role: "user",
          content: `Provide 12 pairs of title and description for a cause in a crowdfunding platform whose reason or topic is: ${userQuestion}`,
        },
      ],
    });


    completion.choices[0].forEach(result => {
        responseText = result.message.content;
        console.log(" - ", responseText); // Log the response to the logs
    });

---

the first column should be the value of 
*/