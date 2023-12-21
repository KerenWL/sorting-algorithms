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
		character: 'm',
		color: 'blue',
		index: 0,
		position: 'bottom',
		visible: true
	},
	{
		character: 'j',
		color: 'green',
		index: 0,
		position: 'top',
		visible: true
	}
])

const selectionSort: SortFunction = async (arr, { wait, toggle }, setIndex) => {
	for (let i = 0; i <= arr.length - 2; i++) {
		highlights.value[0].index = i
		highlights.value[0].visible = true
		setIndex(0)
		await wait(true)

		let min_index = i
		highlights.value[1].index = min_index
		highlights.value[1].visible = true
		setIndex(1)
		await wait(true)

		for (let j = i + 1; j <= arr.length - 1; j++) {
			highlights.value[2].index = j
			highlights.value[2].visible = true
			setIndex(2)
			await wait(true)

			setIndex(3)
			await wait(true)

			if (arr[j] < arr[min_index]) {
				min_index = j
				highlights.value[1].index = min_index
				setIndex(4)
				await wait(true)
			}
		}

		highlights.value[2].visible = false
		setIndex(6)
		await wait(true)

		let temp = arr[min_index]
		arr[min_index] = arr[i]
		arr[i] = temp

		setIndex(9)
		await wait(false)
		highlights.value[1].visible = false
		await toggle(i, false)
	}
}

const javaCode = ref(
	`for (int i = 0; i <= array.length - 2; i++) {
\tint m = i;
\tfor (int j = i + 1; j <= array.length - 1; j++) {
\t\tif (array[j] < array[m]) {
\t\t\tm = j;
\t\t}
\t}
\tint temp = array[m];
\tarray[m] = array[i];
\tarray[i] = temp;
}`
)
</script>

<template>
	<DisplayLayout>
		<template #left>
			<RouterLink to="/">&lt;&lt; Back</RouterLink>
			<h1 class="text-4xl font-bold">Selection Sort</h1>
			<p>
				A sorting algorithm that works by <em>finding</em> the smallest element and
				<em>swapping</em> it to the next position to be filled.
			</p>
			<p><em>Worst case:</em> O(n^2)</p>
		</template>
		<template #default>
			<SortDisplay :func="selectionSort" :code="javaCode" :highlights="highlights" />
		</template>
	</DisplayLayout>
</template>
