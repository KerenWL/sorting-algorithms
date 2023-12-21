<template>
	<div class="w-full grid lg:grid-cols-[1fr_2fr] p-8 mx-auto gap-4 min-h-screen">
		<aside class="text-center lg:grid lg:place-items-center lg:text-left">
			<div>
				<slot name="left" />
			</div>
		</aside>
		<main>
			<slot />
		</main>
	</div>
</template>
