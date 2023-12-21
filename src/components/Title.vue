<script setup lang="ts">
const cells = ref(shuffleArray(new Array(32).fill(1).map((x, i) => x + i)))

const cell_shuffle_interval = ref<number>(0)

function randomNumber(min: number, max: number) {
	return min + Math.floor(Math.random() * (max - min + 1))
}
function shuffleArray(n: number[]) {
	const t = [...n]
	for (let i = t.length - 1; i > 0; i--) {
		const r = randomNumber(0, i)
		const b = t[r]
		t[r] = t[i]
		t[i] = b
	}
	return t
}

onMounted(() => {
	cell_shuffle_interval.value = setInterval(() => {
		// 1/8 Chance of Shuffling Entire Array
		if (Math.random() > 1 / 8) {
			let indexes = shuffleArray(cells.value.map((_, i) => i))

			let first = indexes[0]
			let second = indexes[1]

			const temp = cells.value[first]
			cells.value[first] = cells.value[second]
			cells.value[second] = temp
		} else {
			cells.value = shuffleArray(cells.value)
		}
	}, 550)
})

onUnmounted(() => {
	if (cell_shuffle_interval.value) {
		clearInterval(cell_shuffle_interval.value)
	}
})
</script>

<template>
	<div class="flex flex-col">
		<TransitionGroup name="list" tag="div" class="flex flex-row gap-1">
			<div
				v-for="(value, index) in cells"
				:key="value"
				class="w-full h-32 flex place-items-end"
			>
				<div
					class="w-full cell-item"
					:class="[value - 1 === index ? 'bg-ctp-green' : 'bg-ctp-red']"
					:style="{ height: `${(value / cells.length) * 100}%` }"
				></div>
			</div>
		</TransitionGroup>
		<h1 class="text-4xl font-bold mt-2 text-ctp-text">Sorting Algorithms</h1>
	</div>
</template>

<style lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 500ms cubic-bezier(0.85, 0, 0.15, 1);
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
.list-move .cell-item {
	@apply bg-ctp-blue;
}
</style>
