<script setup lang="ts">
import { DisplayCodeKey } from '@/constants'

const toggleCodeView = ref(false)

provide(DisplayCodeKey, (toggle: boolean) => {
	toggleCodeView.value = toggle
})
</script>

<template>
	<div class="w-full grid lg:grid-cols-[1fr_2fr] p-8 mx-auto gap-4 min-h-screen">
		<aside class="text-center lg:grid lg:place-items-center lg:text-left">
			<div>
				<slot name="left" v-if="!toggleCodeView" />
				<div id="code"></div>
			</div>
		</aside>
		<main class="grid place-items-center">
			<div>
				<slot />
			</div>
		</main>
	</div>
</template>
