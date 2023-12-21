<script setup lang="ts">
const array = ref<number[]>([])
const score = ref(0)
const lowestScore = ref<number | null>(null)
const hasWon = ref(false)
const sortedArray = ref<number[]>([])

function isSorted() {
	if (array.value.length === 0) return true

	return array.value.every((v, i) => v === sortedArray.value[i])
}

const highlightedIndex = ref<number | undefined>(undefined)
function onCellClick(i: number) {
	if (hasWon.value) return

	if (highlightedIndex.value === undefined) {
		highlightedIndex.value = i
		return
	} else {
		if (i !== highlightedIndex.value) {
			const temp = array.value[highlightedIndex.value]
			array.value[highlightedIndex.value] = array.value[i]
			array.value[i] = temp
			highlightedIndex.value = undefined
		} else {
			highlightedIndex.value = undefined
			return
		}
	}

	score.value += 1

	if (isSorted()) {
		hasWon.value = true
		if (!lowestScore.value) lowestScore.value = score.value
		else if (score.value < lowestScore.value) {
			lowestScore.value = score.value
		}
	}
}

function regenerateArray() {
	const newArray = Array(98)
		.fill(1)
		.map((v, i) => v + i)

	array.value = shuffleArray(newArray).splice(0, 8)
	sortedArray.value = Array.from(array.value).sort((a, b) => a - b)
	score.value = 0
	hasWon.value = false
	highlightedIndex.value = undefined
}
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
regenerateArray()
</script>

<template>
	<main class="min-h-screen flex place-items-center">
		<div class="mx-auto text-center">
			<RouterLink to="/">&lt;&lt; Back</RouterLink>
			<h1 class="text-6xl font-bold">Ice Breaker!</h1>
			<p>
				Sort this array in ascending order by swapping each pair! Try to get the lowest
				number of swaps made!
			</p>
			<p class="text-xs opacity-60 italic">
				Hint: You'll most likely do a sorting algorithm we're about to discuss!
			</p>

			<div class="mt-8 font-bold text-4xl">
				<p v-show="lowestScore && lowestScore > -1">Lowest Score: {{ lowestScore }}</p>
				<p v-show="!hasWon">Current Score: {{ score }}</p>
			</div>

			<TransitionGroup name="list" tag="div" class="my-16 flex flex-row place-content-center">
				<div
					v-for="(value, index) in array"
					:key="value"
					class="w-32 h-32 border-2 border-white grid place-items-center relative duration-500"
					:class="[highlightedIndex === index ? 'bg-ctp-red/60 -top-8' : 'top-0']"
					@click="onCellClick(index)"
				>
					<p class="text-4xl font-bold text-white">
						{{ value }}
					</p>
				</div>
			</TransitionGroup>

			<div v-show="hasWon">
				<p class="font-bold">
					Congratulations! You have sorted the array in {{ score }} swaps!
				</p>

				<button
					class="border border-green-600 p-4 rounded transition-colors hover:bg-green-600/20 w-full mt-2"
					@click="regenerateArray"
				>
					Try Again
				</button>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 500ms ease-in-out;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	// transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
