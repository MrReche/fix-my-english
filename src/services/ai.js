const COHERE_API_URL = "https://api.cohere.ai/generate"
const COHERE_API_KEY = "QWA7Sup6muJXp41Hzt8Pg3yLZ9Di3L17rlDKRCZn";


/*
curl --request POST \
     --url https://api.cohere.ai/generate \
     --header 'Cohere-Version: 2022-12-06' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer QWA7Sup6muJXp41Hzt8Pg3yLZ9Di3L17rlDKRCZn' \
     --header 'content-type: application/json' \
     --data '
{
     "max_tokens": 20,
     "return_likelihoods": "NONE",
     "truncate": "END",
     "prompt": "Once upon a time in a magical land called"
}
'
*/

export async function fixMyEnglish(input){
 

  console.log(COHERE_API_KEY, "KEY")
  const data = {
    model: "xlarge",
    prompt: `This is a spell checker generator.
--
Incorrect sample: "I are good!"
Correct sample: "I am good!"
--
Incorrect sample: "I have 22 years old."
Correct sample: "I am 22 years old."
--
Incorrect sample: "I don't can know."
Correct sample: "I don't know."
--
Incorrect sample: "${input}",
Correct sample: "`,
  max_tokens: 40,
  temperature: 0.3,
  k: 0,
  p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likehoods: "NONE"
}

  const response = await fetch(COHERE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${COHERE_API_KEY}`,
      "Content-Type": 'application/json',
      "Cohere-Version": '2022-12-06',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  
  console.log(response, "response")
  return response.body.generations[0].text;
}
