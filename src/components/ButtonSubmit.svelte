<script>
  import { fixMyEnglish } from "../services/ai";
  import LoadingIcon from "./LoadingIcon.svelte";
  import { isValidInput, langUser, langUserCode } from "./store";
  import UploadIcon from "./UploadIcon.svelte";
  
  let promise = null
  const handleClick = async () => {
    const text = document.getElementById('result').value;
    promise = fixMyEnglish(text, $langUserCode)
    const value = await promise
    document.getElementById("result").value = value
    promise = null
  }
</script>

{#if promise == null}
  
<button 
  type="button" 
  on:click={handleClick} 
  class={`py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}>
  <UploadIcon />
  Fix it!
</button>

{:else}
  {#await promise}
    <button 
    
    type="button" 
    class=" pointer-events-none py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
    >
    <LoadingIcon />
      Loading...
    </button>
  {/await}

 
{/if}

{#if $langUser}
    <strong class="text-blue-900">You are using {$langUser} </strong>
{/if}


