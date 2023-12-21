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
		position: 'bottom',
		visible: true
	},
	{
		character: 'j-1',
		color: 'green',
		index: 0,
		position: 'bottom',
		visible: true
	}
])

const insertionSort: SortFunction = async (arr, { wait, toggle }, setIndex) => {
	for (let i = 1; i < arr.length; i++) {
		highlights.value[0].index = i
		highlights.value[0].visible = true
		setIndex(0)
		await wait(true)

		for (let j = i; j > 0; j--) {
			highlights.value[1].index = j
			highlights.value[1].visible = true
			setIndex(1)
			if (!highlights.value[2].visible) {
				await wait(true)
				highlights.value[2].index = j - 1
				highlights.value[2].visible = true
				setIndex(2)
				await wait(true)
			} else {
				highlights.value[2].index = j - 1
				highlights.value[2].visible = true
				await wait(true)
				setIndex(2)
				await wait(true)
			}

			if (arr[j - 1] > arr[j]) {
				const buffer = arr[j - 1]
				arr[j - 1] = arr[j]
				arr[j] = buffer

				setIndex(5)
				await wait(false)
			} else {
				setIndex(8)
				await wait(false)

				break
			}
		}

		highlights.value[1].visible = false
		highlights.value[2].visible = false
	}
}

const javaCode = ref(
	`for(int i = 1; i < array.length; i++) {
\tfor(int j = i; j > 0; j--) {
\t\tif( array[j - 1] > array[j] ) {
\t\t\tint temp = array[j - 1];
\t\t\tarray[j - 1] = array[j];
\t\t\tarray[j] = temp;
\t\t}
\t\telse {
\t\t\tbreak;
\t\t}
\t}
}`
)
</script>

<template>
	<DisplayLayout>
		<template #left>
			<RouterLink to="/">&lt;&lt; Back</RouterLink>
			<h1 class="text-4xl font-bold">Insertion Sort</h1>
			<p>
				A sorting algorithm where the <em>current</em> item is compared to the
				<em>previous</em> items.
			</p>
			<p><em>Worst case:</em> O(n^2)</p>
		</template>
		<template #default>
			<SortDisplay :func="insertionSort" :code="javaCode" :highlights="highlights" />
		</template>
	</DisplayLayout>
</template>
