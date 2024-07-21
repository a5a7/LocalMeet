<script>
    import { pb, user } from "./pocketbase";
    var communityID, communityName, communityDescription;
    var result = "";
    var communityList = [];
    async function join(){
        try{
            await pb.collection("communities").update(communityID, {
                "members+": $user.id
            });
            getCommunities();
        }catch (err){
            result = "Error: This community does not exist!";
        }
    }
    async function create(){
        result = "Successfully created a new community!";
        try{
            await pb.collection("communities").create({
                name: communityName,
                description: communityDescription,
                members: [$user.id]
            });
            getCommunities();
        }catch (err){
            result = "Error";
        }
    }
    async function getCommunities(){
        try{
            var filter = "members.id ?= '" + $user.id + "'";
            communityList = await pb.collection("communities").getFullList({filter: filter});
        }catch (err){
            result = "Error";
        }
    }
</script>

<div>
    <h2 style="margin: 0;">Communities</h2>
    <div id=result>{result}</div>
    <div class="elements">
        <div>Join Community: </div>
        <input type="text" placeholder="Community ID" bind:value={communityID}/><br>
        <button on:click={(e) => { e.preventDefault(); join(); }}>Join</button>
    </div>
    <div class="elements">
        <div>Create Community: </div>
        <input type="text" name="name" id="name" placeholder="Community Name" bind:value={communityName}><br>
        <input type="text" name="description" id="description" placeholder="Community Description" bind:value={communityDescription}><br>
        <button on:click={(e) => { e.preventDefault(); create(); }}>Create Community</button>
    </div>
    <div class="elements">
        <div on:load={getCommunities()}>Communities I'm already in: </div>
        {#each communityList as comm}
            <div class="community">
                <div class="name">Name: {comm.name}</div>
                <div class="description">Description: {comm.description}</div>
                <div class="id">ID: {comm.id}</div>
                <div>Share the ID to others who want to join the community!</div>
            </div>            
        {/each}
    </div>
</div>

<style>
    input[type="text"], button{
        appearance: none;
        width: 200px;
        margin: 2px 0;
        padding: 5px;
        border: 1px solid black;
        box-sizing: border-box;
        outline: 0;
    }
    .elements{
        border: 1px solid black;
        padding: 10px;
        margin: 5px 0;
    }
    .community{
        padding: 5px;
        border: 1px solid black;
        margin: 3px 0;
    }
</style>
