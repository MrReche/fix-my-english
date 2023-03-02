<script>
  import { checkIsEnglish } from "../services/ai";
  import { isValidInput, langUser, langUserCode } from "./store";
  
  const handleChange = async e => {
    const { value } = e.target;
    const isValid = value.length > 0;
    if (!isValid) {
      isValidInput.set(false);
      return;
    }
    
    const {language_name, language_code} = await checkIsEnglish(value);

    langUserCode.set(language_code);
    langUser.set(language_name);
    isValidInput.set(language_code === 'en');
  };
</script>


<textarea 
    on:input={handleChange}
    id="result" 
    placeholder="Put your english to fix" 
    class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
    name="comment" 
    rows="5" 
    cols="40">
</textarea>