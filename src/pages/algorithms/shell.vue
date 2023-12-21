<script setup lang="ts">
import { type ItemHighlight, type SortFunction } from '@/types'
const highlights = ref<ItemHighlight[]>([
	{
		character: 'i',
		color: 'red',
		index: 0,
		position: 'top',
		visible: true
	},
	{
		character: 'j',
		color: 'blue',
		index: 0,
		position: 'top',
		visible: true
	},
	{
		character: 'k',
		color: 'green',
		index: 0,
		position: 'bottom',
		visible: true
	},
	{
		character: 'k-i',
		color: 'cyan',
		index: 0,
		position: 'bottom',
		visible: true
	}
])

const bubbleSort: SortFunction = async (arr, { wait, toggle }, setIndex) => {
	for (let i = Math.floor(arr.length / 2); i >= 1; i /= 2) {
		highlights.value[0].index = i
		highlights.value[0].visible = true
		setIndex(0)
		await wait(true)
		for (let j = i; j < arr.length; j++) {
			highlights.value[1].index = j
			highlights.value[1].visible = true
			setIndex(1)

			// Disable unused cells
			for (let x = 0; x < arr.length; x++) {
				toggle(x, (x + (j % 2)) % i === 0)
			}

			await wait(true)

			for (let k = j; k >= i; k -= i) {
				highlights.value[2].index = k
				highlights.value[2].visible = true

				if (!highlights.value[3].visible) {
					setIndex(2)
					await wait(true)

					highlights.value[3].index = k - i
					highlights.value[3].visible = true
					setIndex(3)
					await wait(true)
				} else {
					highlights.value[3].index = k - i
					highlights.value[3].visible = true

					setIndex(2)
					await wait(true)
					setIndex(3)
					await wait(true)
				}

				if (arr[k - i] > arr[k]) {
					let temp = arr[k]
					arr[k] = arr[k - i]
					arr[k - i] = temp

					setIndex(6)
					await wait(false)
				} else {
					setIndex(9)
					await wait(true)
					break
				}
			}

			highlights.value[2].visible = false
			highlights.value[3].visible = false
			await wait(true)

			// Enable unused cells
			for (let x = 0; x < arr.length; x++) {
				toggle(x, true)
			}
		}
		highlights.value[1].visible = false
	}
}

const javaCode = ref(
	`for (int i = (int)Math.floor(array.length / 2); i >= 1; i /= 2) {
\tfor (int j = i; j < array.length; j++) {
\t\tfor (int k = j; k >= i; k -= i) {
\t\t\tif (array[k - i] > array[k]) {
\t\t\t\tint temp = array[k];
\t\t\t\tarray[k] = array[k - i];
\t\t\t\tarray[k - i] = temp;
\t\t\t}
\t\t\telse {
\t\t\t\tbreak;
\t\t\t}
\t\t}
\t}
}`
)
</script>

<template>
	<DisplayLayout>
		<template #left>
			<RouterLink to="/">&lt;&lt; Back</RouterLink>
			<h1 class="text-4xl font-bold">Shell Sort</h1>
			<p>
				A sorting algorithm <em>based on the Insertion Sort</em> where the items are sorted
				in an interval <em>interval</em>.
			</p>
			<p><em>Worst case:</em> O(n log^2 n)</p>
		</template>
		<template #default>
			<SortDisplay :func="bubbleSort" :code="javaCode" :highlights="highlights" />
		</template>
	</DisplayLayout>
</template>
