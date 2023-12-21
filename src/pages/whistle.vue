<script setup lang="ts">
const loaded = ref(false)

onMounted(() => {
	setTimeout(() => {
		loaded.value = true
	}, 500)
})
</script>
<template>
	<div class="absolute left-0 top-0 w-screen h-screen overflow-clip">
		<img
			src="/josh.jpg"
			class="w-full h-full object-fill blur-xl scale-125 z-10 transition-opacity duration-1000"
			:class="[loaded ? 'opacity-100' : 'opacity-0']"
		/>
		<img
			src="/josh.jpg"
			class="absolute left-0 top-0 w-full h-full object-contain z-20 transition-opacity duration-1000"
			:class="[loaded ? 'opacity-100' : 'opacity-0']"
		/>
	</div>
</template>
