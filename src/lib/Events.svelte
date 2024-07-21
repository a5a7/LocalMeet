<script>
    import { pb, user } from "./pocketbase"
    var communityList = [];
    var eventList = [];
    var result = "";
    async function getCommunities(){
        try{
            var filter = "members.id ?= '" + $user.id + "'";
            communityList = await pb.collection("communities").getFullList({filter: filter});
        }catch (err){
            result = "Error";
        }
    }
    async function getAllEvents(){
        try{
            await getCommunities();
        }catch (err){
            result = err.name;
        }
        eventList = [];
        for (var x of communityList){
            await getEvents(x.id);
        }
    }
    async function getEvents(communityID){
        try{
            var filter = "community.id ?= '" + communityID + "' && date >= @now";
            const records = await pb.collection('events').getFullList({
                filter: filter,  expand: "attendees, community"
            });
            eventList = eventList.concat(records);
        }catch (err){
            result = err.name;
        }
    }
    async function createEvent(){
        var name = document.getElementById("name").value;
        var desc = document.getElementById("description").value;
        var select = document.getElementById("community");
        var comm = select.options[select.selectedIndex].id;
        var location =document.getElementById("location").value;
        var date = document.getElementById("date").value;
        date = date.replace("T", " ") + ":00";
        try{
            await pb.collection("events").create({
                name: name,
                description: desc,
                location: location,
                date: date,
                attendees: $user.id,
                community: comm
            });
            getAllEvents();
        }catch (err){
            result = err.name;
        }
    }
    async function addMember(eventID){
        try{
            await pb.collection("events").update(eventID, {"attendees+": $user.id});
            getAllEvents();
        }catch(err){
            result = err.name;
        }
    }
    async function removeMember(eventID){
        try{
            await pb.collection("events").update(eventID, {"attendees-": $user.id});
            getAllEvents();
        }catch(err){
            result = err.name;
        }
    }
</script>

<div>
    <h2 style="margin: 0;" on:load={getAllEvents()}>Events</h2>
    <div id=result>{result}</div>
    <div class="elements">
        <div>Create Event</div>
        <input type="text" name="name" id="name" placeholder="Event Name"><br>
        <input type="text" name="description" id="description" placeholder="Event Description"><br>
        <select name="community" id="community">
            {#each communityList as comm}
                <option id={comm.id}>{comm.name}</option>            
            {/each}
        </select><br>
        <input type="text" name="location" id="location" placeholder="Event Location"><br>
        <input type="datetime-local" name="date" id="date"><br>
        <button on:click={(e) => { e.preventDefault(); createEvent(); }}>Create Event</button>
    </div>
    <div class="elements">
        <div>Upcoming Events in communities I'm in: (showing {eventList.length} event{eventList.length == 1 ? "" : "s"})</div>
        {#each eventList as event}
            <div class="event">
                <div class="event-name">Name: {event.name}</div>
                <div class="event-desc">Description: {event.description}</div>
                <div class="event-date">Date: {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(event.date).getDay()]}, {["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"][new Date(event.date).getMonth()]} {new Date(event.date).getDate()}, {new Date(event.date).getFullYear()} at {event.date.split(" ")[1].slice(0, 5).split(":")[0] > 12 ? event.date.split(" ")[1].slice(0, 5).split(":")[0]-12 : event.date.split(" ")[1].slice(0, 5).split(":")[0]}:{event.date.split(" ")[1].slice(0, 5).split(":")[1]}</div>
                <div class="event-location">Location: {event.location}</div>
                <div class="event-comm">Community: {event.expand.community.name}</div>
                <div class="event-attendees">Current Attendees: {event.attendees.length == 0 ? "(None)" : event.expand.attendees.map(v => v.name).join(", ")}</div>
                {#if !event.attendees.includes($user.id)}
                <button on:click={(e) => {
                    e.preventDefault();
                    addMember(event.id);
                }}>Join Event</button>
                {:else}
                <button on:click={(e) => {
                    e.preventDefault();
                    removeMember(event.id);
                }}>Leave Event</button>
                {/if}    
        </div>
        {/each}
    </div>
</div>

<style>
    input[type="text"], button, input[type="datetime-local"], select{
        width: 200px;
        margin: 2px 0;
        padding: 5px;
        border: 1px solid black;
        box-sizing: border-box;
        outline: 0;
    }
    input[type="text"], button, input[type="datetime-local"]{
        appearance: none;
    }
    .elements{
        border: 1px solid black;
        padding: 10px;
        margin: 5px 0;
    }
    .event{
        border: 1px solid black;
        padding: 10px;
        margin: 5px 0;
    }
</style>
