<script setup lang="ts">
import { DisplayCodeKey } from '@/constants'
import { type ItemHighlight, type SortFunction } from '@/types'

const props = defineProps({
	func: {
		type: Function as PropType<SortFunction>,
		required: true
	},
	code: {
		type: String,
		required: true
	},
	highlights: {
		type: Array as PropType<ItemHighlight[]>,
		required: true
	}
})

const array = ref<number[]>([])
const codeIndex = ref<number>(0)
const showCode = ref<boolean>(false)
const autoplaySort = ref(false)

const toggleCodeView = inject(DisplayCodeKey, (toggle: boolean) => {})

const route = useRoute()
const arrayAmount = ref(parseInt(route.query.amount as string) || 5)

watch(
	showCode,
	(v) => {
		toggleCodeView(v)
	},
	{ immediate: true }
)

let sortInputResolve = ref<(() => void) | null>()
let sortInputPromise = ref<Promise<void> | null>()
function waitForUserInput(skippable = false) {
	sortInputPromise.value = new Promise((res, rej) => {
		if (autoplaySort.value) {
			setTimeout(res, skippable && !showCode.value ? 0 : 1000)
		} else {
			sortInputResolve.value = res
		}
	})
	return sortInputPromise.value
}
function cancelPromises() {
	sortInputResolve.value = null
	sortInputPromise.value = null
}
function iterate() {
	if (!sortInputResolve.value) return

	sortInputResolve.value()
	sortInputResolve.value = null
}
watch(autoplaySort, (value) => {
	if (!value) return
	iterate()
})

const hiddenCells = ref<Record<number, boolean>>({})
async function toggleCell(index: number, visible: boolean) {
	hiddenCells.value[index] = !visible
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

function resetArray() {
	autoplaySort.value = false
	cancelPromises()

	// Guaranteed all values are always unique
	array.value = shuffleArray(
		Array(98)
			.fill(0)
			.map((_, i) => i + 1)
			.filter((x) => !array.value.includes(x))
	).splice(0, arrayAmount.value)

	for (const highlight of props.highlights) {
		highlight.index = 0
		highlight.visible = false
	}
	hiddenCells.value = {}
	codeIndex.value = 0

	props
		.func(
			array.value,
			{
				wait: waitForUserInput,
				toggle: toggleCell
			},
			(i) => {
				codeIndex.value = i
			}
		)
		.then(() => {
			for (const highlight of props.highlights) {
				highlight.index = 0
				highlight.visible = false
			}
			hiddenCells.value = {}
			codeIndex.value = props.code.split('\n').length - 1
			autoplaySort.value = false
		})
		.catch(() => {})
}

onMounted(() => {
	resetArray()
})
onUnmounted(() => {
	if (sortInputResolve.value) {
		sortInputResolve.value = null
		sortInputPromise.value = null
	}
})
</script>

<template>
	<div>
		<ArrayDisplay
			:data="array"
			:highlights="highlights"
			:show-highlight="showCode"
			:hidden-cells="hiddenCells"
		/>

		<Teleport to="#code" v-if="showCode">
			<CodeHighlight :code="code" :index="codeIndex" v-show="showCode" />
		</Teleport>

		<div class="grid grid-cols-2 gap-2 mt-4">
			<button
				class="border border-green-600 p-4 rounded transition-all enabled:hover:bg-green-600/20 enabled:active:translate-y-1 enabled:active:scale-95 duration-200 disabled:cursor-not-allowed disabled:opacity-60"
				:disabled="sortInputResolve === null"
				@click="iterate"
			>
				Iterate
			</button>
			<button
				class="border border-red-600 p-4 rounded transition-colors hover:bg-red-600/20"
				@click="resetArray"
			>
				Reset
			</button>
			<label
				for="showCode"
				class="flex flex-row gap-2 place-content-center border border-yellow-600 p-4 rounded"
				:class="[showCode ? 'bg-yellow-600/20' : '']"
			>
				<input
					type="checkbox"
					name="showCode"
					id="showCode"
					v-model="showCode"
					class="invisible w-0 h-0"
				/>
				<p>Show Code</p>
			</label>
			<label
				for="autoplaySort"
				class="flex flex-row gap-2 place-content-center border border-pink-600 p-4 rounded"
				:class="[autoplaySort ? 'bg-pink-600/20' : '']"
			>
				<input
					type="checkbox"
					name="autoplaySort"
					id="autoplaySort"
					v-model="autoplaySort"
					class="invisible w-0 h-0"
				/>
				<p>Autoplay</p>
			</label>
		</div>
	</div>
</template>

<style scoped></style>
