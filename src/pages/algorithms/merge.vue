<script setup lang="ts">
import { type ItemHighlight, type SortFunction } from '@/types'
const highlights = ref<ItemHighlight[]>([
	{
		character: 'L',
		color: 'red',
		index: 0,
		position: 'top',
		visible: true
	},
	{
		character: 'R',
		color: 'blue',
		index: 0,
		position: 'top',
		visible: true
	},
	{
		character: 'M',
		color: 'green',
		index: 0,
		position: 'top',
		visible: true
	},
	{
		character: 'l',
		color: 'pink',
		index: 0,
		position: 'bottom',
		visible: true
	},
	{
		character: 'r',
		color: 'cyan',
		index: 0,
		position: 'bottom',
		visible: true
	}
])

const mergeSort: SortFunction = async (arr, { wait, toggle }, setIndex) => {
	async function merge(arr: number[], left: number, middle: number, right: number) {
		const leftArray: number[] = []
		const rightArray: number[] = []

		for (let l = left; l <= middle; l++) {
			leftArray.push(arr[l])
		}
		for (let r = middle + 1; r <= right; r++) {
			rightArray.push(arr[r])
		}

		let leftIndex = 0
		let rightIndex = 0
		let startIndex = left

		highlights.value[3].index = left
		highlights.value[3].visible = true
		highlights.value[4].index = middle + 1
		highlights.value[4].visible = true
		setIndex(16)
		await wait(true)

		while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
			highlights.value[3].index = left + leftIndex
			highlights.value[4].index = middle + 1 + rightIndex
			setIndex(17)
			await wait(true)

			setIndex(18)
			await wait(true)
			if (leftArray[leftIndex] < rightArray[rightIndex]) {
				arr[startIndex] = leftArray[leftIndex]
				leftIndex++
			} else {
				arr[startIndex] = rightArray[rightIndex]
				rightIndex++
			}

			startIndex++
		}

		while (leftIndex < leftArray.length) {
			highlights.value[3].index = left + leftIndex
			setIndex(27)
			await wait(true)

			arr[startIndex++] = leftArray[leftIndex++]
			setIndex(30)
			await wait(false)
		}
		while (rightIndex < rightArray.length) {
			highlights.value[4].index = middle + 1 + rightIndex
			setIndex(32)
			await wait(true)

			arr[startIndex++] = rightArray[rightIndex++]
			setIndex(35)
			await wait(false)
		}

		await wait(false)
		highlights.value[3].visible = false
		highlights.value[4].visible = false
	}

	async function mergeSort(arr: number[], left: number, right: number) {
		highlights.value[0].index = left
		highlights.value[0].visible = true
		highlights.value[1].index = right
		highlights.value[1].visible = true

		if (left >= right) return

		const middle = Math.floor((right + left) / 2)
		highlights.value[2].index = (right + left) / 2
		highlights.value[2].visible = true

		for (let x = 0; x < arr.length; x++) {
			if (x < left || x > right) {
				await toggle(x, false)
			}
		}
		setIndex(2)
		await wait(true)

		await mergeSort(arr, left, middle)
		await mergeSort(arr, middle + 1, right)

		highlights.value[0].index = left
		highlights.value[1].index = right
		highlights.value[2].index = (right + left) / 2
		highlights.value[0].visible = true
		highlights.value[1].visible = true
		highlights.value[2].visible = true

		setIndex(5)
		await wait(false)
		await merge(arr, left, middle, right)
		await wait(true)

		for (let x = 0; x < arr.length; x++) {
			await toggle(x, true)
		}
	}

	await wait(true)
	await mergeSort(arr, 0, arr.length - 1)
}

const javaCode = ref(
	`public void mergeSort(int[] array, int left, int right) {
\tif (left > right) { return; }
\tint middle = (int)Math.floor((left + right) / 2);
\tmergeSort(array, left, middle);
\tmergeSort(array, middle + 1, right);
\tmerge(array, left, middle, right);
}

public void merge(int[] array, int left, int middle, int right) {
\tint[] leftArray = new int[middle - left + 1], rightArray = new int[right - middle];
\tfor (int l = 0; l < leftArray.length; l++) {
\t\tleftArray[l] = array[left + l];
\t}
\tfor (int r = 0; r < rightArray.length; r++) {
\t\trightArray[r] = array[middle + 1 + r];
\t}
\tint l = 0, r = 0, startIndex = left;
\twhile (l < leftArray.length && r < rightArray.length) {
\t\tif (leftArray[l] < rightArray[r]) {
\t\t\tarray[startIndex] = leftArray[l];
\t\t\tl++;
\t\t} else {
\t\t\tarray[startIndex] = rightArray[r];
\t\t\tr++;
\t\t}
\t\tstartIndex++;
\t}
\twhile (l < leftArray.length) {
\t\tarray[startIndex] = leftArray[l];
\t\tl++;
\t\tstartIndex++;
\t}
\twhile (r < rightArray.length) {
\t\tarray[startIndex] = rightArray[r];
\t\tr++;
\t\tstartIndex++;
\t}
}

mergeSort(array, 0, array.length - 1);`
)
</script>

<template>
	<div>
		<DisplayLayout>
			<template #left>
				<RouterLink to="/">&lt;&lt; Back</RouterLink>
				<h1 class="text-4xl font-bold">Merge Sort</h1>
				<p>
					A sorting algorithm that <em>divides</em> the list into
					<em>sorted sub-lists</em>, then combines it back into a single sorted list.
				</p>
				<p><em>Worst case:</em> O(n log n)</p>
			</template>
			<template #default>
				<SortDisplay :func="mergeSort" :code="javaCode" :highlights="highlights" />
			</template>
		</DisplayLayout>
	</div>
</template>
