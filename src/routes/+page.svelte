<script>
    import Communities from "../lib/Communities.svelte";
    import Events from "../lib/Events.svelte";
	import Login from "../lib/Login.svelte";
	import {pb, user} from "../lib/pocketbase";
    import Signup from "../lib/Signup.svelte";
	let active = "home";
</script>
<div id="nav-bar">
	<button class="nav" on:click={() => { active = "home"; }}>Home</button>
	{#if $user}
		<button class="nav" on:click={() => { active = "communities"; }}>Communities</button>
		<button class="nav" on:click={() => { active = "events"; }}>Events</button>
		<button class="nav" on:click={() => { pb.authStore.clear(); active = "home"; }}>Signout</button>
	{:else}
		<button class="nav" on:click={() => { active = "signup"; }}>Signup</button>
		<button class="nav" on:click={() => { active = "login"; }}>Login</button>
	{/if}
</div>
<hr>
<div id="container">
{#if active == "login"}
{#if !$user}
<Login />
{:else}
<div>
	<h2>Hello, {$user.name}!</h2>
	<div>Use the tabs above to see events or communities. </div>
</div>
{/if}
{:else if active == "signup"}
{#if !$user}
<Signup />
{:else}
<div>
	<h2>Hello, {$user.name}!</h2>
	<div>Use the tabs above to see events or communities. </div>
</div>
{/if}
{:else if active == "communities"}
<Communities />
{:else if active == "events"}
<Events />
{:else if active == "home"}
	{#if $user}
	<div>
		<h2>Hello, {$user.name}!</h2>
		<div>Use the tabs above to see events or communities. </div>
	</div>
	{:else}
	<div>
		<h2>Login to get started. If you don't have an account, signup. </h2>
	</div>
	{/if}
{/if}
</div>
<style>
	#container{
		margin: 2vh 2vw;
	}
	#nav-bar{
		font-size: 0;
	}
	.nav{
		appearance: none;
		margin: 0;
		border: 0;
		padding: 10px;
		cursor: pointer;
		transition: 0.3s;
		display: inline-block;
		background-color: #fff;
		outline: 0;
	}
	hr{
		margin: 0;
	}
</style>