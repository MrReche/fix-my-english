const COHERE_API_KEY = "QWA7Sup6muJXp41Hzt8Pg3yLZ9Di3L17rlDKRCZn";
const COHERE_API_GENERATE_URL = "https://api.cohere.ai/generate"
const COHERE_API_DETECT_LANGUAGE_URL = "https://api.cohere.ai/detect-language"
import debounce from "just-debounce-it";

/*

curl --request POST \
     --url https://api.cohere.ai/v1/detect-language \
     --header 'accept: application/json' \
     --header 'authorization: Bearer QWA7Sup6muJXp41Hzt8Pg3yLZ9Di3L17rlDKRCZn' \
     --header 'content-type: application/json' \
     --data '
{
     "texts": [
          "Hello world",
          "Здравствуй, Мир"
     ]
}
'

*/
export async function checkIsEnglish (input){
  try {
    const data = {
      texts: [input]
    };

    const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json());

    const [{ language_code, language_name }] = results;


    return {language_code, language_name}
  } catch (e) {
    console.error(e);
    return false;
  }
};




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

function getPrompt (input, langCode) {

  const prompt = {
    en: 
      `This is a spell checker generator.
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
  Correct sample: `,
    de: `Dies ist ein Rechtschreibprüfungsgenerator.
  --
  Falsches Beispiel: "Ich sind gut!"
  Richtiges Beispiel: "Ich bin gut!"
  --
  Falsches Beispiel: "Ich habe 22 Jahre alt."
  Richtiges Beispiel: "Ich bin 22 Jahre alt."
  --
  Falsches Beispiel: "Ich kann nicht wissen."
  Richtiges Beispiel: "Ich weiß nicht."
  --
  Falsches Beispiel: "${input}",
  Richtiges Beispiel: ` 
  }
  
  console.log(langCode, "ei")

  return prompt[langCode];

}

export async function fixMyEnglish(input, langCode){
 
  const promptLang = getPrompt(input, langCode)
  console.log(promptLang, "KEY")
  const data = {
    model: "xlarge",
    prompt: promptLang,
  max_tokens: 40,
  temperature: 0.3,
  k: 0,
  p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop_sequences: ['--'],
  return_likehoods: "NONE"
}
  try{
    const response = await fetch(COHERE_API_GENERATE_URL, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${COHERE_API_KEY}`,
        "Content-Type": 'application/json',
        "Cohere-Version": '2022-12-06',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    console.log(response, "response");
   
      const { text } = response.generations[0];
      return text.replace("--", "").trim().replaceAll('"', "");
  
  }catch(e){
    return "EAT MY BALLS"
  }
 
}
