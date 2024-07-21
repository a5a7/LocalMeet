<script>
    import {user, pb} from './pocketbase';
    let username, password, errorMessage = "", name;
    async function login(){
        try{
            await pb.collection('users').authWithPassword(username, password);
        } catch (err){
            var e = err.name.split(" ")[1];
            if (e == "400"){
                errorMessage = "Error: Your password or username is incorrect.";
            }
        }
    }
</script>

{#if !($user)}
<form on:submit|preventDefault>
    <label for="username">Username:</label><br>
    <input type="text" for="username" id="username" bind:value={username}><br>
    <label for="password">Password:</label><br>
    <input type="password" name="password" id="password" bind:value={password}><br>
    <div id="err">{errorMessage}</div>
    <button on:click={login}>Log In</button>
</form>
{/if}

<style>
    form{
        margin: 3vh auto;
        width: fit-content;
        border: 1px solid black;
        padding: 20px;
        border-radius: 10px;
    }
    input[type="text"], input[type="password"], button{
        appearance: none;
        width: 200px;
        margin: 2px 0;
        padding: 5px;
        border: 1px solid black;
        box-sizing: border-box;
        outline: 0;
    }
</style>